// Importation des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
// Importation de express et création de l'application
const app = express();
// Configuration des en-têtes CORS pour permettre les requêtes depuis n'importe quelle origine et définir les méthodes HTTP autorisées
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://mon-vieux-grimoire-yd.netlify.app',
  ];
  const origin = req.get('origin');
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  next();
});
// Ccreation des chemins d'accès à la base de données
// Configuration de l'application pour utiliser le middleware body-parser pour analyser les corps de requêtes JSON et les routes définies dans les fichiers de routes
app.use(express.json());
app.use(bodyParser.json());

// Route de vérification du serveur
app.get('/', (req, res) => {
  res.json({ message: 'Serveur en ligne' });
});

app.use('/api/stuff', stuffRoutes);
app.use('/api/books', stuffRoutes);
app.use('/api/auth', userRoutes);

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
