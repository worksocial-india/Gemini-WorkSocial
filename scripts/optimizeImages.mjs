import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for each image
const imagesToOptimize = [
  {
    input: 'Financial-Services.png',
    output: 'Financial-Services.webp',
    width: 512,
    height: 512,
    quality: 85,
    description: 'Financial Services card image'
  },
  {
    input: 'school-essensials.webp',
    output: 'school-essensials-optimized.webp',
    width: 512,
    height: 512,
    quality: 85,
    description: 'School Essentials card image'
  },
  {
    input: 'work-balalnce.png',
    output: 'work-balalnce.webp',
    width: 512,
    height: 512,
    quality: 85,
    description: 'Work Balance card image'
  },
  {
    input: 'Logo-worksocialindia.png',
    output: 'Logo-worksocialindia.webp',
    width: 400,
    height: 80,
    quality: 90, // Higher quality for logo
    description: 'WorkSocial India Logo'
  },
  {
    input: 'bankers.jpg',
    output: 'bankers-optimized.jpg',
    width: 1024,
    height: 1024,
    quality: 85,
    description: 'Bankers image'
  },
  {
    input: 'shopping-hub.png',
    output: 'shopping-hub.webp',
    width: 512,
    height: 512,
    quality: 85,
    description: 'Shopping Hub card image'
  },
  {
    input: 'customers.png',
    output: 'customers.webp',
    width: 1024,
    height: 1024,
    quality: 85,
    description: 'Customers image'
  }
];

const publicDir = path.join(__dirname, '..', 'public');
const backupDir = path.join(publicDir, 'original-images');

// Create backup directory if it doesn't exist
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log('✓ Created backup directory: public/original-images/\n');
}

console.log('🚀 Starting Image Optimization Process...\n');
console.log('=' .repeat(70));

let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let successCount = 0;
let errorCount = 0;

// Function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Function to get file size
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

// Process each image
for (const imageConfig of imagesToOptimize) {
  const { input, output, width, height, quality, description } = imageConfig;
  const inputPath = path.join(publicDir, input);
  const outputPath = path.join(publicDir, output);
  const backupPath = path.join(backupDir, input);

  console.log(`\n📸 Processing: ${input}`);
  console.log(`   Description: ${description}`);
  console.log(`   Target size: ${width}x${height} @ ${quality}% quality`);

  try {
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.log(`   ❌ ERROR: File not found at ${inputPath}`);
      errorCount++;
      continue;
    }

    // Get original file size
    const originalSize = getFileSize(inputPath);
    totalOriginalSize += originalSize;
    console.log(`   Original size: ${formatBytes(originalSize)}`);

    // Backup original file (only if backup doesn't exist)
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
      console.log(`   ✓ Backed up to: original-images/${input}`);
    } else {
      console.log(`   ℹ Backup already exists, skipping backup`);
    }

    // Optimize the image
    if (output.endsWith('.webp')) {
      await sharp(inputPath)
        .resize(width, height, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality })
        .toFile(outputPath);
    } else if (output.endsWith('.jpg') || output.endsWith('.jpeg')) {
      await sharp(inputPath)
        .resize(width, height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality, mozjpeg: true })
        .toFile(outputPath);
    }

    // Get optimized file size
    const optimizedSize = getFileSize(outputPath);
    totalOptimizedSize += optimizedSize;
    const savings = originalSize - optimizedSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

    console.log(`   ✅ Optimized size: ${formatBytes(optimizedSize)}`);
    console.log(`   💾 Savings: ${formatBytes(savings)} (${savingsPercent}% smaller)`);
    console.log(`   📁 Output: ${output}`);

    successCount++;
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
    errorCount++;
  }
}

// Print summary
console.log('\n' + '='.repeat(70));
console.log('\n📊 OPTIMIZATION SUMMARY\n');
console.log(`Total images processed: ${imagesToOptimize.length}`);
console.log(`✅ Successful: ${successCount}`);
console.log(`❌ Failed: ${errorCount}`);
console.log(`\n📦 Total original size: ${formatBytes(totalOriginalSize)}`);
console.log(`📦 Total optimized size: ${formatBytes(totalOptimizedSize)}`);
console.log(`💾 Total savings: ${formatBytes(totalOriginalSize - totalOptimizedSize)}`);
console.log(`📉 Reduction: ${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)}%`);

console.log('\n' + '='.repeat(70));
console.log('\n✨ Image optimization complete!\n');

if (successCount > 0) {
  console.log('📋 Next Steps:');
  console.log('   1. Review the optimized images in the public/ folder');
  console.log('   2. Update image references in your components (if needed)');
  console.log('   3. Test the site locally: npm run dev');
  console.log('   4. If satisfied, commit and deploy:');
  console.log('      git add .');
  console.log('      git commit -m "perf: Optimize images - convert to WebP and resize"');
  console.log('      git push');
  console.log('      vercel --prod');
  console.log('   5. Test with PageSpeed Insights: https://pagespeed.web.dev/\n');
}

if (errorCount > 0) {
  console.log('⚠️  Some images failed to optimize. Please check the errors above.\n');
  process.exit(1);
}

process.exit(0);
