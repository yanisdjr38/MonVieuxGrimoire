const mongoose = require('mongoose');
const Book = require('./models/Book');

require('dotenv').config();

async function testImages() {
  try {
    const books = await Book.find().limit(5);
    console.log(`\n📚 Trouvé ${books.length} livres\n`);

    books.forEach((book, index) => {
      console.log(`Livre ${index + 1}:`);
      console.log(`  Titre: ${book.title}`);
      console.log(`  imageUrl: ${book.imageUrl || '❌ VIDE'}`);
      console.log(
        `  imageUrl valide Cloudinary? ${book.imageUrl?.includes('res.cloudinary.com') ? '✅ OUI' : '❌ NON'}`,
      );
      console.log('');
    });

    if (books.length === 0) {
      console.log('⚠️  Aucun livre trouvé dans la base de données!');
    } else if (books.some((b) => !b.imageUrl)) {
      console.log("⚠️  Certains livres n'ont pas d'imageUrl!");
    } else if (books.every((b) => b.imageUrl.includes('res.cloudinary.com'))) {
      console.log('✅ Toutes les images sont sur Cloudinary correctement!');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de la lecture:', error);
    process.exit(1);
  }
}

// Connexion MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connecté');
    testImages();
  })
  .catch((error) => {
    console.error('❌ Erreur MongoDB:', error);
    process.exit(1);
  });
