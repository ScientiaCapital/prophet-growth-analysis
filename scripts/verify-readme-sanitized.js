#!/usr/bin/env node

/**
 * README Verification Script
 * Ensures README files don't contain sensitive information before push
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Patterns that should NOT be in sanitized READMEs
const FORBIDDEN_PATTERNS = [
  // Product/Company names
  /Prophet Analytics/i,
  /prophet-analytics/i,
  
  // Specific technology names
  /Facebook's Prophet/i,
  /Google ADK/i,
  /Supabase/i,
  
  // Agent names
  /Financial Wizard/i,
  /Research Ninja/i,
  /Code Samurai/i,
  /Data Alchemist/i,
  /Efficiency Master/i,
  /Architect Agent/i,
  
  // Model names
  /DeepSeek-R1/i,
  /Perplexity Pro/i,
  /Mistral Large/i,
  /Cohere Command/i,
  /Llama 3\./i,
  /Gemini 2\./i,
  
  // Specific costs (dollar amounts with context)
  /\$\d+\.?\d*\/\d+[KM]?\s*(tokens|requests)/i,
  /\$\d+\.?\d*\s*per\s*(month|user)/i,
  
  // Specific performance metrics
  /99\.99%\s*uptime/i,
  /10,000\s*concurrent/i,
  /< ?200ms\s*latency/i,
  
  // Real email addresses (not example ones)
  /[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|company)\.com/i,
  
  // Potential API keys or secrets
  /api[_-]?key\s*[:=]\s*["']?[a-zA-Z0-9]{20,}/i,
  /secret\s*[:=]\s*["']?[a-zA-Z0-9]{20,}/i,
  /token\s*[:=]\s*["']?[a-zA-Z0-9]{20,}/i,
];

// Files to check
const README_PATTERNS = [
  '**/README.md',
  '**/readme.md',
  '**/README.MD',
  '**/Readme.md'
];

// Directories to exclude
const EXCLUDE_DIRS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.next',
  'coverage'
];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];
  
  FORBIDDEN_PATTERNS.forEach((pattern, index) => {
    const matches = content.match(pattern);
    if (matches) {
      violations.push({
        pattern: pattern.toString(),
        found: matches[0],
        line: getLineNumber(content, matches.index)
      });
    }
  });
  
  return violations;
}

function getLineNumber(content, index) {
  if (!index) return 'unknown';
  const lines = content.substring(0, index).split('\n');
  return lines.length;
}

function findReadmeFiles() {
  const files = [];
  
  README_PATTERNS.forEach(pattern => {
    const found = glob.sync(pattern, {
      ignore: EXCLUDE_DIRS.map(dir => `**/${dir}/**`)
    });
    files.push(...found);
  });
  
  return [...new Set(files)]; // Remove duplicates
}

function main() {
  console.log('🔍 Verifying README files are properly sanitized...\n');
  
  const readmeFiles = findReadmeFiles();
  let hasViolations = false;
  
  if (readmeFiles.length === 0) {
    console.log('No README files found to verify.');
    return;
  }
  
  readmeFiles.forEach(file => {
    const violations = checkFile(file);
    
    if (violations.length > 0) {
      hasViolations = true;
      console.log(`❌ ${file} contains sensitive information:`);
      violations.forEach(v => {
        console.log(`   Line ${v.line}: Found "${v.found}"`);
      });
      console.log('');
    } else {
      console.log(`✅ ${file} is properly sanitized`);
    }
  });
  
  if (hasViolations) {
    console.log('\n❌ Sensitive information detected in README files!');
    console.log('💡 Run "node scripts/sanitize-readme.js" to fix');
    process.exit(1);
  } else {
    console.log('\n✅ All README files are properly sanitized for stealth mode!');
  }
}

// Run the script
main();