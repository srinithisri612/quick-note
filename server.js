const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const NOTES_FILE = "notes.json";

// GET all notes
app.get("/notes", (req, res) => {
    const data = fs.readFileSync(NOTES_FILE, "utf8");
    const notes = JSON.parse(data);

    res.json(notes);
});

// POST a new note
app.post("/notes", (req, res) => {
    const data = fs.readFileSync(NOTES_FILE, "utf8");
    const notes = JSON.parse(data);

    const newNote = {
        id: Date.now(),
        text: req.body.text
    };

    notes.push(newNote);

    fs.writeFileSync(
        NOTES_FILE,
        JSON.stringify(notes, null, 2)
    );

    res.status(201).json(newNote);
});

// DELETE a note
app.delete("/notes/:id", (req, res) => {
    const data = fs.readFileSync(NOTES_FILE, "utf8");
    const notes = JSON.parse(data);

    const id = Number(req.params.id);

    const updatedNotes = notes.filter(note => note.id !== id);

    fs.writeFileSync(
        NOTES_FILE,
        JSON.stringify(updatedNotes, null, 2)
    );

    res.json({
        message: "Note deleted successfully"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});