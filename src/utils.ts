import { spawn } from 'child_process';
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

export const runCommand = (command: string, args?: string[]) =>
  new Promise(resolve => {
    const child = spawn(command, args);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on('close', code => {
      showInfo(`child process exited with code ${code}`);
      resolve();
    });
  });

const format = (time: Date) => time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
export const showError = (message: string) => console.error('\x1b[31m', message, '\x1b[0m');
export const showInfo = (message: string) => console.info('\x1b[34m[', format(new Date()), ']\x1b[0m', message);
