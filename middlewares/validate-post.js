const Ajv = require("ajv").default;
const postJsonSchema = require('../schemas/post.json');
const updateJsonSchema = require('../schemas/update-post.json')

/*
*** Validate post
*/
function validatePost(req, res, next) {
    
    const ajv = new Ajv();
    const validate = ajv.compile(postJsonSchema);
    const valid = validate(req.body);
    if (!valid) {
        console.log(validate.errors);
        return res.status(400).json(validate.errors); 
    }   
    return next();  
}

/*
*** Validate update
*/
function validateUpdate(req, res, next) {
    
    const ajv = new Ajv();
    const validate = ajv.compile(updateJsonSchema);
    const valid = validate(req.body);
    if (!valid) {
        console.log(validate.errors);
        return res.status(400).json(validate.errors); 
    }   
    return next();
}

module.exports = {
    validatePost: validatePost,
    validateUpdate: validateUpdate
}