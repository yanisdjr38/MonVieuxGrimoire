// Importation de mongoose pour la gestion de la base de données MongoDB
const mongoose = require('mongoose');
// Définition du schéma de données pour les utilisateurs, incluant les champs nécessaires et leurs types
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
// Exportation du modèle de données pour les utilisateurs, permettant de l'utiliser dans d'autres parties de l'application pour interagir avec la base de données
module.exports = mongoose.model('User', userSchema);
