const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const Book = require('./models/Book');

require('dotenv').config();

async function cleanupOldImages() {
  try {
    // Trouver les livres avec des images locales
    const booksWithLocalImages = await Book.find({
      imageUrl: { $regex: 'localhost' },
    });

    console.log(
      `📚 Trouvé ${booksWithLocalImages.length} livres avec images locales\n`,
    );

    if (booksWithLocalImages.length > 0) {
      console.log('🗑️  Suppression des livres avec images locales...');
      const result = await Book.deleteMany({
        imageUrl: { $regex: 'localhost' },
      });
      console.log(`✅ ${result.deletedCount} livre(s) supprimé(s)\n`);
    }

    // Supprimer les fichiers locaux
    const imagesDir = path.join(__dirname, 'images');
    const files = fs.readdirSync(imagesDir);

    console.log(`📁 Suppression de ${files.length} fichiers locaux...`);
    files.forEach((file) => {
      fs.unlinkSync(path.join(imagesDir, file));
    });
    console.log('✅ Fichiers supprimés\n');

    // Afficher les livres restants
    const remainingBooks = await Book.find();
    console.log(`📊 Livres restants: ${remainingBooks.length}`);
    remainingBooks.forEach((book, idx) => {
      console.log(
        `  ${idx + 1}. ${book.title} - ${book.imageUrl?.substring(0, 50)}...`,
      );
    });

    console.log(
      '\n✅ Nettoyage terminé! Les nouvelles images iront sur Cloudinary.',
    );
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error.message);
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB connecté\n');
    await cleanupOldImages();
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  });
