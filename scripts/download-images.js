import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const images = [
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rb-reuben-1.webp", name: "rb-reuben-1.webp" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rb-header-logo.svg", name: "rb-header-logo.svg" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rm-footer-logo.svg", name: "rm-footer-logo.svg" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rm-green-logo.svg", name: "rm-green-logo.svg" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rb-hero-1.webp", name: "rb-hero-1.webp" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rm-image-1.webp", name: "rm-image-1.webp" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rm-image-2.webp", name: "rm-image-2.webp" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rm-image-3.webp", name: "rm-image-3.webp" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rm-image-4.webp", name: "rm-image-4.webp" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rm-image-5.webp", name: "rm-image-5.webp" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rm-image-6.webp", name: "rm-image-6.webp" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rm-image-7.webp", name: "rm-image-7.webp" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rm-banner-1.webp", name: "rm-banner-1.webp" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rm-form-phone-img.webp", name: "rm-form-phone-img.webp" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rm-text-bg.png", name: "rm-text-bg.png" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rm-testimonial-1.jpeg", name: "rm-testimonial-1.jpeg" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rm-testimonial-2.jpeg", name: "rm-testimonial-2.jpeg" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/02/rm-testimonial-3.jpeg", name: "rm-testimonial-3.jpeg" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2025/01/rb-resilient-women.webp", name: "rb-resilient-women.webp" },
  { url: "https://choosenaturelivebetter.com/wp-content/uploads/2024/02/c-1.webp", name: "c-1.webp" }
];

const outputDir = join(__dirname, '..', 'public', 'images');

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

async function downloadImage({ url, name }) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = await response.arrayBuffer();
    const filePath = join(outputDir, name);
    const stream = Readable.from(Buffer.from(buffer));
    const writeStream = createWriteStream(filePath);
    await pipeline(stream, writeStream);
    console.log(`✓ Downloaded: ${name}`);
    return { name, success: true };
  } catch (error) {
    console.error(`✗ Failed: ${name} - ${error.message}`);
    return { name, success: false };
  }
}

async function main() {
  console.log('Downloading images...\n');
  const results = await Promise.all(images.map(downloadImage));
  const failed = results.filter(r => !r.success);
  if (failed.length > 0) {
    console.log('\n--- Failed downloads ---');
    failed.forEach(f => console.log(f.name));
    console.log('Create placeholder divs for these images in the layout.');
  }
  console.log(`\nDone. ${results.filter(r => r.success).length}/${images.length} images downloaded.`);
}

main();
