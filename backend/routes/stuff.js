// routes/stuff.js

const express = require('express');

const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');
// Afficher tous les livres
router.get('/', stuffCtrl.getAllBooks);
// Avoir les 3 livres les mieux notés
router.get('/bestrating', stuffCtrl.getTop3Books);
// Créer un livre
router.post('/', auth, multer, stuffCtrl.createBook);
// Afficher un livre avec son id
router.get('/:id', stuffCtrl.findBookbyID);
// Noter un livre
router.post('/:id/rating', auth, stuffCtrl.rateBook);
// Modification d'un livre avec son id
router.put('/:id', auth, multer, stuffCtrl.updateBook);
// Supprimer un livre avec son id
router.delete('/:id', auth, stuffCtrl.deleteBook);

module.exports = router;
