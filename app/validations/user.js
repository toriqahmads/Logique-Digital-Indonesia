const { query, param, body, header } = require('express-validator');
const cvv = /\d{3,4}/;
const cc_expired = /(0[1-9]|1[0-2])\/[12]\d{3}/;

const create = () => {
  return [
    header('key')
      .exists()
      .notEmpty()
      .isString(),
    body('name')
      .exists()
      .notEmpty()
      .isString()
      .escape(),
    body('address')
      .exists()
      .notEmpty()
      .isString()
      .escape(),
    body('email')
      .exists()
      .notEmpty()
      .isEmail()
      .escape(),
    body('password')
      .exists()
      .notEmpty()
      .isString()
      .escape(),
    body('credit_card_number')
      .exists()
      .notEmpty()
      .isString()
      .escape(),
    body('credit_card_name')
      .exists()
      .notEmpty()
      .isString()
      .escape(),
    body('credit_card_expired')
      .exists()
      .notEmpty()
      .isString()
      .matches(cc_expired)
      .escape(),
    body('credit_card_cvv')
      .exists()
      .notEmpty()
      .isString()
      .matches(cvv)
      .escape()
  ]
}

const update = () => {
  return [
    header('key')
      .exists()
      .notEmpty()
      .isString(),
    body('user_id')
      .exists()
      .notEmpty()
      .isNumeric()
      .escape(),
    body('name')
      .exists()
      .notEmpty()
      .isString()
      .escape(),
    body('address')
      .exists()
      .notEmpty()
      .isString()
      .escape(),
    body('email')
      .exists()
      .notEmpty()
      .isEmail()
      .escape(),
    body('password')
      .exists()
      .notEmpty()
      .isString()
      .escape(),
    body('credit_card_number')
      .exists()
      .notEmpty()
      .isString()
      .isCreditCard()
      .escape(),
    body('credit_card_name')
      .exists()
      .notEmpty()
      .isString()
      .escape(),
    body('credit_card_expired')
      .exists()
      .notEmpty()
      .isString()
      .matches(cc_expired)
      .escape(),
    body('credit_card_cvv')
      .exists()
      .notEmpty()
      .isString()
      .matches(cvv)
      .escape()
  ]
}

const findAll = () => {
  return [
    header('key')
      .exists()
      .notEmpty()
      .isString(),
    query('name')
      .optional()
      .notEmpty()
      .isString()
      .escape(),
    query('address')
      .optional()
      .notEmpty()
      .isString()
      .escape(),
    query('email')
      .optional()
      .notEmpty()
      .isEmail()
      .escape()
  ]
}

const findById = () => {
  return [
    header('key')
      .exists()
      .notEmpty()
      .isString(),
    param('id')
      .exists()
      .notEmpty()
      .isNumeric()
      .escape()
  ]
}


module.exports = {
  create,
  update,
  findById,
  findAll
};
