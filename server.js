import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

const server = http.createServer((req, res) => {
  // Decode URL to handle Russian file names and spaces
  let decodedUrl = '';
  try {
    decodedUrl = decodeURIComponent(req.url);
  } catch (e) {
    decodedUrl = req.url;
  }

  // Remove query parameters
  const qIdx = decodedUrl.indexOf('?');
  if (qIdx !== -1) {
    decodedUrl = decodedUrl.substring(0, qIdx);
  }

  let filePath = path.join(DIST_DIR, decodedUrl === '/' ? 'index.html' : decodedUrl);
  
  // Safe path check to prevent directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath);
  let contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routing (history mode)
      filePath = path.join(DIST_DIR, 'index.html');
      contentType = 'text/html';
    }

    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.statusCode = 500;
        res.end('Server Error');
      } else {
        const headers = { 'Content-Type': contentType };
        if (contentType === 'text/html' || ext === '.json') {
          headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, proxy-revalidate';
        } else if (['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2', '.ico'].includes(ext)) {
          headers['Cache-Control'] = 'public, max-age=31536000, immutable';
        }
        res.writeHead(200, headers);
        res.end(content, 'utf-8');
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
