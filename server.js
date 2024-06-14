const express = require('express');
const path = require('path');
//const { clog } = require('./middleware/clog');
const api = require('./public/assets/js/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

//Custom middleware, "clog"
//app.use(clog); 

//app.use(express.json());
//app.use(expres.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (_req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (_req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Add 404.html for incorrect addresses - only if extra time on project
//app.get ('*', (req, res) =>
//    res.sendFile(path.join(__dirname, '/public/404.html'))
//);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
)