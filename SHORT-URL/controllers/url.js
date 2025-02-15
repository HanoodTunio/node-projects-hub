const { nanoid } = require('nanoid');
const URL = require('../model/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).send({ message: 'URL is required' });

    const shortID = nanoid(8); // Generates an 8-character unique ID
    await URL.create({
        shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortID, message: 'Short URL created' });
}

module.exports = handleGenerateNewShortURL;
