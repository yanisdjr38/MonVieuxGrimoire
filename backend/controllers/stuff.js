const Book = require('../models/Book');

// Create and Save a new Book

exports.createBook = (req, res) => {
  const book = new Book({
    userId: req.auth.userId,
    ...req.body,
  });
  book
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Book saved successfully!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};
// Update a Book identified by the id in the request
exports.updateBook = (req, res) => {
  const book = new Book({
    _id: req.params.id,
    userId: req.auth.userId,
    ...req.body,
  });

  Book.updateOne({ _id: req.params.id }, book)
    .then(() => {
      res.status(200).json({
        message: 'Book updated successfully!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
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
// Delete a Book with the specified id in the request
exports.deleteBook = (req, res) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'Deleted!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};
// Retrieve all Books from the database.
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
