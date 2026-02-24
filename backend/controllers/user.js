// Importation des modules nécessaires
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// Créer et enregistrer un utilisateur dans la base de données
exports.signup = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      return user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) => {
          console.log('Signup error:', error);
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      console.log('Hash error:', error);
      res.status(500).json({ error });
    });
};
// Authentifier un utilisateur et lui fournir un token d'accès
exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: 'Paire login/mot de passe incorrecte' });
      }
      return bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: 'Paire login/mot de passe incorrecte' });
          }
          return res.status(200).json({
            // eslint-disable-next-line no-underscore-dangle
            userId: user._id,
            token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
              expiresIn: '24h',
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
