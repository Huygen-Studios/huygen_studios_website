const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'public', 'huygen-sequence');
const outputDir = path.join(__dirname, 'public', 'huygen-sequence');

async function convertImages() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
  console.log(`Found ${files.length} images to convert.`);
  
  let count = 0;
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg)$/, '.webp'));
    
    // Only convert if it doesn't already exist to save time
    if (!fs.existsSync(outputPath)) {
      await sharp(inputPath)
        .webp({ quality: 70 })
        .toFile(outputPath);
      count++;
    }
    
    if (count % 100 === 0 && count > 0) {
      console.log(`Converted ${count} images...`);
    }
  }
  
  console.log(`Done! Converted ${count} images to WebP.`);
}

convertImages().catch(console.error);
