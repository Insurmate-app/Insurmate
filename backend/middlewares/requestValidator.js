const { validationResult } = require('express-validator');

function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg); // Extract only the error messages
        return res.status(400).json({ message: "Validation failed", errors: errorMessages });
    }
    next();
}

module.exports = validate;
