const Ajv = require("ajv").default;
const postJsonSchema = require('../schemas/user.json');

/*
*** Validate post
*/
function validateUser(req, res,next) {
    const ajv = new Ajv();
    const validate = ajv.compile(postJsonSchema);
    const valid = validate(req.body);
    
    if (!valid) {
        console.log(validate.errors);
        return res.status(400).json(validate.errors);       
    } 
    return next();
}

module.exports = {
    validateUser: validateUser
}