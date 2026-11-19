#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const rootDir = process.cwd();
const errors = [];
const summary = {
  checks: {},
  passed: false,
};

function fail(checkName, message) {
  errors.push(`[${checkName}] ${message}`);
  summary.checks[checkName] = { status: 'FAILED', message };
}

function pass(checkName, detail = 'OK') {
  summary.checks[checkName] = { status: 'PASSED', detail };
}

// 1. Check vercel.json rewrites
try {
  const vercelPath = resolve(rootDir, 'vercel.json');
  if (!existsSync(vercelPath)) {
    fail('vercel_json', 'vercel.json does not exist');
  } else {
    const vercelConfig = JSON.parse(readFileSync(vercelPath, 'utf8'));
    const rewrites = vercelConfig.rewrites || [];
    const proxyRewrite = rewrites.find(
      (r) =>
        r.source === '/api/:path*' &&
        r.destination === 'https://titanforge-site.vercel.app/api/:path*'
    );
    if (!proxyRewrite) {
      fail(
        'vercel_rewrites',
        'vercel.json is missing required rewrite: /api/:path* -> https://titanforge-site.vercel.app/api/:path*'
      );
    } else {
      pass('vercel_rewrites', 'Proxy rewrite configured correctly');
    }
  }
} catch (err) {
  fail('vercel_json', `Failed reading or parsing vercel.json: ${err.message}`);
}

// 2. Check forbidden directories
const forbiddenDirs = ['api', 'app/api', 'supabase', '.cortex', '.serena'];
for (const dir of forbiddenDirs) {
  const fullPath = resolve(rootDir, dir);
  if (existsSync(fullPath)) {
    fail('forbidden_directories', `Forbidden directory exists: ${dir}`);
  }
}
if (!errors.some((e) => e.startsWith('[forbidden_directories]'))) {
  pass('forbidden_directories', 'No forbidden directories found');
}

// 3. Check for .env files
const forbiddenEnvFiles = ['.env', '.env.local', '.env.production', '.env.development'];
for (const envFile of forbiddenEnvFiles) {
  const fullPath = resolve(rootDir, envFile);
  if (existsSync(fullPath)) {
    fail('forbidden_env_files', `Forbidden env file exists: ${envFile}`);
  }
}
if (!errors.some((e) => e.startsWith('[forbidden_env_files]'))) {
  pass('forbidden_env_files', 'No forbidden env files found');
}

// 4. Check titan-events.js and /apply route
const titanEventsPath = resolve(rootDir, 'titan-events.js');
if (!existsSync(titanEventsPath)) {
  fail('titan_events', 'titan-events.js does not exist');
} else {
  pass('titan_events', 'titan-events.js exists');
}

const applyDir = resolve(rootDir, 'apply');
const appApplyDir = resolve(rootDir, 'app/apply');
if (!existsSync(applyDir) && !existsSync(appApplyDir)) {
  fail('apply_route', 'Neither apply/ nor app/apply/ exists');
} else {
  pass('apply_route', 'Apply route files exist');
}

// 5. Check CLAUDE.md, .github/CODEOWNERS, .github/workflows/platform-integrity-gate.yml
const requiredFiles = [
  'CLAUDE.md',
  '.github/CODEOWNERS',
  '.github/workflows/platform-integrity-gate.yml',
];

for (const reqFile of requiredFiles) {
  const fullPath = resolve(rootDir, reqFile);
  if (!existsSync(fullPath)) {
    fail('required_files', `Required file missing: ${reqFile}`);
  }
}
if (!errors.some((e) => e.startsWith('[required_files]'))) {
  pass('required_files', 'All required policy and workflow files exist');
}

// Final evaluation
if (errors.length === 0) {
  summary.passed = true;
  console.log(JSON.stringify(summary, null, 2));
  process.exit(0);
} else {
  summary.passed = false;
  summary.errors = errors;
  console.error(JSON.stringify(summary, null, 2));
  process.exit(1);
}
