const Book = require('../models/Book');
const fs = require('fs');

// Créer et enregistrer un livre dans la base de données

exports.createBook = (req, res) => {
  const Bookobject = JSON.parse(req.body.book);
  delete Bookobject._id;
  delete Bookobject._userId;
  const book = new Book({
    ...Bookobject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  book
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Livre enregistré avec succès !',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};
// Modification d'un livre avec son id
exports.updateBook = (req, res) => {
  const Bookobject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      }
    : { ...req.body };
  delete Bookobject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(401).json({ message: 'Non autorisé' });
      } else {
        Book.updateOne(
          { _id: req.params.id },
          { ...Bookobject, _id: req.params.id },
        )
          .then(() => res.status(200).json({ message: 'Livre mis à jour !' }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
// Find a single Book with an id
exports.findBookbyID = (req, res) => {
  Book.findOne({
    _id: req.params.id,
  })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(404).json({
        error,
      });
    });
};
// Supprimer un livre avec son id
exports.deleteBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(401).json({ message: 'Non autorisé' });
      } else {
        const filename = book.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};
// Récupérer tous les livres
exports.getAllBooks = (req, res) => {
  Book.find()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

// Récupérer les 3 livres les mieux notés
exports.getTop3Books = (req, res) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Evaluation du livre
exports.rateBook = (req, res) => {
  if (!req.body.rating || req.body.rating < 0 || req.body.rating > 5) {
    return res
      .status(400)
      .json({ error: 'La note doit être comprise entre 0 et 5' });
  }

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      const existingRating = book.ratings.find(
        (r) => r.userId === req.auth.userId,
      );
      if (existingRating) {
        return res
          .status(401)
          .json({ message: "L'utilisateur a déjà noté ce livre" });
      }
      book.ratings.push({
        userId: req.auth.userId,
        grade: req.body.rating,
      });

      const totalRating = book.ratings.reduce((acc, r) => acc + r.grade, 0);
      book.averageRating =
        Math.round((totalRating / book.ratings.length) * 10) / 10;

      return book.save().then(() => res.status(200).json(book));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
