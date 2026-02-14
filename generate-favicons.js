import sharp from 'sharp';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const logoPath = join(__dirname, 'public', 'images', 'rm-green-logo.svg');
const outputDir = join(__dirname, 'public');

const sizes = [
  { name: 'favicon-16x16.png', width: 16, height: 16 },
  { name: 'favicon-32x32.png', width: 32, height: 32 },
  { name: 'apple-touch-icon.png', width: 180, height: 180 },
];

async function generate() {
  if (!existsSync(logoPath)) {
    console.error('Logo not found at:', logoPath);
    process.exit(1);
  }

  const input = readFileSync(logoPath);

  for (const { name, width, height } of sizes) {
    const outputPath = join(outputDir, name);
    await sharp(input).resize(width, height).png().toFile(outputPath);
    console.log('Created:', name);
  }

  const png32Buffer = await sharp(input).resize(32, 32).png().toBuffer();
  try {
    const toIco = require('to-ico');
    const icoBuffer = await toIco([png32Buffer]);
    writeFileSync(join(outputDir, 'favicon.ico'), icoBuffer);
    console.log('Created: favicon.ico');
  } catch (err) {
    console.warn('Could not create favicon.ico:', err.message);
  }

  console.log('Done!');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
