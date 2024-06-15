const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils.js');

// GET Route for retrieving all the notes
notes.get('/', (_req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Get Route for a specific note
notes.get('/:note_id', (req, res) => {
   const noteID = req.params.note_id;
   readFromFile('./db/db.json')
     .then((data) => JSON.parse(data))
     .then((json) => {
        const result = json.filter((note) => note.note_id === noteID);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
     });
});

//DELETE Route for a specific note
notes.delete('/:note_id', (req, res) => {
    console.info(req.params);
    const noteID = req.params.note_id;
    console.info(noteID);
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        //Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteID);

        //Save that array to the filesystem
        writeToFile('./db/db.json', result);

        res.json(`Item ${noteID} has been deleted 🗑️`);
      });
});

// POST Route for a new note
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Tip added successfully`);
    } else {
        res.errored('Error in adding note');
    }
});

module.exports = notes;
