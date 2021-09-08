import mongoose from 'mongoose';
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "Genral"
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.export = mongoose.model('notes', NotesSchema);