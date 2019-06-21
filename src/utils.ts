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

const format = (time: Date) => time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
export const showError = (message: string) => console.error('\x1b[31m', message, '\x1b[0m');
export const showInfo = (message: string) => console.info('\x1b[34m[', format(new Date()), ']\x1b[0m', message);
