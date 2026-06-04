import { readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
  "service-worker.js",
  "assets/icon.svg"
];

for (const file of requiredFiles) {
  await readFile(file, "utf8");
}

const [html, app, manifest, sw] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("app.js", "utf8"),
  readFile("manifest.json", "utf8"),
  readFile("service-worker.js", "utf8")
]);

for (const text of ["Pet Rescue Blocks", "gameCanvas", "banner-ad", "interstitial-ad"]) {
  if (!html.includes(text)) throw new Error(`HTML incompleto: ${text}`);
}

for (const text of ["localStorage", "+1 pet ajudado", "continueAfterAd", "requestAnimationFrame"]) {
  if (!app.includes(text)) throw new Error(`Logica ausente: ${text}`);
}

if (JSON.parse(manifest).name !== "Pet Rescue Blocks") {
  throw new Error("Manifest com nome incorreto.");
}

if (!sw.includes("manifest.json") || !sw.includes("style.css")) {
  throw new Error("Service worker nao esta cacheando o PWA atual.");
}

console.log("Check OK: Pet Rescue Blocks PWA completo.");
