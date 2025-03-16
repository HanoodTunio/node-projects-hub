const JWT = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        if (user.user != "admin") {
            return res.status(401).send({
                message: "You are not authorized to access this resource"
            })
        }
        else {
            next()
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error In Auth API' });
    }
};
