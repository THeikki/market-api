const express = require('express');
const path = require('path');
const multer  = require('multer');
const router = express.Router();
const cAuth = require('../middlewares/check-auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {    
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

/*
*** Upload pictures to server
*/
router.post('/',cAuth.checkAuth, upload.array('image', 4), (req, res) => {
    const pics = req.files;  
    if (!cAuth || !pics || pics == '') {
        res.status(400).json({Message: 'Something went wrong'});
    } else {
        res.status(200).json({Message: 'Uploaded successfully'});
    } 
});

/*
*** Get picture by name
*/
router.get('/images/:Image', (req,res) => {
    const pic = req.file;
    if(!pic) {
        res.status(404).json({Message:"Not found"})
    }

});
module.exports = router;