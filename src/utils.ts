import { request } from 'https';

export const fetchSvg = (url: string) =>
  new Promise<string>((resolve, reject) => {
    const req = request(url, { headers: { 'Content-Type': 'images/svg+xml' } }, response => {
      let data = '';
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.end();
  });
