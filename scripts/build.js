const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const ignore = new Set(['node_modules', '.git', '.vercel']);
const jsFiles = [];
const required = [
  'index.html',
  'products.html',
  'order.html',
  'about.html',
  'contact.html',
  'promotions.html',
  'admin/index.html',
  'admin/login.html',
  'assets/styles.css',
  'assets/app.js',
  'api/health.js',
  'api/orders.js',
  'api/admin/login.js'
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignore.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.js')) jsFiles.push(full);
  }
}

for (const rel of required) {
  if (!fs.existsSync(path.join(root, rel))) {
    console.error(`Missing required file: ${rel}`);
    process.exit(1);
  }
}

walk(root);
for (const file of jsFiles) {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status || 1);
  }
}
console.log(`Syntax check passed for ${jsFiles.length} JS files.`);
