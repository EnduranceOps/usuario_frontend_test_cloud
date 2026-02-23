#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

function run(cmd, args = [], cwd = process.cwd()) {
  console.log(`\n> ${cmd} ${args.join(' ')}`);
  const result = spawnSync(cmd, args, {
    cwd,
    stdio: 'inherit',
    shell: true,
  });
  if (result.status !== 0) {
    console.error(`Command failed with exit code ${result.status}`);
    process.exit(result.status);
  }
}

const root = path.resolve(__dirname, '..');

console.log('🚀 Inicializando frontend...');

// 1. Instalar dependencias
console.log('\n📦 Instalando dependencias...');
run('npm', ['install'], root);

// 2. Generar env.js desde .env raíz
console.log('\n⚙️  Generando archivo de configuración...');
run('node', ['scripts/generate-env.js'], root);

// 3. Iniciar servidor de desarrollo
console.log('\n🔥 Iniciando servidor de desarrollo...');
run('npm', ['run', 'dev'], root);
