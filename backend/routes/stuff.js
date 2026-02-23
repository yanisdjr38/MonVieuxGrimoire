// routes/stuff.js

const express = require('express');

const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

const auth = require('../middleware/auth');

// Get all Books
router.get('/', auth, stuffCtrl.getAllBooks);
// Create a new Book
router.post('/', auth, stuffCtrl.createBook);
// Get a single Book with an id
router.get('/:id', auth, stuffCtrl.findBookbyID);
// Update a Book with id
router.put('/:id', auth, stuffCtrl.updateBook);
// Delete a Book with id
router.delete('/:id', auth, stuffCtrl.deleteBook);

module.exports = router;
