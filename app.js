const COLS = 10;
const ROWS = 20;
const BLOCK = 30;
const BEST_KEY = "pet-rescue-blocks-best";

const THEMES = {
  paw: { label: "patinha", color: "#e46f63", mark: "paw" },
  bone: { label: "osso", color: "#f2bd4b", mark: "bone" },
  heart: { label: "coracao", color: "#ef5c78", mark: "heart" },
  food: { label: "racao", color: "#8a6b4b", mark: "food" },
  house: { label: "casinha", color: "#6aa7bd", mark: "house" },
  leaf: { label: "abrigo", color: "#78b66d", mark: "paw" },
  sun: { label: "cuidado", color: "#f0974e", mark: "bone" }
};

const PIECES = [
  { shape: [[1, 1, 1, 1]], theme: "bone" },
  { shape: [[1, 1], [1, 1]], theme: "house" },
  { shape: [[0, 1, 0], [1, 1, 1]], theme: "paw" },
  { shape: [[1, 0, 0], [1, 1, 1]], theme: "food" },
  { shape: [[0, 0, 1], [1, 1, 1]], theme: "heart" },
  { shape: [[0, 1, 1], [1, 1, 0]], theme: "leaf" },
  { shape: [[1, 1, 0], [0, 1, 1]], theme: "sun" }
];

const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");
const nextCanvas = document.querySelector("#nextCanvas");
const nextCtx = nextCanvas.getContext("2d");

const scoreEl = document.querySelector("#score");
const bestScoreEl = document.querySelector("#bestScore");
const rescuedPetsEl = document.querySelector("#rescuedPets");
const lineToast = document.querySelector("#lineToast");
const startOverlay = document.querySelector("#startOverlay");
const gameOverOverlay = document.querySelector("#gameOverOverlay");
const gameOverText = document.querySelector("#gameOverText");
const gameOverTitle = document.querySelector("#gameOverTitle");
const installButton = document.querySelector("#installButton");

const buttons = {
  start: document.querySelector("#startButton"),
  pause: document.querySelector("#pauseButton"),
  restart: document.querySelector("#restartButton"),
  playNow: document.querySelector("#playNowButton"),
  tryAgain: document.querySelector("#tryAgainButton"),
  continueAd: document.querySelector("#continueAdButton"),
  left: document.querySelector("#leftButton"),
  right: document.querySelector("#rightButton"),
  rotate: document.querySelector("#rotateButton"),
  drop: document.querySelector("#dropButton")
};

const state = {
  board: createBoard(),
  current: null,
  next: null,
  score: 0,
  best: Number(localStorage.getItem(BEST_KEY) || 0),
  rescuedPets: 0,
  running: false,
  paused: false,
  gameOver: false,
  dropCounter: 0,
  dropInterval: 760,
  lastTime: 0
};

let deferredInstallPrompt = null;

bestScoreEl.textContent = state.best;
wireEvents();
registerPwa();
draw();

function wireEvents() {
  buttons.start.addEventListener("click", startGame);
  buttons.playNow.addEventListener("click", startGame);
  buttons.restart.addEventListener("click", startGame);
  buttons.tryAgain.addEventListener("click", startGame);
  buttons.pause.addEventListener("click", togglePause);
  buttons.continueAd.addEventListener("click", continueAfterAd);
  buttons.left.addEventListener("click", () => move(-1));
  buttons.right.addEventListener("click", () => move(1));
  buttons.rotate.addEventListener("click", rotateCurrent);
  buttons.drop.addEventListener("click", softDrop);

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
    if (event.key === "ArrowUp") rotateCurrent();
    if (event.key === "ArrowDown") softDrop();
    if (event.key === " ") hardDrop();
    if (event.key.toLowerCase() === "p") togglePause();
  });

  let touchStart = null;
  canvas.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });

  canvas.addEventListener("touchend", (event) => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    if (Math.abs(dx) < 22 && Math.abs(dy) < 22) rotateCurrent();
    else if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 1 : -1);
    else if (dy > 0) hardDrop();
    touchStart = null;
  }, { passive: true });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installButton.hidden = false;
  });

  installButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installButton.hidden = true;
  });
}

function startGame() {
  window.scrollTo(0, 0);
  state.board = createBoard();
  state.current = randomPiece();
  state.next = randomPiece();
  state.score = 0;
  state.rescuedPets = 0;
  state.running = true;
  state.paused = false;
  state.gameOver = false;
  state.dropCounter = 0;
  state.dropInterval = 760;
  startOverlay.hidden = true;
  gameOverOverlay.hidden = true;
  buttons.pause.textContent = "Pausar";
  updateScore();
  draw();
}

function togglePause() {
  if (!state.running || state.gameOver) return;
  state.paused = !state.paused;
  buttons.pause.textContent = state.paused ? "Continuar" : "Pausar";
  draw();
}

function continueAfterAd() {
  if (!state.gameOver) return;
  window.scrollTo(0, 0);
  gameOverOverlay.hidden = true;
  state.gameOver = false;
  state.running = true;
  state.paused = false;
  state.board = clearTopRows(state.board, 4);
  state.current = randomPiece();
  state.next = randomPiece();
  draw();
}

function move(direction) {
  if (!canPlay()) return;
  state.current.x += direction;
  if (collides(state.current)) state.current.x -= direction;
  draw();
}

function rotateCurrent() {
  if (!canPlay()) return;
  const oldShape = state.current.shape;
  const rotated = rotateMatrix(state.current.shape);
  state.current.shape = rotated;
  if (collides(state.current)) {
    state.current.x += state.current.x < COLS / 2 ? 1 : -1;
  }
  if (collides(state.current)) state.current.shape = oldShape;
  draw();
}

function softDrop() {
  if (!canPlay()) return;
  state.current.y += 1;
  if (collides(state.current)) {
    state.current.y -= 1;
    lockPiece();
  } else {
    state.score += 1;
    updateScore();
  }
  draw();
}

function hardDrop() {
  if (!canPlay()) return;
  while (!collides(state.current)) {
    state.current.y += 1;
    state.score += 2;
  }
  state.current.y -= 1;
  lockPiece();
  draw();
}

function update(time = 0) {
  const delta = time - state.lastTime;
  state.lastTime = time;

  if (state.running && !state.paused && !state.gameOver) {
    state.dropCounter += delta;
    if (state.dropCounter > state.dropInterval) {
      softDrop();
      state.dropCounter = 0;
    }
  }

  requestAnimationFrame(update);
}

function lockPiece() {
  state.current.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const boardY = state.current.y + y;
        const boardX = state.current.x + x;
        if (boardY >= 0) state.board[boardY][boardX] = state.current.theme;
      }
    });
  });

  const cleared = clearLines();
  if (cleared > 0) {
    state.rescuedPets += cleared;
    state.score += [0, 120, 280, 520, 900][cleared] || cleared * 260;
    state.dropInterval = Math.max(260, state.dropInterval - cleared * 18);
    showLineToast(cleared);
  }

  state.current = state.next;
  state.next = randomPiece();
  state.current.x = Math.floor((COLS - state.current.shape[0].length) / 2);
  state.current.y = -1;

  if (collides(state.current)) endGame();
  updateScore();
}

function clearLines() {
  let cleared = 0;
  for (let y = ROWS - 1; y >= 0; y -= 1) {
    if (state.board[y].every(Boolean)) {
      state.board.splice(y, 1);
      state.board.unshift(Array(COLS).fill(null));
      cleared += 1;
      y += 1;
    }
  }
  return cleared;
}

function endGame() {
  state.running = false;
  state.gameOver = true;
  if (state.score > state.best) {
    state.best = state.score;
    localStorage.setItem(BEST_KEY, String(state.best));
    gameOverTitle.textContent = "Novo recorde!";
  } else {
    gameOverTitle.textContent = "Fim de jogo";
  }
  gameOverText.textContent = `${state.score} pontos e ${state.rescuedPets} pets ajudados.`;
  gameOverOverlay.hidden = false;
  updateScore();
}

function updateScore() {
  scoreEl.textContent = state.score;
  bestScoreEl.textContent = state.best;
  rescuedPetsEl.textContent = state.rescuedPets;
}

function showLineToast(lines) {
  lineToast.textContent = lines === 1 ? "+1 pet ajudado" : `+${lines} pets ajudados`;
  lineToast.classList.remove("show");
  void lineToast.offsetWidth;
  lineToast.classList.add("show");
}

function draw() {
  drawBoard(ctx, canvas.width, canvas.height, BLOCK);
  state.board.forEach((row, y) => {
    row.forEach((theme, x) => {
      if (theme) drawBlock(ctx, x * BLOCK, y * BLOCK, BLOCK, theme);
    });
  });

  if (state.current) {
    state.current.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell && state.current.y + y >= 0) {
          drawBlock(ctx, (state.current.x + x) * BLOCK, (state.current.y + y) * BLOCK, BLOCK, state.current.theme);
        }
      });
    });
  }

  drawNext();
  if (state.paused) drawCenterLabel("PAUSADO");
}

function drawBoard(context, width, height, block) {
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#213a34";
  context.fillRect(0, 0, width, height);
  context.strokeStyle = "rgba(255,255,255,0.055)";
  context.lineWidth = 1;
  for (let x = 0; x <= width; x += block) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = 0; y <= height; y += block) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
}

function drawNext() {
  nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
  nextCtx.fillStyle = "#213a34";
  nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
  if (!state.next) return;
  const size = 22;
  const offsetX = (nextCanvas.width - state.next.shape[0].length * size) / 2;
  const offsetY = (nextCanvas.height - state.next.shape.length * size) / 2;
  state.next.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) drawBlock(nextCtx, offsetX + x * size, offsetY + y * size, size, state.next.theme);
    });
  });
}

function drawBlock(context, x, y, size, themeKey) {
  const theme = THEMES[themeKey];
  const radius = Math.max(5, size * 0.18);
  context.save();
  context.fillStyle = theme.color;
  roundRect(context, x + 2, y + 2, size - 4, size - 4, radius);
  context.fill();
  context.strokeStyle = "rgba(255,255,255,0.42)";
  context.lineWidth = 2;
  context.stroke();
  context.fillStyle = "rgba(255,255,255,0.88)";
  drawMark(context, x + size / 2, y + size / 2, size, theme.mark);
  context.restore();
}

function drawMark(context, cx, cy, size, mark) {
  const unit = size / 30;
  if (mark === "paw") {
    circle(context, cx, cy + 4 * unit, 5 * unit);
    circle(context, cx - 7 * unit, cy - 3 * unit, 3.2 * unit);
    circle(context, cx, cy - 6 * unit, 3.3 * unit);
    circle(context, cx + 7 * unit, cy - 3 * unit, 3.2 * unit);
  }
  if (mark === "bone") {
    circle(context, cx - 8 * unit, cy - 5 * unit, 4 * unit);
    circle(context, cx - 8 * unit, cy + 5 * unit, 4 * unit);
    circle(context, cx + 8 * unit, cy - 5 * unit, 4 * unit);
    circle(context, cx + 8 * unit, cy + 5 * unit, 4 * unit);
    roundRect(context, cx - 9 * unit, cy - 4 * unit, 18 * unit, 8 * unit, 4 * unit);
    context.fill();
  }
  if (mark === "heart") {
    context.beginPath();
    context.moveTo(cx, cy + 8 * unit);
    context.bezierCurveTo(cx - 15 * unit, cy - 2 * unit, cx - 8 * unit, cy - 13 * unit, cx, cy - 5 * unit);
    context.bezierCurveTo(cx + 8 * unit, cy - 13 * unit, cx + 15 * unit, cy - 2 * unit, cx, cy + 8 * unit);
    context.fill();
  }
  if (mark === "food") {
    roundRect(context, cx - 9 * unit, cy - 7 * unit, 18 * unit, 15 * unit, 4 * unit);
    context.fill();
    context.fillStyle = "rgba(33,58,52,0.24)";
    circle(context, cx - 4 * unit, cy, 2 * unit);
    circle(context, cx + 4 * unit, cy - 1 * unit, 2 * unit);
  }
  if (mark === "house") {
    context.beginPath();
    context.moveTo(cx - 11 * unit, cy - 1 * unit);
    context.lineTo(cx, cy - 12 * unit);
    context.lineTo(cx + 11 * unit, cy - 1 * unit);
    context.closePath();
    context.fill();
    roundRect(context, cx - 8 * unit, cy - 1 * unit, 16 * unit, 12 * unit, 2 * unit);
    context.fill();
    context.fillStyle = "rgba(33,58,52,0.25)";
    roundRect(context, cx - 3 * unit, cy + 3 * unit, 6 * unit, 8 * unit, 2 * unit);
    context.fill();
  }
}

function drawCenterLabel(text) {
  ctx.save();
  ctx.fillStyle = "rgba(23,35,31,0.72)";
  ctx.fillRect(0, canvas.height / 2 - 44, canvas.width, 88);
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 32px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  ctx.restore();
}

function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function clearTopRows(board, rows) {
  const nextBoard = board.slice(rows).map((row) => [...row]);
  while (nextBoard.length < ROWS) nextBoard.unshift(Array(COLS).fill(null));
  return nextBoard;
}

function randomPiece() {
  const template = PIECES[Math.floor(Math.random() * PIECES.length)];
  return {
    shape: template.shape.map((row) => [...row]),
    theme: template.theme,
    x: Math.floor((COLS - template.shape[0].length) / 2),
    y: -1
  };
}

function rotateMatrix(matrix) {
  return matrix[0].map((_, index) => matrix.map((row) => row[index]).reverse());
}

function collides(piece) {
  return piece.shape.some((row, y) =>
    row.some((cell, x) => {
      if (!cell) return false;
      const boardX = piece.x + x;
      const boardY = piece.y + y;
      if (boardX < 0 || boardX >= COLS || boardY >= ROWS) return true;
      return boardY >= 0 && Boolean(state.board[boardY][boardX]);
    })
  );
}

function canPlay() {
  return state.running && !state.paused && !state.gameOver && state.current;
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function circle(context, x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

async function registerPwa() {
  if (!("serviceWorker" in navigator)) return;
  try {
    await navigator.serviceWorker.register("service-worker.js");
  } catch (error) {
    console.warn("Service worker indisponivel", error);
  }
}

requestAnimationFrame(update);
