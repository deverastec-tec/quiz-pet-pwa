const quizCatalog = [
  {
    id: "breed",
    title: "Que raca e essa?",
    short: "Olhe o desenho e escolha a raca correta.",
    accent: "#dff3e7",
    icon: "?"
  },
  {
    id: "story",
    title: "Acerte o final da historia",
    short: "Leia a situacao e escolha o desfecho mais provavel.",
    accent: "#fff0cc",
    icon: "..."
  },
  {
    id: "truth",
    title: "Verdadeiro ou falso",
    short: "Curiosidades rapidas sobre cachorros.",
    accent: "#d8edf5",
    icon: "V/F"
  },
  {
    id: "match",
    title: "Qual cachorro combina com voce?",
    short: "Responda e veja o perfil de cao que combina com sua rotina.",
    accent: "#ffe1da",
    icon: "+"
  }
];

const breedImages = {
  dachshund: img("https://commons.wikimedia.org/wiki/Special:FilePath/A%20dachshund.jpg?width=900", "Dachshund", "https://commons.wikimedia.org/wiki/File:A_dachshund.jpg"),
  pug: img("https://commons.wikimedia.org/wiki/Special:FilePath/Pug%20portrait.jpg?width=900", "Pug", "https://commons.wikimedia.org/wiki/Pug"),
  poodle: img("https://commons.wikimedia.org/wiki/Special:FilePath/Standard%20Poodle.JPG?width=900", "Poodle", "https://commons.wikimedia.org/wiki/File:Standard_Poodle.JPG"),
  husky: img("https://commons.wikimedia.org/wiki/Special:FilePath/Siberian%20Husky%20%285743885083%29.jpg?width=900", "Husky Siberiano", "https://commons.wikimedia.org/wiki/File:Siberian_Husky_(5743885083).jpg"),
  dalmatian: img("https://commons.wikimedia.org/wiki/Special:FilePath/Dalmatian%20dog.jpg?width=900", "Dalmata", "https://commons.wikimedia.org/wiki/File:Dalmatian_dog.jpg"),
  corgi: img("https://commons.wikimedia.org/wiki/Special:FilePath/Welshgorgi.jpg?width=900", "Corgi", "https://commons.wikimedia.org/wiki/File:Welshgorgi.jpg"),
  golden: img("https://commons.wikimedia.org/wiki/Special:FilePath/Golden%20Retriever.jpg?width=900", "Golden Retriever", "https://commons.wikimedia.org/wiki/File:Golden_Retriever.jpg"),
  sharpei: img("https://commons.wikimedia.org/wiki/Special:FilePath/Sharpei.jpg?width=900", "Shar Pei", "https://commons.wikimedia.org/wiki/File:Sharpei.jpg"),
  pinscher: img("https://commons.wikimedia.org/wiki/Special:FilePath/Miniature%20Pinscher.jpg?width=900", "Pinscher", "https://commons.wikimedia.org/wiki/File:Miniature_Pinscher.jpg"),
  rottweiler: img("https://commons.wikimedia.org/wiki/Special:FilePath/Rottweiler%20dog%20%281%29.jpg?width=900", "Rottweiler", "https://commons.wikimedia.org/wiki/File:Rottweiler_dog_(1).jpg")
};

const questions = {
  breed: [
    q("Olhe a foto: que raca e essa?", ["Dachshund", "Husky Siberiano", "Boxer", "Poodle"], 0, "O Dachshund tambem e conhecido como salsichinha.", "long", null, breedImages.dachshund),
    q("Olhe a foto: que raca e essa?", ["Pug", "Border Collie", "Akita", "Labrador"], 0, "O Pug costuma ser pequeno, robusto e muito expressivo.", "round", null, breedImages.pug),
    q("Olhe a foto: que raca e essa?", ["Poodle", "Beagle", "Bulldog Ingles", "Chow Chow"], 0, "Poodles aparecem em varios portes e aprendem comandos muito rapido.", "curly", null, breedImages.poodle),
    q("Olhe a foto: que raca e essa?", ["Husky Siberiano", "Dalmata", "Shih-tzu", "Dogue Alemao"], 0, "O Husky foi criado para tracao em regioes frias.", "wolf", null, breedImages.husky),
    q("Olhe a foto: que raca e essa?", ["Dalmata", "Corgi", "Golden Retriever", "Pinscher"], 0, "Os Dalmatas sao famosos pela pelagem branca com manchas.", "spots", null, breedImages.dalmatian),
    q("Olhe a foto: que raca e essa?", ["Corgi", "Samoieda", "Rottweiler", "Maltese"], 0, "Corgis sao pastores baixinhos, muito ativos e atentos.", "short", null, breedImages.corgi),
    q("Olhe a foto: que raca e essa?", ["Golden Retriever", "Shar Pei", "Doberman", "Lhasa Apso"], 0, "Golden Retrievers sao sociaveis e populares em familias.", "golden", null, breedImages.golden),
    q("Olhe a foto: que raca e essa?", ["Shar Pei", "Pastor Alemao", "Whippet", "Yorkshire"], 0, "O Shar Pei e conhecido pelas dobras marcantes.", "wrinkle", null, breedImages.sharpei),
    q("Olhe a foto: que raca e essa?", ["Pinscher", "Sao Bernardo", "Basset Hound", "Old English Sheepdog"], 0, "Pinschers tendem a ser vigilantes apesar do tamanho.", "tiny", null, breedImages.pinscher),
    q("Olhe a foto: que raca e essa?", ["Rottweiler", "Pomerania", "Poodle Toy", "Beagle"], 0, "Rottweilers sao fortes, leais e precisam de boa socializacao.", "strong", null, breedImages.rottweiler)
  ],
  story: [
    q("Luna ouviu a coleira antes do passeio. O que ela fez?", ["Correu para a porta abanando o rabo", "Foi dormir embaixo da cama", "Escondeu o pote de racao", "Comecou a miar"], 0, "Muitos caes associam sons e objetos a rotinas boas."),
    q("Theo encontrou um brinquedo novo no sofa. Qual foi o final?", ["Levou para o tutor mostrar sua conquista", "Guardou na geladeira", "Tentou enterrar no aquario", "Chamou o carteiro para brincar"], 0, "Cachorros costumam compartilhar objetos que consideram valiosos."),
    q("A campainha tocou e Nina levantou as orelhas. Depois disso, ela provavelmente...", ["Foi investigar quem chegou", "Ligou a televisao", "Fez cafe", "Escreveu uma mensagem"], 0, "Sons repentinos despertam comportamento de alerta."),
    q("Bento aprendeu o comando senta. Quando ganhou petisco, ele...", ["Tentou repetir o comportamento", "Esqueceu que existia comida", "Mudou de cor", "Virou um gato"], 0, "Recompensas ajudam o cachorro a repetir a acao correta."),
    q("Maya passou pela poca de banho e viu a toalha. O final mais comum e...", ["Desconfiar e tentar negociar com os olhos", "Pedir uma planilha", "Fazer yoga na banheira", "Fingir que e um tapete"], 0, "Banho divide opinioes caninas com bastante drama."),
    q("No parque, Chico cheirou uma arvore por muito tempo. Ele estava...", ["Lendo informacoes deixadas por outros caes", "Procurando Wi-Fi", "Calculando imposto", "Dormindo em pe"], 0, "O olfato e uma grande fonte de informacao para caes."),
    q("Sol soltou a bolinha aos pes do tutor. Ela queria...", ["Continuar a brincadeira", "Trocar por uma vassoura", "Encerrar a amizade", "Pedir silencio absoluto"], 0, "Entregar a bolinha costuma ser convite para brincar."),
    q("Toby ouviu fogos e ficou inquieto. A melhor atitude do tutor e...", ["Oferecer abrigo tranquilo e seguranca", "Forcar passeio na rua", "Aumentar o barulho", "Ignorar sinais de medo"], 0, "Ambiente seguro e acolhimento ajudam em momentos de medo."),
    q("Pipoca ganhou um quebra-cabeca com petiscos. O final esperado e...", ["Usar focinho e patas para resolver", "Esperar o brinquedo responder", "Ligar para suporte tecnico", "Enterrar o sofa"], 0, "Enriquecimento ambiental estimula mente e olfato."),
    q("Amora viu o tutor pegando a mala. Ela provavelmente...", ["Percebeu mudanca de rotina e ficou atenta", "Conferiu o passaporte", "Fez check-in", "Virou motorista"], 0, "Caes observam pistas da rotina humana com muita facilidade.")
  ],
  truth: [
    q("Cachorros podem aprender palavras e sinais por associacao.", ["Verdadeiro", "Falso"], 0, "Eles associam comandos, gestos, sons e contexto."),
    q("Todo cachorro abana o rabo somente quando esta feliz.", ["Verdadeiro", "Falso"], 1, "O rabo tambem pode indicar ansiedade, alerta ou tensao."),
    q("Chocolate pode ser perigoso para cachorros.", ["Verdadeiro", "Falso"], 0, "Chocolate contem substancias toxicas para caes."),
    q("Filhotes nunca precisam de socializacao.", ["Verdadeiro", "Falso"], 1, "Socializacao adequada ajuda a reduzir medo e reatividade."),
    q("O olfato do cachorro e muito mais sensivel que o humano.", ["Verdadeiro", "Falso"], 0, "O olfato canino e uma das principais formas de explorar o mundo."),
    q("Cachorros tambem precisam de estimulo mental, nao so passeio.", ["Verdadeiro", "Falso"], 0, "Brinquedos, treino e desafios ajudam no bem-estar."),
    q("Todas as racas tem exatamente a mesma necessidade de exercicio.", ["Verdadeiro", "Falso"], 1, "Porte, idade, saude e perfil da raca mudam a rotina ideal."),
    q("Escovar os dentes pode ajudar a saude bucal do cachorro.", ["Verdadeiro", "Falso"], 0, "Higiene bucal reduz acumulo de placa e mau halito."),
    q("Cachorros idosos ainda podem aprender novos habitos.", ["Verdadeiro", "Falso"], 0, "Com paciencia e reforco positivo, caes adultos e idosos aprendem."),
    q("Punicao intensa e sempre a melhor forma de educar.", ["Verdadeiro", "Falso"], 1, "Treino com reforco positivo tende a ser mais seguro e eficiente.")
  ],
  match: [
    q("Como e sua rotina durante a semana?", ["Casa tranquila e horarios previsiveis", "Agenda movimentada, mas com pausas", "Muito esporte e ar livre", "Pouco tempo livre"], 0, "Rotina previsivel combina com caes de companhia calmos.", null, ["calm", "social", "active", "independent"]),
    q("Qual passeio parece mais sua cara?", ["Volta curta no bairro", "Parque com amigos", "Trilha ou corrida", "Caminhada leve sem pressa"], 2, "Energia alta pede um cao que acompanhe atividade intensa.", null, ["calm", "social", "active", "independent"]),
    q("Quanto pelo pela casa voce tolera?", ["Pouco pelo, por favor", "Sem drama, faz parte", "Pode vir a temporada de pelos", "Prefiro pelagem facil"], 0, "A resposta ajuda a pensar em pelagem e manutencao.", null, ["independent", "social", "active", "calm"]),
    q("Voce quer um cachorro mais...", ["Colado e carinhoso", "Brincalhao com todos", "Parceiro de aventura", "Reservado e tranquilo"], 0, "Personalidade pesa tanto quanto tamanho.", null, ["calm", "social", "active", "independent"]),
    q("Mora em qual tipo de espaco?", ["Apartamento compacto", "Casa com quintal", "Perto de parque", "Espaco pequeno e silencioso"], 0, "Espaco ajuda, mas rotina e enriquecimento tambem contam.", null, ["calm", "social", "active", "independent"]),
    q("Qual compromisso voce topa melhor?", ["Treino basico diario", "Socializacao e brincadeiras", "Exercicio forte frequente", "Cuidado de pelagem organizado"], 2, "Cada perfil pede um tipo de compromisso.", null, ["calm", "social", "active", "independent"]),
    q("Como voce recebe visitas?", ["Poucas visitas", "Casa vive cheia", "Todo mundo vai para fora brincar", "Prefiro ambiente calmo"], 1, "Caes sociaveis brilham em casas movimentadas.", null, ["calm", "social", "active", "independent"]),
    q("Seu nivel de experiencia com caes e...", ["Primeiro cachorro", "Ja cuidei algumas vezes", "Tenho bastante experiencia", "Prefiro um companheiro simples"], 0, "Primeiro cachorro costuma pedir perfil mais previsivel.", null, ["calm", "social", "active", "independent"]),
    q("Que som define seu fim de semana?", ["Serie no sofa", "Gente conversando", "Tenis e mochila", "Cafe e silencio"], 2, "Seu fim de semana entrega muito do cachorro ideal.", null, ["calm", "social", "active", "independent"]),
    q("O que voce mais valoriza?", ["Companhia calma", "Alegria e interacao", "Energia e obediencia", "Autonomia e elegancia"], 0, "O melhor match e aquele que cabe na vida real.", null, ["calm", "social", "active", "independent"])
  ]
};

const matchProfiles = {
  calm: {
    title: "Companheiro calmo",
    text: "Voce combina com caes afetuosos, de rotina estavel e energia moderada, como Cavalier, Shih-tzu ou SRD tranquilo."
  },
  social: {
    title: "Parceiro sociavel",
    text: "Seu estilo pede um cao brincalhao, amigavel e participativo, como Golden, Beagle ou um SRD expansivo."
  },
  active: {
    title: "Atleta de quatro patas",
    text: "Voce combina com caes ativos e inteligentes, como Border Collie, Labrador, Husky ou SRD cheio de energia."
  },
  independent: {
    title: "Amigo independente",
    text: "Seu match e um cao mais reservado, seguro e com boa autonomia, como Chow Chow, Shar Pei ou SRD mais sereno."
  }
};

const state = {
  quizId: null,
  index: 0,
  score: 0,
  locked: false,
  matchScores: {},
  roundQuestions: []
};

const quizGrid = document.querySelector("#quizGrid");
const quizStage = document.querySelector("#quizStage");
const resultStage = document.querySelector("#resultStage");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const categoryLabel = document.querySelector("#categoryLabel");
const questionTitle = document.querySelector("#questionTitle");
const questionVisual = document.querySelector("#questionVisual");
const answers = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#nextButton");
const backButton = document.querySelector("#backButton");
const retryButton = document.querySelector("#retryButton");
const otherQuizButton = document.querySelector("#otherQuizButton");
const resultMode = document.querySelector("#resultMode");
const resultTitle = document.querySelector("#resultTitle");
const resultText = document.querySelector("#resultText");
const scoreRing = document.querySelector("#scoreRing");
const installButton = document.querySelector("#installButton");

let deferredInstallPrompt;

renderQuizGrid();
registerPwa();

document.querySelector("[data-start-random]").addEventListener("click", () => {
  const randomQuiz = quizCatalog[Math.floor(Math.random() * quizCatalog.length)];
  startQuiz(randomQuiz.id);
});

backButton.addEventListener("click", showHome);
retryButton.addEventListener("click", () => startQuiz(state.quizId));
otherQuizButton.addEventListener("click", showHome);
nextButton.addEventListener("click", nextQuestion);

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

function img(src, alt, source) {
  return { src, alt, source };
}

function q(title, options, answer, explanation, visual = "default", weights = null, image = null) {
  return { title, options, answer, explanation, visual, weights, image };
}

function renderQuizGrid() {
  quizGrid.innerHTML = quizCatalog
    .map((quiz) => {
      const total = questions[quiz.id].length;
      return `
        <button class="quiz-card" type="button" data-quiz-id="${quiz.id}">
          <span class="quiz-icon" style="background:${quiz.accent}">${quiz.icon}</span>
          <span>
            <h3>${quiz.title}</h3>
            <p>${quiz.short}</p>
          </span>
          <span class="quiz-meta">${total} perguntas</span>
        </button>
      `;
    })
    .join("");

  quizGrid.querySelectorAll("[data-quiz-id]").forEach((button) => {
    button.addEventListener("click", () => startQuiz(button.dataset.quizId));
  });
}

function startQuiz(quizId) {
  state.quizId = quizId;
  state.index = 0;
  state.score = 0;
  state.locked = false;
  state.matchScores = { calm: 0, social: 0, active: 0, independent: 0 };
  state.roundQuestions = shuffle(questions[quizId]).map((question) => {
    const shuffledOptions = shuffle(
      question.options.map((option, optionIndex) => ({
        option,
        isCorrect: optionIndex === question.answer,
        weight: question.weights ? question.weights[optionIndex] : null
      }))
    );

    return { ...question, shuffledOptions };
  });

  document.querySelector(".hero").hidden = true;
  document.querySelector(".quiz-picker").hidden = true;
  resultStage.hidden = true;
  quizStage.hidden = false;
  renderQuestion();
  quizStage.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderQuestion() {
  const current = getCurrentQuestion();
  const quiz = quizCatalog.find((item) => item.id === state.quizId);
  const total = state.roundQuestions.length;

  state.locked = false;
  progressText.textContent = `${state.index + 1} de ${total}`;
  progressFill.style.width = `${(state.index / total) * 100}%`;
  categoryLabel.textContent = quiz.title;
  questionTitle.textContent = current.title;
  questionVisual.innerHTML = getVisual(current, state.quizId);
  feedback.hidden = true;
  feedback.textContent = "";
  nextButton.hidden = true;

  answers.innerHTML = "";
  current.shuffledOptions.forEach((answerOption, optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = answerOption.option;
    button.addEventListener("click", () => chooseAnswer(optionIndex));
    answers.appendChild(button);
  });
}

function chooseAnswer(optionIndex) {
  if (state.locked) return;
  state.locked = true;

  const current = getCurrentQuestion();
  const isMatchQuiz = state.quizId === "match";
  const selected = current.shuffledOptions[optionIndex];
  const isCorrect = selected.isCorrect;
  const buttons = [...answers.querySelectorAll(".answer-button")];

  if (isMatchQuiz) {
    const profile = selected.weight;
    state.matchScores[profile] += 1;
    state.score += 1;
  } else if (isCorrect) {
    state.score += 1;
  }

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (isMatchQuiz && index === optionIndex) button.classList.add("correct");
    if (!isMatchQuiz && current.shuffledOptions[index].isCorrect) button.classList.add("correct");
    if (!isMatchQuiz && index === optionIndex && !isCorrect) button.classList.add("wrong");
  });

  feedback.hidden = false;
  feedback.textContent = isMatchQuiz
    ? current.explanation
    : isCorrect
      ? `Acertou! ${current.explanation}`
      : `Quase. ${current.explanation}`;

  nextButton.textContent = state.index === state.roundQuestions.length - 1 ? "Ver resultado" : "Proxima";
  nextButton.hidden = false;
}

function nextQuestion() {
  const total = state.roundQuestions.length;
  if (state.index < total - 1) {
    state.index += 1;
    renderQuestion();
    return;
  }
  showResult();
}

function showResult() {
  const quiz = quizCatalog.find((item) => item.id === state.quizId);
  const total = state.roundQuestions.length;
  progressFill.style.width = "100%";
  quizStage.hidden = true;
  resultStage.hidden = false;

  resultMode.textContent = quiz.title;

  if (state.quizId === "match") {
    const winner = Object.entries(state.matchScores).sort((a, b) => b[1] - a[1])[0][0];
    const profile = matchProfiles[winner];
    resultTitle.textContent = profile.title;
    resultText.textContent = profile.text;
    scoreRing.textContent = "Match";
  } else {
    const percent = Math.round((state.score / total) * 100);
    resultTitle.textContent = getScoreTitle(percent);
    resultText.textContent = `Voce acertou ${state.score} de ${total} perguntas.`;
    scoreRing.textContent = `${percent}%`;
  }

  resultStage.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showHome() {
  quizStage.hidden = true;
  resultStage.hidden = true;
  document.querySelector(".hero").hidden = false;
  document.querySelector(".quiz-picker").hidden = false;
  document.querySelector("#home").scrollIntoView({ behavior: "smooth", block: "start" });
}

function getCurrentQuestion() {
  return state.roundQuestions[state.index];
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function getScoreTitle(percent) {
  if (percent >= 90) return "Instinto de especialista";
  if (percent >= 70) return "Mandou muito bem";
  if (percent >= 50) return "Bom faro";
  return "Hora de brincar de novo";
}

function getVisual(question, quizId) {
  if (quizId === "breed") {
    if (question.image) {
      return `
        <figure class="dog-photo-card">
          <img src="${question.image.src}" alt="${question.image.alt}" loading="eager" />
          <figcaption>
            <a href="${question.image.source}" target="_blank" rel="noreferrer">Foto: Wikimedia Commons</a>
          </figcaption>
        </figure>
      `;
    }
    return `<div class="dog-portrait">${dogSvg(question.visual)}</div>`;
  }
  if (quizId === "story") {
    return `<div class="story-visual">...</div>`;
  }
  if (quizId === "truth") {
    return `<div class="true-false-visual">V/F</div>`;
  }
  return `<div class="match-visual">Match</div>`;
}

function dogSvg(type) {
  const configs = {
    long: ["#b76b38", "38", "18", "M62 126h182c38 0 61 18 61 50v34H42v-42c0-24 8-42 20-42Z", true],
    round: ["#d8a45f", "56", "34", "M82 92h148c42 0 76 34 76 76v36H42v-36c0-42 34-76 40-76Z", false],
    curly: ["#f7f0e2", "48", "26", "M76 104h156c42 0 74 31 74 72v30H42v-30c0-41 32-72 34-72Z", false],
    wolf: ["#7f95a4", "28", "18", "M74 102h160c39 0 70 30 70 69v35H44v-35c0-39 31-69 30-69Z", false],
    spots: ["#f7f7f2", "40", "22", "M78 102h154c41 0 72 31 72 72v32H44v-32c0-41 31-72 34-72Z", false],
    short: ["#d99545", "34", "24", "M80 116h148c38 0 66 24 66 58v32H54v-32c0-34 28-58 26-58Z", true],
    golden: ["#daa647", "44", "30", "M74 102h164c42 0 72 31 72 72v32H38v-32c0-41 31-72 36-72Z", false],
    wrinkle: ["#b77a57", "50", "36", "M78 98h154c40 0 72 32 72 72v36H44v-36c0-40 32-72 34-72Z", false],
    tiny: ["#3d2c27", "34", "18", "M92 120h130c34 0 58 25 58 56v30H66v-30c0-31 24-56 26-56Z", false],
    strong: ["#2d2522", "42", "26", "M70 98h170c44 0 76 32 76 74v34H34v-34c0-42 32-74 36-74Z", false]
  };
  const [fur, earW, earH, body, low] = configs[type] || configs.round;
  const spots = type === "spots" ? `<circle cx="108" cy="136" r="14" fill="#202020"/><circle cx="224" cy="148" r="18" fill="#202020"/><circle cx="174" cy="192" r="11" fill="#202020"/>` : "";
  const curls = type === "curly" ? `<g fill="#efe5d7">${[68, 98, 128, 158, 188, 218, 248, 278].map((x) => `<circle cx="${x}" cy="112" r="17"/>`).join("")}</g>` : "";
  const wrinkles = type === "wrinkle" ? `<path d="M114 136h118M102 158h140M118 180h108" stroke="#875438" stroke-width="8" stroke-linecap="round" opacity=".65"/>` : "";
  const mask = type === "wolf" ? `<path d="M126 112 176 174l50-62c-8-19-27-34-50-34s-42 15-50 34Z" fill="#f2f5f5"/>` : "";
  const tan = type === "strong" ? `<circle cx="132" cy="142" r="14" fill="#b56f36"/><circle cx="220" cy="142" r="14" fill="#b56f36"/>` : "";

  return `
    <svg viewBox="0 0 360 280" role="img" aria-label="Desenho de cachorro do quiz">
      <rect width="360" height="280" rx="28" fill="#fff6e3"/>
      <path d="${body}" fill="${fur}"/>
      <ellipse cx="176" cy="${low ? 98 : 90}" rx="82" ry="72" fill="${fur}"/>
      <ellipse cx="102" cy="104" rx="${earW}" ry="${earH}" fill="#5a3627" transform="rotate(-32 102 104)"/>
      <ellipse cx="250" cy="104" rx="${earW}" ry="${earH}" fill="#5a3627" transform="rotate(32 250 104)"/>
      ${curls}
      ${mask}
      ${spots}
      ${tan}
      ${wrinkles}
      <circle cx="146" cy="90" r="8" fill="#1c1714"/>
      <circle cx="206" cy="90" r="8" fill="#1c1714"/>
      <ellipse cx="176" cy="124" rx="18" ry="13" fill="#1c1714"/>
      <path d="M176 137c-6 19-28 20-40 8M176 137c6 19 28 20 40 8" fill="none" stroke="#1c1714" stroke-width="7" stroke-linecap="round"/>
      <path d="M68 206h216" stroke="rgba(20,33,31,.16)" stroke-width="10" stroke-linecap="round"/>
    </svg>
  `;
}

async function registerPwa() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("service-worker.js");
    } catch (error) {
      console.warn("Service worker indisponivel", error);
    }
  }
}
