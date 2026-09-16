import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);
await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));

async function shot(sel, name) {
  await page.evaluate((s) => {
    const el = [...document.querySelectorAll("h2")].find((h) => h.textContent.includes(s));
    el?.scrollIntoView({ block: "start" });
    window.scrollBy(0, -80);
  }, sel);
  await page.waitForTimeout(900);
  await page.screenshot({ path: name });
}

await page.screenshot({ path: "/home/user/shots/hero-dark.png" });
await shot("Recent motions", "/home/user/shots/rail-dark.png");
await shot("One complete stack", "/home/user/shots/stack-dark.png");

await page.evaluate(() => document.documentElement.classList.add("light"));
await page.waitForTimeout(500);
await page.screenshot({ path: "/home/user/shots/stack-light-top.png" });
await shot("One complete stack", "/home/user/shots/stack-light.png");
await shot("Recent motions", "/home/user/shots/rail-light.png");
await browser.close();
console.log("shots done");
