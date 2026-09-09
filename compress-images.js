const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const productsDir = path.join(__dirname, 'public', 'products');
const files = fs.readdirSync(productsDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

async function compressImages() {
  for (const file of files) {
    const inputPath = path.join(productsDir, file);
    const tmpPath = inputPath + '.tmp';
    
    const stats = fs.statSync(inputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    
    try {
      const metadata = await sharp(inputPath).metadata();
      
      const pipeline = sharp(inputPath);
      
      if (metadata.width > 1200) {
        pipeline.resize(1200, 1200, { 
          fit: 'inside',
          withoutEnlargement: true 
        });
      }
      
      pipeline.jpeg({ quality: 82, progressive: true });
      
      await pipeline.toFile(tmpPath);
      
      const newStats = fs.statSync(tmpPath);
      
      if (newStats.size < stats.size) {
        fs.unlinkSync(inputPath);
        fs.renameSync(tmpPath, inputPath);
        const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
        console.log(`✓ ${file}: ${sizeMB}MB → ${newSizeMB}MB`);
      } else {
        fs.unlinkSync(tmpPath);
        console.log(`- ${file}: ${sizeMB}MB (already smaller)`);
      }
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
      try { fs.unlinkSync(tmpPath); } catch(e) {}
    }
  }
}

compressImages().then(() => console.log('\nDone!'));
