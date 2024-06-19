const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

//Custom middleware, "clog"
app.use(clog); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (_req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (_req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET route for notes page for specific note id
app.get('/notes/:notes_id', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET route for wildcard to return index.html page
app.get ('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
)