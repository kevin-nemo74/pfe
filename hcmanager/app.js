const express = require('express');
app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const dbServices = require('./controllers/dbServices');
const db = dbServices.db;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flush = require('connect-flash'); 


app.use(express.static(__dirname + '/views'));
app.set('view engine','ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(session({
    secret: 'secret',
    cookie: {maxAge:60000},
    resave:false,
    saveUninitialized:false
}));
app.use(flush());


app.use('/',require('./routes/home'));
app.use('/',require('./routes/student'));
app.use('/',require('./routes/chefdep'));
app.use('/',require('./routes/teacher'));
app.use('/',require('./routes/logout'));


app.listen(PORT, ()=>{
    console.log(`Listening on port : ${PORT}`);
})