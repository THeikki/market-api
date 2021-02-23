const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
router.use(bodyParser.json());
const conn = require('../db');
const validate = require('../middlewares/validate-user');

/*
*** Register users          
*/
router.post('/register', validate.validateUser, (req, res) => {
    conn.getConnection((err, connection) => {
        if(err) throw err;
        const username = req.body.UserName;
        var password = req.body.Pwd;
        var hashed = bcrypt.hashSync(password, 10);
        
        connection.query('SELECT * FROM users WHERE UserName = ?', username, (err, rows) => {
            
            if(err) throw err;
            if(rows.length>0) {
                res.status(409).json({Message: "User already registered"});
            } else {
                if(password != '' && password != null && (username != '' && username != null)){
                    password = hashed;
                    connection.query('INSERT INTO users SET UserName = ?, Pwd = ?', [username, password], (error, rows) => {
                    connection.release();
                    if(!error) {
                        res.status(201).json({Message:"New user added"});                   
                    } 
                    })   
                } 
            }                                                  
        });           
    }); 
});

/*
*** Login users     
*/
router.post('/login', validate.validateUser,(req, res) => {
    conn.getConnection((err, connection) => {
        if(err) throw err;      
        const username = req.body.UserName;
        const password = req.body.Pwd;

        connection.query("SELECT * FROM users WHERE username = ? ", username, function(error, rows, fields) {
            
            if(error) throw error; 
            if(rows.length>0) { 
                bcrypt.compare(password, rows[0].Pwd, function(err, result) {
                if(result) {
                    jwt.sign({
                        username: req.body.UserName,
                        }, process.env.JWT_TOKEN, function(err, token) {                    
                        res.status(200).json({
                            Message: "Login successful",
                            Token: token,
                        });
                    });      
                } else {
                    res.status(401).json({Message:"Invalid password"});
                    console.log(err);
                }
                });
            } else {
                    res.status(404).json({Message:"Not found" });
            }            
        });
    });
});

module.exports = router;