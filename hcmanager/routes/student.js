const express = require('express');
router = express.Router();
const dbServices = require('../controllers/dbServices');
const db = dbServices.db;
const auth = require('../controllers/Auth/basicAuth');
const bcrypt = require('bcryptjs');

app.get('/student', auth.isLoggedInRole, function (req, res) {
    if(req.userLog && req.role == 2){
        res.render("assets/professionnel/student/homeStudent");
    }
    else{
        res.redirect('/');
    }
})


app.get('/medecin/logout',auth.logout);

module.exports=router;
