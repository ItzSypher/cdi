// Abre a página em desktop/mobile, nos dois temas, tira prints e confere scroll horizontal.
// Uso: node scripts/verificar.mjs http://localhost:4173 pasta-de-saida
import { chromium } from "playwright";

const [, , base = "http://localhost:4173", out = "."] = process.argv;
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const casos = [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
];

for (const tema of ["dark", "light"]) {
  for (const [nome, viewport] of casos) {
    const ctx = await browser.newContext({ viewport, colorScheme: tema, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const erros = [];
    page.on("pageerror", (e) => erros.push(e.message));
    page.on("console", (m) => m.type() === "error" && erros.push(m.text()));
    await page.goto(base, { waitUntil: "networkidle" });
    if (nome === "desktop" && tema === "dark") {
      await page.waitForTimeout(1300);
      await page.screenshot({ path: `${out}/preloader.png` });
    }
    await page.waitForSelector("main", { timeout: 6000 });
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${out}/${tema}-${nome}-hero.png` });
    // rola a página inteira para disparar os reveals
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 500) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(800);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    await page.screenshot({ path: `${out}/${tema}-${nome}-full.png`, fullPage: true });
    console.log(tema, nome, "overflow-x:", overflow, "erros:", erros.length ? erros : "nenhum");
    await ctx.close();
  }
}

// calculadora reage ao slider?
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base, { waitUntil: "networkidle" });
await page.waitForSelector("#conta input[type=range]");
const antes = await page.locator("#conta p.text-\\[clamp\\(2\\.4rem\\,6vw\\,3\\.6rem\\)\\]").innerText();
await page.locator("#conta input[type=range]").first().fill("300");
await page.waitForTimeout(900);
const depois = await page.locator("#conta p.text-\\[clamp\\(2\\.4rem\\,6vw\\,3\\.6rem\\)\\]").innerText();
console.log("calculadora:", antes.replace(/\s+/g, " "), "->", depois.replace(/\s+/g, " "));
await browser.close();
