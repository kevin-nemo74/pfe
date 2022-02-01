const express = require('express');
router = express.Router();
const dbServices = require('../controllers/dbServices');
const db = dbServices.db;
const auth = require('../controllers/Auth/basicAuth');
const bcrypt = require('bcryptjs');

app.get('/chefdep', auth.isLoggedInRole, function (req, res) {
    if(req.userLog && req.role == 3){
        res.render("assets/professionnel/teacher/homeChefDep");
    }
    else{
        res.redirect('/');
    }
})


app.get('/chefdep/logout',auth.logout);

module.exports=router;
