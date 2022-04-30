const flaverr = require('flaverr');

// route not found
const notFound = (req, res, next) => {
  const error = flaverr('E_NOT_FOUND', Error(`Not found - ${req.originalUrl}`));
  return next(error);
};

// error handler
const errorStack = (error, req, res, next) => {
  let status_code;

  switch (error.code) {
    case 'E_BAD_REQUEST':
      status_code = 400;
      break;

    case 'E_DUPLICATE':
      status_code = 400;
      break;

    case 'E_CAPTCHA':
      status_code = 400;
      break;

    case 'E_VALIDATION':
      status_code = 422;
      break;

    case 'E_NOT_FOUND':
      status_code = 404;
      break;

    case 'E_MISSING_API_KEY':
      status_code = 403;
      break;

    case 'E_UNAUTHORIZED':
      status_code = 401;
      break;

    case 'E_FORBIDDEN':
      status_code = 403;
      break;

    case 'E_ENCRYPT_KEY':
      status_code = 500;
      break;

    case 'E_ERROR':
      status_code = 500;
      break;

    default:
      status_code = 500;
      break;
  }

  res.status(status_code);

  if (error.name === 'SequelizeUniqueConstraintError') {
    status_code = 422;
    res.status(status_code);

    error.code = 'E_DUPLICATE';
    error.message = error.errors[0].message;
  }

  if (error.name === 'SequelizeConnectionRefusedError') {
    status_code = 500;
    res.status(status_code);
    error.code = 'ECONNREFUSED';
    error.message = 'Something went wrong. Please try again later.';
  }

  return res.json({
    status_code,
    code: error.code,
    name: error.name,
    error: error.message || 'Something went wrong. Please try again later.',
    stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
  });
};

module.exports = {
  notFound,
  errorStack,
};
