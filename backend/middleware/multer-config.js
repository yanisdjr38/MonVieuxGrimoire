// Importation du module multer pour la gestion des fichiers téléchargés
const multer = require('multer');
const path = require('path');
// Configuration de multer pour stocker les fichiers téléchargés dans le dossier 'images' avec un nom de fichier unique
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};
// Configuration du stockage pour multer
// Le champ 'destination' définit le dossier où les fichiers seront enregistrés
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const imagesDir = path.join(__dirname, '../images');
    callback(null, imagesDir);
  },
  // Le champ 'filename' définit le nom du fichier enregistré, en utilisant le nom d'origine et un timestamp pour garantir l'unicité
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});
// Exportation du middleware multer configuré pour gérer les fichiers téléchargés
module.exports = multer({ storage }).single('image');
