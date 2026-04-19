// Importation des modules nécessaires
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuration du stockage Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'monvieuxgrimoire/books',
    resource_type: 'auto',
    secure: true,
    type: 'upload',
    format: 'webp',
    quality: 'auto',
  },
});

// Exportation du middleware multer configuré pour gérer les fichiers téléchargés
module.exports = multer({ storage }).single('image');
