const express = require('express');
const router = express.Router();
const getURL = require('../middleware/events');
const errorMiddleware = require('../middleware/error');

// Routes for contacts
router.get('/', getURL, errorMiddleware, (req, res) => res.send('Contacts'))

module.exports = router;