import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function photoUploadPlugin(): Plugin {
  return {
    name: 'photo-upload-plugin',
    configureServer(server) {
      server.middlewares.use('/api/upload-photo', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { filePath, base64Data } = JSON.parse(body);
              if (!filePath || !base64Data) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing parameters' }));
                return;
              }

              // Sanitize path (e.g. "school/class-10/photo-01.jpg" or "friends-weddings/wedding-01.jpg")
              const cleanRelPath = filePath.replace(/^[/\\]+/, '').replace(/\.\./g, '');
              const destPath = path.resolve(__dirname, 'public/images', cleanRelPath);

              fs.mkdirSync(path.dirname(destPath), { recursive: true });

              const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, '');
              fs.writeFileSync(destPath, Buffer.from(base64Clean, 'base64'));

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, savedPath: `/images/${cleanRelPath}` }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err?.message || 'Server error' }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), photoUploadPlugin()],
  server: {
    port: 5173,
    host: true,
  },
});
