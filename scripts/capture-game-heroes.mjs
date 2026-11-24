import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const baseURL = process.argv[2] ?? 'http://127.0.0.1:4176';
const output = resolve('test-results/game-heroes');
const games = ['starfall-acre', 'hollowlight', 'summit', 'ember-oath', 'driftlight'];
mkdirSync(output, { recursive: true });

const browser = await chromium.launch({ headless: true });
for (const game of games) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}/${game}/`, { waitUntil: 'networkidle' });
  const hero = page.locator('#top');
  const box = await hero.boundingBox();
  if (box && box.height > 1100) {
    await page.screenshot({ path: resolve(output, `${game}.png`) });
  } else {
    await hero.screenshot({ path: resolve(output, `${game}.png`) });
  }
  console.log(`Captured ${game}`);
  await context.close();
}
await browser.close();
