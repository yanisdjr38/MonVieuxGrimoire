// Importation du module multer pour la gestion des fichiers téléchargés
const multer = require('multer');
// Configuration de multer pour stocker les fichiers téléchargés dans le dossier 'images' avec un nom de fichier unique
const MINE_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};
// Configuration du stockage pour multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MINE_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});
// Exportation du middleware multer configuré pour gérer les fichiers téléchargés
module.exports = multer({ storage }).single('image');
