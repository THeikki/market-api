const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const conn = require('../db');
const cAuth = require('../middlewares/check-auth');
const validate = require('../middlewares/validate-post');

router.use(bodyParser.json());

/*
*** Get post by category
*/
router.get('/category/:Category', (req, res) => {
    conn.getConnection((err, connection) => {
        if(err) throw err;
        connection.query('SELECT * FROM posts WHERE Category = ?', [req.params.Category], (err, rows) => {
            connection.release();
            if(!err && rows != "") {
                res.status(200).json(rows);
            } else {           
                res.status(404).json({Message:"Not found"});
            }
        });
    });
});

/*
*** Get post by location
*/
router.get('/location/:Location', (req, res) => {
    conn.getConnection((err, connection) => {
        if(err) throw err;
        connection.query('SELECT * FROM posts WHERE Location = ?', [req.params.Location], (err, rows) => {
            connection.release();
            if(!err && rows != "") {
                res.status(200).json(rows);
            } else {           
                res.status(404).json({Message:"Not found"});
            }
        });
    });
});

/*
*** Get post by Date of posting
*/
router.get('/date/:DateOfPosting', (req, res) => {
    conn.getConnection((err, connection) => {
        if(err) throw err;
        connection.query('SELECT * FROM posts WHERE DateOfPosting = ? LIKE YYYY,MM,DD', [req.params.DateOfPosting], (err, rows) => {
            connection.release();
            if(!err && rows != "") {
                res.status(200).json(rows);
            } else {           
                res.status(404).json({Message:"Not found"});
            }
        });
    });
});

/*
*** Delete posting by id            
*/
router.delete('/:id',cAuth.checkAuth,(req, res) => {
    conn.getConnection((err, connection) => {
        if(err) throw err;          
        connection.query('DELETE FROM posts WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release();
            if(!err && rows.affectedRows == 1) {
                res.status(202).json({Message:"Posting removed"});
            } else {
                res.status(404).json({Message:"Not found"});
            }
        });
    });
});
 
/*
*** Insert posting        
*/
router.post('/',cAuth.checkAuth, validate.validatePost,(req, res) => {                                              
    conn.getConnection((err, connection) => {
        if(err) throw err;
        const params = req.body;
        connection.query('INSERT INTO posts SET ?', params, (err, rows) => {
            connection.release() ;  
            if(!err) {
                res.status(201).json({Message:"New posting created"});
            } else {
                res.status(400).json({Message:err});
            }
        });      
    });
});

/*
*** Update posting by id                   
*/
router.put('/:id',cAuth.checkAuth, validate.validateUpdate,(req, res) => {    
    conn.getConnection((err, connection) => {
        if(err) throw err;
        const params = req.body;
        connection.query('UPDATE posts SET ? WHERE id = ?',[params,req.params.id], (err, rows) => {
            connection.release();              
            if(!err && rows.affectedRows > 0) {
                res.status(200).json({Message:"Posting updated"});
            } else{
                res.status(404).json({Message:"Not found"})
            }
        });
    }); 
});

module.exports = router;

