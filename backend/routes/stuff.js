// routes/stuff.js

const express = require('express');

const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

// Get all Books
router.get('/', stuffCtrl.getAllBooks);
// Create a new Book
router.post('/', stuffCtrl.createBook);
// Get a single Book with an id
router.get('/:id', stuffCtrl.findBookbyID);
// Update a Book with id
router.put('/:id', stuffCtrl.updateBook);
// Delete a Book with id
router.delete('/:id', stuffCtrl.deleteBook);

module.exports = router;
