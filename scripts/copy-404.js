import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const indexPath = path.resolve(distDir, 'index.html');
const dest404 = path.resolve(distDir, '404.html');

if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, dest404);
  console.log('✅ Generated dist/404.html for GitHub Pages SPA fallback');
}

// Copy root 404.html as well for direct root deployment
const root404 = path.resolve('404.html');
if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, root404);
}

// Sync dist/assets to root assets/ so GitHub Pages works directly from main branch
const distAssetsDir = path.resolve(distDir, 'assets');
const rootAssetsDir = path.resolve('assets');

if (fs.existsSync(distAssetsDir)) {
  if (!fs.existsSync(rootAssetsDir)) {
    fs.mkdirSync(rootAssetsDir, { recursive: true });
  }
  const files = fs.readdirSync(distAssetsDir);
  for (const file of files) {
    const src = path.join(distAssetsDir, file);
    const dest = path.join(rootAssetsDir, file);
    fs.copyFileSync(src, dest);
    if (file.endsWith('.js')) {
      fs.copyFileSync(src, path.join(rootAssetsDir, 'index.js'));
    } else if (file.endsWith('.css')) {
      fs.copyFileSync(src, path.join(rootAssetsDir, 'index.css'));
    }
  }
  console.log('✅ Synced production assets to root ./assets/ for direct main branch GitHub Pages deployment');
}
