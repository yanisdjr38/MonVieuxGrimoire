const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('🔍 Diagnostic Multer Storage');
console.log('=====================================');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log(
  'API Key:',
  process.env.CLOUDINARY_API_KEY ? '✅ Present' : '❌ Missing',
);
console.log(
  'API Secret:',
  process.env.CLOUDINARY_API_SECRET ? '✅ Present' : '❌ Missing',
);

// Test CloudinaryStorage
try {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'monvieuxgrimoire/books',
      resource_type: 'auto',
    },
  });
  console.log('✅ CloudinaryStorage initialized successfully');
  console.log('Storage type:', storage.constructor.name);
} catch (error) {
  console.error('❌ CloudinaryStorage error:', error.message);
}

// Check local images
const imagesDir = path.join(__dirname, 'images');
try {
  const files = fs.readdirSync(imagesDir);
  console.log(`\n📁 Local images folder: ${files.length} files found`);
  console.log('Files:', files.slice(0, 3).join(', '));
} catch (error) {
  console.log('❌ Images folder not found:', imagesDir);
}
