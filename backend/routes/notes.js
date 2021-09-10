const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//Route1: Get all Note using GET  "/api/notes/getuser" login require
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error occured");
    }
})



//Route2: Add a new Note using POST  "/api/notes/addnote" login require
router.post('/addnote', fetchuser,
    [
        // title must be at least 5 chars long using express validator
        body('title', 'enter a valid title at least 2 letters').isLength({ min: 2 }),
        // \description must be at least 5 chars long
        body('description', "description Must be atleast five letters").isLength({ min: 5 })
    ],
    async (req, res) => {
        try {

            const { title, description, tag } = req.body
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()
            res.json(savedNote)
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal Server Error occured");
        }
    })

//Route3: Update a existing Note using POST  "/api/notes/updatenote" login require
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a newNote object for editing 
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };
    //find the note to be updated and update it
    let note =await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not found") }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })
})
module.exports = router;