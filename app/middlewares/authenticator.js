const flaverr = require('flaverr');

module.exports = async (req, res, next) => {
  try {
    const { key } = req.headers;

    if (!key || key === '') {
      throw flaverr(`E_MISSING_API_KEY`, Error(`API key is missing.`));
    }

    if (key !== process.env.API_KEY) {
      throw flaverr(`E_UNAUTHORIZED`, Error(`Invalid API key.`))
    }

    return next();
  } catch (err) {
    return next(err);
  }
}
