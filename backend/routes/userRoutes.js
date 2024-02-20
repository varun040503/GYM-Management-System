const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to view user details
router.get('/:id', userController.viewDetails);

// Route to search user records
router.get('/search', userController.searchRecords);

// Add more routes for user functionalities as needed

module.exports = router;
