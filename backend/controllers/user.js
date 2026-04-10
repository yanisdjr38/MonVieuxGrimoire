// Importation des modules nécessaires
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// Créer et enregistrer un utilisateur dans la base de données
exports.signup = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }
  // Hachage du mot de passe de l'utilisateur avant de le stocker dans la base de données pour des raisons de sécurité
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      // Enregistrement de l'utilisateur dans la base de données et gestion des réponses en fonction du succès ou de l'échec de l'opération
      return user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) => {
          console.log('Signup error:', error);
          res.status(400).json({ error });
        });
      // Gestion des erreurs de hachage du mot de passe
    })
    .catch((error) => {
      console.log('Hash error:', error);
      res.status(500).json({ error });
    });
};
// Authentifier un utilisateur et lui fournir un token d'accès
exports.login = (req, res) => {
  // Recherche de l'utilisateur dans la base de données en fonction de l'email fourni dans la requête
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: 'Paire login/mot de passe incorrecte' });
      }
      // Comparaison du mot de passe fourni dans la requête avec le mot de passe haché stocké dans la base de données pour vérifier l'authenticité de l'utilisateur
      return (
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ message: 'Paire login/mot de passe incorrecte' });
            }
            // Génération d'un token d'accès JWT pour l'utilisateur authentifié, qui peut être utilisé pour accéder aux ressources protégées de l'application pendant une durée déterminée (24 heures dans ce cas)
            return res.status(200).json({
              // eslint-disable-next-line no-underscore-dangle
              userId: user._id,
              token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
                expiresIn: '24h',
              }),
            });
          })
          // Gestion des erreurs de comparaison du mot de passe
          .catch((error) => res.status(500).json({ error }))
      );
    })
    .catch((error) => res.status(500).json({ error }));
};
