const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//setting
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'../app/views'));

//middleware
app.use(express.text());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'../public')));
module.exports = app;