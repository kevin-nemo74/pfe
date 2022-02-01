const express = require('express');
router = express.Router();
const dbServices = require('../controllers/dbServices');
const db = dbServices.db;
const auth = require('../controllers/Auth/basicAuth');
const bcrypt = require('bcryptjs');

app.get('/teacher', auth.isLoggedInRole, function (req, res) {
    if(req.userLog && req.role == 1){
        res.render("assets/professionnel/teacher/homeTeacher");
    }
    else{
        res.redirect('/');
    }
})


app.get('/teacher/logout',auth.logout);

module.exports=router;
