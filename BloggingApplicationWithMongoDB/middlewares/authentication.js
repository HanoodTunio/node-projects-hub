const { validateToken } = require("../services/authentication");
const User = require("../models/user"); // ✅ Import User Model

function checkForAuthenticationCookie(cookieName) {
    return async (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            req.user = null;
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue); // { _id, email, etc. }
            const user = await User.findById(userPayload._id).select("fullName email profileImageURL role");

            if (!user) {
                req.user = null;
            } else {
                req.user = user; // ✅ Now includes fullName
            }
        } catch (error) {
            req.user = null;
        }

        next();
    };
}

module.exports = checkForAuthenticationCookie;
