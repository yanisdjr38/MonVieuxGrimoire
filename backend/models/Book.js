// Importation de mongoose pour la gestion de la base de données MongoDB
const mongoose = require('mongoose');
// Définition du schéma de données pour les livres, incluant les champs nécessaires et leurs types
const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [
    {
      userId: { type: String, required: true },
      grade: { type: Number, required: true },
    },
  ],
  averageRating: { type: Number, required: true },
});
// Exportation du modèle de données pour les livres, permettant de l'utiliser dans d'autres parties de l'application pour interagir avec la base de données
module.exports = mongoose.model('Book', bookSchema);
