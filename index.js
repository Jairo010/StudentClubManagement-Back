const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api',require('./routes/api'));

module.exports = app;