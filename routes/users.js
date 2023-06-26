const express = require('express');
const router = express.Router();
const getURL = require('../middleware/events');
const errorMiddleware = require('../middleware/error');

// Routes for users
router.get('/', getURL, errorMiddleware, (req, res) => res.send('Users'))

module.exports = router;