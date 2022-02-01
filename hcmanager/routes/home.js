const express = require('express');
const { date } = require('faker');
router = express.Router();
const dbServices = require('../controllers/dbServices');
const db = dbServices.db;
let bcrypt = require('bcryptjs');
let auth = require('../controllers/Auth/basicAuth');

router.get('/',(req,res)=>{
    res.render("home");
})

// router.post('/ProSignUp',(req,res)=>{
// })


router.get('/ProLogin', auth.login);

module.exports=router;