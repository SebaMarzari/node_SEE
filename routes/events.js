const express = require('express');
const router = express.Router();
const { events, eventsTable } = require('../controllers/events');
const getURL = require('../middleware/events');
const errorMiddleware = require('../middleware/error');

// Routes for events
router.get('/', events)
router.get('/table', getURL, errorMiddleware, eventsTable)

module.exports = router;