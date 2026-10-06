// Captura o site atual (Ueni) para o bloco "o que o cliente encontra hoje".
import { chromium } from "playwright";

const URL = "https://nevaska-refrigeracao.ueniweb.com";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

for (const [nome, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: nome === "mobile" ? 2 : 1 });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `public/antes/ueni-${nome}.png` });
  await page.screenshot({ path: `public/antes/ueni-${nome}-full.png`, fullPage: true });
  if (nome === "desktop") console.log(await page.evaluate(() => document.body.innerText));
  await page.close();
}
await browser.close();
