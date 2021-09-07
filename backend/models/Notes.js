import mongoose from 'mongoose';
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: {
        type: string,
        require: true
    },
    description: {
        type: string,
        require: true  
    },
    tag: {
        type: String
    },
    date: {
        type: Date,
        defaulat: Date.now
    },
});
module.export = mongoose.model('notes', NotesSchema);