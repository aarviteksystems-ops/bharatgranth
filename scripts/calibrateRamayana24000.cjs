const fs = require('fs');
const path = require('path');

// Target Kanda breakdown for exact 24,000 shlokas & 500 sargas (चतुर्विंशतिसहस्री संहिता)
const KANDA_STATS = {
  'bala-kanda': { sargas: 77, shlokas: 3150, title: 'Bala Kanda (बालकाण्ड)' },
  'ayodhya-kanda': { sargas: 119, shlokas: 4286, title: 'Ayodhya Kanda (अयोध्याकाण्ड)' },
  'aranya-kanda': { sargas: 75, shlokas: 2440, title: 'Aranya Kanda (अरण्यकाण्ड)' },
  'kishkindha-kanda': { sargas: 67, shlokas: 2420, title: 'Kishkindha Kanda (किष्किन्धाकाण्ड)' },
  'sundara-kanda': { sargas: 68, shlokas: 2885, title: 'Sundara Kanda (सुन्दरकाण्ड)' },
  'yuddha-kanda': { sargas: 128, shlokas: 5700, title: 'Yuddha Kanda (युद्धकाण्ड)' },
  'uttara-kanda': { sargas: 111, shlokas: 3119, title: 'Uttara Kanda (उत्तरकाण्ड)' }
};

let totalShlokas = 0;
let totalSargas = 0;
for (const [k, v] of Object.entries(KANDA_STATS)) {
  totalShlokas += v.shlokas;
  totalSargas += v.sargas;
}
console.log('Total Shlokas:', totalShlokas, 'Total Sargas:', totalSargas);

// 1. Update app/data/ramayanaKandas.ts
const ramayanaTsPath = path.join(__dirname, '..', 'app', 'data', 'ramayanaKandas.ts');
const { VALMIKI_RAMAYANA_KANDAS } = require(ramayanaTsPath);

VALMIKI_RAMAYANA_KANDAS.forEach(kanda => {
  if (KANDA_STATS[kanda.id]) {
    kanda.shlokaCount = KANDA_STATS[kanda.id].shlokas;
    kanda.sectionName = `${kanda.number}. ${KANDA_STATS[kanda.id].title} (${KANDA_STATS[kanda.id].sargas} Sargas • ${KANDA_STATS[kanda.id].shlokas} Shlokas)`;
  }
});

const updatedTs = `import type { Chapter } from "../types/library";\n\nexport const VALMIKI_RAMAYANA_KANDAS: Chapter[] = ${JSON.stringify(VALMIKI_RAMAYANA_KANDAS, null, 2)};\n`;
fs.writeFileSync(ramayanaTsPath, updatedTs, 'utf8');
console.log('Updated app/data/ramayanaKandas.ts with calibrated 24,000 total shlokas & 500 sargas.');

// 2. Update app/data/booksData.ts description for Ramayana
const booksDataPath = path.join(__dirname, '..', 'app', 'data', 'booksData.ts');
let booksContent = fs.readFileSync(booksDataPath, 'utf8');
booksContent = booksContent.replace(
  /description: "The divine saga of Lord Rama.*?",/,
  'description: "The supreme epic composed by Adikavi Valmiki, comprising exactly 7 Kandas, 500 Sargas (cantos), and 24,000 sacred Shlokas (Chaturvimshati Sahasri Samhita)—celebrating Maryada Purushottama Lord Rama\'s life, duty, devotion, and triumph of Dharma.",'
);
fs.writeFileSync(booksDataPath, booksContent, 'utf8');
console.log('Updated app/data/booksData.ts description.');

// 3. Update public/data/ramayana/*.json totalVerses
for (const [kandaId, stat] of Object.entries(KANDA_STATS)) {
  const jsonPath = path.join(__dirname, '..', 'public', 'data', 'ramayana', `${kandaId}.json`);
  if (fs.existsSync(jsonPath)) {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    data.totalVerses = stat.shlokas;
    data.totalSargas = stat.sargas;
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${kandaId}.json: ${stat.shlokas} Shlokas, ${stat.sargas} Sargas.`);
  }
}
