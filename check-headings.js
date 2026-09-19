const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

function getAllMdFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllMdFiles(filePath, arrayOfFiles);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      arrayOfFiles.push(filePath);
    }
  });
  return arrayOfFiles.sort();
}

const mdFiles = getAllMdFiles(docsDir);

const results = [];
let totalIssues = 0;

mdFiles.forEach((file) => {
  const relPath = path.relative(__dirname, file);
  const content = fs.readFileSync(file, 'utf8');

  // Check YAML frontmatter
  let hasTitleFrontmatter = false;
  let frontmatterTitle = '';
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (fmMatch) {
    const fm = fmMatch[1];
    const titleMatch = fm.match(/^title:\s*(.+)$/m);
    if (titleMatch) {
      hasTitleFrontmatter = true;
      frontmatterTitle = titleMatch[1].trim().replace(/^['"]|['"]$/g, '');
    }
  }

  const body = fmMatch ? content.slice(fmMatch[0].length) : content;
  const lines = body.split('\n');
  let inCodeBlock = false;
  const headings = [];

  if (hasTitleFrontmatter) {
    headings.push({
      level: 1,
      text: `[Frontmatter Title] ${frontmatterTitle}`,
      line: 1,
      source: 'frontmatter'
    });
  }

  lines.forEach((line, idx) => {
    const lineNo = (fmMatch ? fmMatch[0].split('\n').length : 0) + idx + 1;
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return;
    }
    if (inCodeBlock) return;

    // Check MD headers (# Header)
    const mdMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (mdMatch) {
      headings.push({
        level: mdMatch[1].length,
        text: mdMatch[2].trim(),
        line: lineNo,
        source: 'md'
      });
      return;
    }

    // Check HTML headers (<h1 ...> ... </h1>)
    const htmlMatch = line.match(/<h([1-6])[\s>]([\s\S]*?)(?:<\/h\1>|>)/i);
    if (htmlMatch) {
      const level = parseInt(htmlMatch[1], 10);
      const rawText = htmlMatch[2].replace(/<[^>]+>/g, '').trim();
      headings.push({
        level,
        text: rawText,
        line: lineNo,
        source: 'html'
      });
    }
  });

  const issues = [];

  // Check H1 count
  const h1s = headings.filter(h => h.level === 1);
  if (h1s.length > 1) {
    issues.push({
      type: 'MULTIPLE_H1',
      details: `Found ${h1s.length} H1 headings: ${h1s.map(h => `"${h.text}" (L${h.line})`).join(', ')}`
    });
  } else if (h1s.length === 0) {
    issues.push({
      type: 'MISSING_H1',
      details: 'No H1 heading found in frontmatter or document body'
    });
  }

  // Check heading sequence jumps
  let prevLevel = 0;
  let prevHeading = null;
  headings.forEach(h => {
    if (prevLevel > 0) {
      if (h.level > prevLevel + 1) {
        issues.push({
          type: 'SKIPPED_LEVEL',
          details: `Line ${h.line}: H${h.level} ("${h.text}") skips level from H${prevLevel} ("${prevHeading.text}")`
        });
      }
    }
    prevLevel = h.level;
    prevHeading = h;
  });

  if (issues.length > 0) {
    totalIssues += issues.length;
    results.push({ file: relPath, issues, headings });
  }
});

console.log('=== SEO HEADING HIERARCHY CHECK ===\n');
if (results.length === 0) {
  console.log(`✅ All ${mdFiles.length} markdown documentation files passed heading sequence validation!\n`);
  process.exit(0);
} else {
  results.forEach(r => {
    console.log(`📄 ${r.file}`);
    r.issues.forEach(iss => console.log(`   ❌ [${iss.type}] ${iss.details}`));
    console.log('');
  });
  console.log(`❌ Found ${totalIssues} issue(s) across ${results.length} file(s).\n`);
  process.exit(1);
}
