const express = require('express');
const router = express.Router();
const  { body } = require("express-validator");
const { validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");

// Route - 1 : fetch the notes from DB using user --> login required
router.get("/fetchNotes", [fetchUser], async (req, res)=>{
    try{
        const notes = await Notes.find({user : req.user});
        return res.json({notes});
    }
    catch(err){
        return res.status(500).json({error : "Error fetching notes" });
    }
})

// Route - 2 : adding new note into DB after validation of the req.body --> login required
router.post("/addNotes", [fetchUser], [
    body("title", "Title is required").isLength({ min: 5 }),
    body("description", "Description is required").isLength({ min: 5 }),
], async (req, res)=>{
    const errors = validationResult(req);
    try{
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {title, description, tag} = req.body;
        const note = new Notes({
            user: req.user, title : title, description : description, tag : tag,
        })
        const savedNote = await note.save();
        return res.json({savedNote});
    }
    catch(err){
        return res.status(500).json({error : "Internal Error occured while saving notes" });
    }
})

// Route-3 : update a existing note after verifying the user and validating the note and their id connection.
router.put("/updateNotes/:id", [fetchUser], async (req, res)=>{
    console.log("hi",req.params.id);
    try{
        const {title, description, tag} = req.body;
        const newNote = {};
        if(title){newNote.title = title;};
        if(description){newNote.description = description;};
        if(tag){newNote.tag = tag;};
        // checking the note in db
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).json({message : "Not Found"});
        }
        //verifying the user and note's user id
        if(note.user.toString() !== req.user){
            return res.status(401).json({message : "Unauthorized Access"});
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true});
        return res.status(200).json(note);
    }
    catch(err){
        return res.status(500).json({error : "Internal Error occured while updating notes" });
    }
})

// delete an existing node after validation of user and notes user id
router.delete("/deleteNotes/:id", [fetchUser], async (req, res)=>{
    try{
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        //verifying the user and note's user id
        if(note.user.toString() !== req.user){
            return res.status(401).json({message : "Unauthorized Access, you are not the right one"});
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        return res.status(200).json({message : "Note in the storage has been deleted."});
    }
    catch(err){
        return res.status(500).json({error : "Internal Error occured while Deleting the note" });
    }
})
module.exports = router;