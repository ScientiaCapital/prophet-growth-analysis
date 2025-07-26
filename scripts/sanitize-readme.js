#!/usr/bin/env node

/**
 * README Sanitization Script for Stealth Mode
 * Removes sensitive information from README files before commit
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Patterns to remove or replace for stealth mode
const SENSITIVE_PATTERNS = [
  // Company/Product specific information
  { pattern: /Prophet Analytics/gi, replacement: '[Product Name]' },
  { pattern: /prophet-analytics/gi, replacement: '[project-name]' },
  
  // Technical stack details that might reveal too much
  { pattern: /Facebook's Prophet/gi, replacement: '[Forecasting Library]' },
  { pattern: /Google ADK/gi, replacement: '[Agent Framework]' },
  { pattern: /Supabase/gi, replacement: '[Database Service]' },
  
  // Specific agent names
  { pattern: /Financial Wizard/gi, replacement: '[Agent 1]' },
  { pattern: /Research Ninja/gi, replacement: '[Agent 2]' },
  { pattern: /Code Samurai/gi, replacement: '[Agent 3]' },
  { pattern: /Data Alchemist/gi, replacement: '[Agent 4]' },
  { pattern: /Efficiency Master/gi, replacement: '[Agent 5]' },
  { pattern: /Architect Agent/gi, replacement: '[Agent 6]' },
  
  // Model names and costs
  { pattern: /DeepSeek-R1/gi, replacement: '[Model A]' },
  { pattern: /Perplexity Pro/gi, replacement: '[Model B]' },
  { pattern: /Mistral Large 2/gi, replacement: '[Model C]' },
  { pattern: /Cohere Command R\+/gi, replacement: '[Model D]' },
  { pattern: /Llama 3\.3/gi, replacement: '[Model E]' },
  { pattern: /Gemini 2\.0 Pro/gi, replacement: '[Model F]' },
  
  // Cost information
  { pattern: /\$[\d.,]+\/[\d\w\s]+/g, replacement: '[COST]' },
  { pattern: /\$[\d.,]+/g, replacement: '[PRICE]' },
  
  // URLs and endpoints
  { pattern: /https?:\/\/[^\s]+/g, replacement: '[URL]' },
  { pattern: /\/api\/v\d\/[^\s]+/g, replacement: '[API_ENDPOINT]' },
  
  // Email addresses
  { pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, replacement: '[EMAIL]' },
  
  // API keys or tokens (if accidentally included)
  { pattern: /[a-zA-Z0-9]{32,}/g, replacement: '[TOKEN]' },
  
  // Specific metrics or KPIs
  { pattern: /99\.99%/g, replacement: '[HIGH]%' },
  { pattern: /10,000\+? concurrent/gi, replacement: '[MANY] concurrent' },
  { pattern: /< ?200ms/gi, replacement: '[FAST]' },
];

// Files to sanitize
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

function sanitizeContent(content) {
  let sanitized = content;
  
  SENSITIVE_PATTERNS.forEach(({ pattern, replacement }) => {
    sanitized = sanitized.replace(pattern, replacement);
  });
  
  return sanitized;
}

function sanitizeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const sanitized = sanitizeContent(content);
    
    if (content !== sanitized) {
      // Create backup of original
      const backupPath = filePath + '.backup';
      fs.writeFileSync(backupPath, content);
      
      // Write sanitized version
      fs.writeFileSync(filePath, sanitized);
      
      console.log(`✅ Sanitized: ${filePath}`);
      console.log(`   Backup saved to: ${backupPath}`);
      
      // Add backup to .gitignore if not already there
      const gitignorePath = path.join(process.cwd(), '.gitignore');
      if (fs.existsSync(gitignorePath)) {
        const gitignore = fs.readFileSync(gitignorePath, 'utf8');
        if (!gitignore.includes('*.backup')) {
          fs.appendFileSync(gitignorePath, '\n# README backups\n*.backup\n');
        }
      }
    } else {
      console.log(`✅ Already sanitized: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error sanitizing ${filePath}:`, error.message);
    process.exit(1);
  }
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
  console.log('🤫 Sanitizing README files for stealth mode...\n');
  
  const readmeFiles = findReadmeFiles();
  
  if (readmeFiles.length === 0) {
    console.log('No README files found to sanitize.');
    return;
  }
  
  console.log(`Found ${readmeFiles.length} README file(s) to check:\n`);
  
  readmeFiles.forEach(file => {
    sanitizeFile(file);
  });
  
  console.log('\n✅ README sanitization complete!');
  console.log('💡 Original files backed up with .backup extension');
  console.log('⚠️  Remember to review changes before committing');
}

// Run the script
main();