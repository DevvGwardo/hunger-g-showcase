import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { build } from 'vite';

const root = process.cwd();
const site = resolve(root, 'site');
const blockbound = resolve(site, 'blockbound');

rmSync(site, { recursive: true, force: true });
mkdirSync(blockbound, { recursive: true });

process.chdir(resolve(root, 'examples/blockbound'));
await build({
  base: '/blockbound/',
  build: {
    outDir: blockbound,
    emptyOutDir: true,
  },
});

process.chdir(root);
cpSync(resolve(root, 'showcase'), site, { recursive: true });
console.log('Showcase site built in /site');
