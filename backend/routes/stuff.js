// routes/stuff.js

const express = require('express');

const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');
// Get all Books
router.get('/', stuffCtrl.getAllBooks);
// Get top 3 best rated Books
router.get('/bestrating', stuffCtrl.getTop3Books);
// Create a new Book
router.post('/', auth, multer, stuffCtrl.createBook);
// Get a single Book with an id
router.get('/:id', stuffCtrl.findBookbyID);
// Put a rating for a Book
router.post('/:id/rating', auth, stuffCtrl.rateBook);
// Update a Book with id
router.put('/:id', auth, multer, stuffCtrl.updateBook);
// Delete a Book with id
router.delete('/:id', auth, stuffCtrl.deleteBook);

module.exports = router;
