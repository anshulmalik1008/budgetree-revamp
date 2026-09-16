import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4500);
await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = "auto";
});
// warm-up pass so reveals/layers exist
for (let i = 0; i < 40; i++) {
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(40);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(600);

const fps = await page.evaluate(
  () =>
    new Promise((resolve) => {
      let frames = 0;
      let longFrames = 0;
      let last = performance.now();
      const start = last;
      function tick(now) {
        frames++;
        if (now - last > 34) longFrames++; // frames slower than ~30fps
        last = now;
        if (now - start < 3000) requestAnimationFrame(tick);
        else
          resolve({
            fps: Math.round(frames / ((now - start) / 1000)),
            longFrames,
          });
      }
      requestAnimationFrame(tick);
      const iv = setInterval(() => window.scrollBy(0, 350), 90);
      setTimeout(() => clearInterval(iv), 3000);
    })
);
console.log("SCROLL FPS:", JSON.stringify(fps));
await browser.close();
