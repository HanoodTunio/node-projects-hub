const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }] // Add this field
}, { timestamps: true });

const Blog = model('blog', blogSchema);
module.exports = Blog;
