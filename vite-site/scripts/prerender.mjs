import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'fs';
import { dirname, join, extname, resolve } from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, '../dist');

async function prerender() {
  const sitemapPath = join(distDir, 'sitemap.xml');
  if (!existsSync(sitemapPath)) {
    console.error('sitemap.xml not found in dist/. Please run build first.');
    process.exit(1);
  }
  
  const sitemapContent = readFileSync(sitemapPath, 'utf-8');
  const locRegex = /<loc>(.+?)<\/loc>/g;
  const paths = [];
  let match;
  while ((match = locRegex.exec(sitemapContent)) !== null) {
    try {
      paths.push(new URL(match[1]).pathname);
    } catch(e) {}
  }

  const routes = [...new Set(paths)];
  console.log(`[PRERENDER] Found ${routes.length} routes to prerender from sitemap.`);

  console.log('[PRERENDER] Starting dedicated SPA HTTP server...');
  
  // 確実なSPAフォールバックを実現する最低限のHTTPサーバー
  const server = http.createServer((req, res) => {
    let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url);
    const ext = extname(filePath);
    
    // パスに拡張子がない、またはファイルが存在しない場合は index.html を返す
    if (!ext || !existsSync(filePath) || statSync(filePath).isDirectory()) {
      filePath = join(distDir, 'index.html');
    }

    const mimeTypes = {
      '.html': 'text/html',
      '.js':   'text/javascript',
      '.css':  'text/css',
      '.png':  'image/png',
      '.jpg':  'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg':  'image/svg+xml',
      '.json': 'application/json',
      '.mp4':  'video/mp4',
      '.webm': 'video/webm'
    };
    
    const contentType = mimeTypes[extname(filePath)] || 'application/octet-stream';
    
    try {
      const content = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not found: ' + req.url);
      } else {
        res.writeHead(500);
        res.end('Server error: ' + err.code);
      }
    }
  });

  await new Promise(res => server.listen(5174, '127.0.0.1', res));
  const baseUrl = `http://127.0.0.1:5174`;
  console.log(`[PRERENDER] Internal SPA server running at ${baseUrl}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const route of routes) {
    if (route.match(/\.\w+$/)) continue; 
    
    console.log(`[PRERENDER] Prerendering route: ${route}`);
    try {
      // 完全にロードされるまで待機（動画等へのnetworkidle待機を回避）
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'load' });
      // アプリケーションがDOMにレンダリングされるまで待機(透明度0でもOK)
      await page.waitForSelector('#root > *', { state: 'attached', timeout: 5000 });
      // ヘルメットタグの注入と状態の安定化を待機
      await page.waitForTimeout(1500); 

      let html = await page.content(); 
      
      let outPath = join(distDir, route, 'index.html');
      if (route === '/') {
          outPath = join(distDir, 'index.html');
      }
      
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, html, 'utf-8');
      console.log(`[PRERENDER] Saved: ${outPath}`);
    } catch(err) {
      console.error(`[PRERENDER] Failed to prerender ${route}:`, err.message);
    }
  }

  await browser.close();
  server.close();
  console.log('[PRERENDER] All SSG pages generated successfully.');
}

prerender().catch(e => {
  console.error(e);
  process.exit(1);
});
