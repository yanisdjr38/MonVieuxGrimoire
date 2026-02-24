// Importation des modules nécessaires pour créer un serveur HTTP, se connecter à MongoDB et gérer les routes de l'application
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
// Fonction pour normaliser le port d'écoute du serveur
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// Normalisation du port d'écoute et configuration de l'application pour utiliser ce port
const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);
// Création du serveur HTTP en utilisant l'application Express
const server = http.createServer(app);
// Fonction pour gérer les erreurs lors du démarrage du serveur et afficher des messages d'erreur appropriés
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};
// Configuration des événements du serveur pour gérer les erreurs et afficher un message lorsque le serveur est en écoute
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
  console.log(`Listening on ${bind}`);
});
// Connexion à MongoDB en utilisant Mongoose et démarrage du serveur HTTP une fois la connexion établie
mongoose
  .connect(
    'mongodb+srv://datauser1:user1234@cluster0.fmuonpl.mongodb.net/?appName=Cluster0',
  )
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(port);
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
