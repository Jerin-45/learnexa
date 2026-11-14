import { spawn } from 'child_process';

process.env.ROLLUP_SKIP_NODEJS_NATIVE = 'true';

const vite = spawn('npx.cmd', ['vite', '--port', '3000', '--host'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, ROLLUP_SKIP_NODEJS_NATIVE: 'true' }
});

vite.on('close', (code) => {
  process.exit(code || 0);
});
