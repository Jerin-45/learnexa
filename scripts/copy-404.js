import fs from 'fs';
import path from 'path';

const indexPath = path.resolve('dist', 'index.html');
const destPath = path.resolve('dist', '404.html');

if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, destPath);
  console.log('✅ Generated dist/404.html for GitHub Pages SPA fallback');
}
