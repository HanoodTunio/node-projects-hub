const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {

        // Get the token from the header
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Invalid or missing token" });
        }
        const token = authHeader.split(" ")[1];

        // Verify token
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized user",
                    error: err.message
                });
            }
            console.log("Decoded Token Data:", decoded);
            req.body.id = decoded.id;
            next();
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error In Auth API' });
    }
};
