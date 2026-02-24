// Importation du module express pour créer des routes pour les utilisateurs
const express = require('express');
// Création d'un routeur express pour gérer les routes liées aux utilisateurs
const router = express.Router();
const userCtrl = require('../controllers/user');
// Définition des routes pour l'inscription et la connexion des utilisateurs
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
