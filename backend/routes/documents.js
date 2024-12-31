const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// Route to add a document
router.post('/addDocument', documentController.addDocument);

// Route to delete a document
router.delete('/deleteDocument', documentController.deleteDocument);

module.exports = router;