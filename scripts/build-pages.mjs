import { cpSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const root = fileURLToPath(new URL('../', import.meta.url));
const site = resolve(root, 'site');
const apps = [
  'blockbound',
  'starfall-acre',
  'hollowlight',
  'summit',
  'ember-oath',
  'driftlight',
];

rmSync(site, { recursive: true, force: true });

for (const slug of apps) {
  console.log(`Building ${slug}...`);
  await build({
    root: resolve(root, 'examples', slug),
    base: './',
    build: {
      outDir: resolve(site, slug),
      emptyOutDir: true,
    },
  });
}

cpSync(resolve(root, 'showcase'), site, { recursive: true });
console.log('Showcase site built in /site');
