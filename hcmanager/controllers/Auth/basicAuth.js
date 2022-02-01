const dbServices = require('../dbServices');
const db = dbServices.db;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


exports.login = async (req, res) => {
    try {
        console.log(req.query);
        const { email, password, role } = req.query;
        function auuth(table, link, role) {
            if (!email || !password) {
                return res.status(400).redirect('/');
            }
            db.query(`SELECT * FROM ${table} WHERE email = ?`, [email], async function (err, result) {
                if (!result[0] || !(await bcrypt.compare(password, result[0].pwd)) || role != result[0].role) {
                    res.status(401).redirect('/');
                }
                else {
                    let email = result[0].email;
                    let thisrole = result[0].role;
                    const token = jwt.sign({ email: email, role: thisrole }, process.env.JWT_SECRET, {
                        expiresIn: process.env.EXPIRES_IN
                    })
                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.CookieEx * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookieOptions);
                    res.status(200).redirect(`${link}`);

                }
            })
        }
        if (role == 1) {
            auuth('account', '/teacher', 1);
        }
        else if (role == 2) {
            auuth('account', '/student', 2);
        }
        else if (role == 3) {
            auuth('account', '/chefdep', 3);
        }
    } catch (error) {
        console.log(error);
    }
}

exports.isLoggedInRole = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            db.query(`SELECT * FROM account where email = ?`, [decoded.email], (err, result) => {
                if (!result) {
                    return next();
                }
                if (result[0]) {
                    req.userLog = result[0];
                    req.role = result[0].role;
                    return next();
                }
                else {
                    req.role = 0;
                    req.userLog = undefined;
                }
            })
        } catch (error) {
        }
    }
    else {
        next();
    }
}


exports.logout = async (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });
    res.status(200).redirect('/');
}