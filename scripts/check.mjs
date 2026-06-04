import { readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "service-worker.js",
  "assets/icon.svg"
];

for (const file of requiredFiles) {
  await readFile(file, "utf8");
}

const app = await readFile("app.js", "utf8");
const questionCount = (app.match(/\bq\("/g) || []).length;

if (questionCount < 20 || questionCount > 50) {
  throw new Error(`Quantidade de perguntas fora da meta: ${questionCount}`);
}

for (const quizId of ["breed", "story", "truth", "match"]) {
  if (!app.includes(`${quizId}: [`)) {
    throw new Error(`Quiz ausente: ${quizId}`);
  }
}

console.log(`Check OK: ${questionCount} perguntas e PWA completo.`);
