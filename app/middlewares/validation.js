const _ = require('lodash');
const flaverr = require('flaverr');
const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    let error_message = 'Please provide ';
    const error_filtered = _.uniqBy(errors.array(), 'param');
    error_filtered.forEach((error, index) => {
      error_message += `${error.param}`;
      if (index < (error_filtered.length - 1)) {
        error_message += ', ';
      }
    });

    error_message += ' fields.';

    throw flaverr(`E_BAD_REQUEST`, Error(error_message));
  } catch (err) {
    return next(err);
  }
};

module.exports = validate;
