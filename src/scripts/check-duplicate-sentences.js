import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, '../content/blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

// Map of normalized sentence -> Array of { file, original }
const sentenceMap = new Map();

function cleanText(text) {
  return text
    .replace(/^---[\s\S]*?---\n/, '') // strip frontmatter
    .replace(/```[\s\S]*?```/g, '')   // strip code blocks
    .replace(/<[^>]+>/g, ' ')         // strip html tags
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // replace markdown links with text
    .replace(/[#*_`]/g, ' ')          // strip markdown formatting
    .replace(/\s+/g, ' ');
}

for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
  const cleaned = cleanText(raw);
  
  // Split into sentences by period, exclamation, question mark, or newlines
  const sentences = cleaned.split(/(?<=[.?!])\s+/);
  
  for (const s of sentences) {
    const trimmed = s.trim();
    const words = trimmed.split(/\s+/).filter(w => w.length > 0);
    if (words.length > 10) {
      // Normalize: lowercase, remove non-alphanumeric chars
      const normalized = words.map(w => w.toLowerCase().replace(/[^a-ząćęłńóśźż0-9]/gi, '')).filter(Boolean).join(' ');
      if (normalized.length > 20) {
        if (!sentenceMap.has(normalized)) {
          sentenceMap.set(normalized, []);
        }
        sentenceMap.get(normalized).push({ file, original: trimmed });
      }
    }
  }
}

let collisions = 0;
for (const [norm, occurrences] of sentenceMap.entries()) {
  const distinctFiles = new Set(occurrences.map(o => o.file));
  if (distinctFiles.size > 1) {
    collisions++;
    console.log(`\nCOLLISION detected (${occurrences.length} times in: ${[...distinctFiles].join(', ')}):`);
    console.log(`Sentence: "${occurrences[0].original}"`);
  }
}

if (collisions === 0) {
  console.log(`\nSCAN COMPLETE: Checked ${sentenceMap.size} unique sentences across ${files.length} posts.`);
  console.log('RESULT: 0 duplicate sentences (>10 words) detected across all URLs.');
} else {
  console.error(`\nFAILURE: Found ${collisions} sentence collisions.`);
  process.exit(1);
}
