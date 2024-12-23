const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NotesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    tag: {
        type: String,
        default: "General",
    },
    date: {
        type: Date,
        default: Date.now,
    }
})
module.exports = mongoose.model('Notes', NotesSchema);