const express = require('express');
const { handleGenerateNewShortURL, handleRedirect, getAnalytics } = require('../controllers/url');
const router = express.Router();

// POST route to create a new short URL
router.post('/', handleGenerateNewShortURL);

// GET route to handle redirects by short URL ID
router.get('/:shortId', handleRedirect);
router.get('/analytics/:shortId', getAnalytics);

module.exports = router;
