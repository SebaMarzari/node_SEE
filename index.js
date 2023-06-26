require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const serverStartUp = require('./data/serverStartUp');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Configure EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const users = require('./routes/users');
const contacts = require('./routes/contacts');
const login = require('./routes/login');
const events = require('./routes/events');

// Use routes
app.use('/users', users);
app.use('/contacts', contacts);
app.use('/login', login);
app.use('/events', events);

// Index
app.get('/', (req, res) => {
    const view = path.join(__dirname + '/views/index.html');
    res.sendFile(view);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    const url = `http://localhost:${PORT}`;
    const currentDate = new Date().toLocaleDateString();
    const currentHour = new Date().toLocaleTimeString();
    serverStartUp.url = url;
    serverStartUp.initDate = currentDate;
    serverStartUp.initHour = currentHour;
    serverStartUp.currentDate = currentDate;
    serverStartUp.currentHour = currentHour;
});