import { spawn } from 'child_process';

process.env.ROLLUP_SKIP_NODEJS_NATIVE = 'true';

console.log('🚀 Starting SkillPath AI Full Stack Platform...');

const backend = spawn('node', ['server/index.js'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT: '5001' }
});

const frontend = spawn('npx.cmd', ['vite', '--port', '3000', '--host'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, ROLLUP_SKIP_NODEJS_NATIVE: 'true' }
});

const cleanup = () => {
  backend.kill();
  frontend.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
