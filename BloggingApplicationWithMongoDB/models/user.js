const { Schema, model } = require('mongoose');
const { createHac, randomBytes } = require("crypto")

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: '/images/profile.jpg',
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }

}, { timestamps: true });

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedpassword = createHac("sh256", salt)
        .update(user.password)
        .digest("hex")

    this.salt = salt;
    this.password = hashedpassword;

    next();
});

const User = model("user", userSchema);

module.exports = User;