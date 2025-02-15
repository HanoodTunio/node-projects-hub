const URL = require('../model/url'); // Import URL model
const { nanoid } = require('nanoid'); // Import nanoid for short URL generation

// Handler to generate a new short URL
const handleGenerateNewShortURL = async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).send({ message: 'URL is required' });
    }

    try {
        const shortID = nanoid(8); // Generate a unique short ID
        const newURL = new URL({
            shortID,
            redirectURL: url,
            visitHistory: [],
        });

        await newURL.save();
        res.json({ id: shortID, message: 'Short URL created' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating short URL', error: err });
    }
};

// Handler for redirecting based on the short URL ID
const handleRedirect = async (req, res) => {
    const { shortId } = req.params;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortID: shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true }
        );

        if (!entry) {
            return res.status(404).json({ message: 'Short URL not found' });
        }

        // Redirect to the original URL
        res.redirect(entry.redirectURL);
    } catch (err) {
        console.error('Error processing redirect:', err);
        res.status(500).json({ message: 'Error processing redirect', error: err });
    }
};

// Handler to get analytics (click count) for a short URL
const getAnalytics = async (req, res) => {
    const { shortId } = req.params;
    try {
        const entry = await URL.findOne({ shortID: shortId });

        if (!entry) {
            return res.status(404).json({ message: 'Short URL not found' });
        }

        const totalClicks = entry.visitHistory.length;
        res.json({ shortId, totalClicks });
    } catch (err) {
        console.error('Error fetching analytics:', err);
        res.status(500).json({ message: 'Error fetching analytics', error: err });
    }
};

module.exports = { handleGenerateNewShortURL, handleRedirect, getAnalytics };
