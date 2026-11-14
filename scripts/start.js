import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

process.env.ROLLUP_SKIP_NODEJS_NATIVE = 'true';

console.log('🚀 Starting Learnexa Full Stack Platform...');

const isWin = process.platform === 'win32';

const backend = spawn('node', ['server/index.js'], {
  stdio: 'inherit',
  shell: isWin,
  env: { ...process.env, PORT: '5001' }
});

const localViteCmd = path.resolve('node_modules', '.bin', isWin ? 'vite.cmd' : 'vite');
const localVite = path.resolve('node_modules', '.bin', 'vite');

let bin;
let args = ['--port', '3000', '--host'];

if (fs.existsSync(localViteCmd)) {
  bin = localViteCmd;
} else if (fs.existsSync(localVite)) {
  bin = localVite;
} else {
  bin = isWin ? 'npx.cmd' : 'npx';
  args = ['vite', '--port', '3000', '--host'];
}

const frontend = spawn(bin, args, {
  stdio: 'inherit',
  shell: isWin,
  env: { ...process.env, ROLLUP_SKIP_NODEJS_NATIVE: 'true' }
});

const cleanup = () => {
  backend.kill();
  frontend.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

