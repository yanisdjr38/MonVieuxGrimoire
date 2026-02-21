const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const Book = require('./models/Book');
const User = require('./models/User');

mongoose
  .connect(
    'mongodb+srv://datauser1:user1234@cluster0.fmuonpl.mongodb.net/?appName=Cluster0',
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !', error));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
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

// Routes pour les livres

app.post('/api/books', (req, res) => {
  const book = new Book({
    ...req.body,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
    .catch((error) => res.status(400).json({ error }));
});

app.get('/api/books', (req, res) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
});

app.get('/api/books/:id', (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
});

app.put('/api/books/:id', (req, res) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Livre modifié !' }))
    .catch((error) => res.status(400).json({ error }));
});

app.delete('/api/books/:id', (req, res) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
