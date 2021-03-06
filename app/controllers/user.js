const userService = require('../services/user');

const create = async (req, res, next) => {
  try {
    const {
      name,
      email,
      address,
      password,
      credit_card_name,
      credit_card_number,
      credit_card_expired,
      credit_card_cvv,
      credit_card_type
    } = req.body;

    const files = req.files.map((file) => {
      return {
        path_location: file.path,
        url: `${file.filename}`
      }
    });

    const user = await userService.create({
      name,
      email,
      address,
      password,
      credit_card_name,
      credit_card_number,
      credit_card_expired,
      credit_card_cvv,
      credit_card_type,
      files
    });

    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
}

const findAll = async(req, res, next) => {
  try {
    const { q, ob, sb, lt, of } = req.query;

    const users = await userService.findAll({ q, ob, of, sb, lt });

    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
}

const findById = async(req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.findById(id);

    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
}

const update = async (req, res, next) => {
  try {
    const {
      user_id,
      name,
      email,
      address,
      password,
      credit_card_name,
      credit_card_number,
      credit_card_expired,
      credit_card_cvv,
      credit_card_type
    } = req.body;

    const files = req.files.map((file) => {
      return {
        path_location: file.path,
        url: `${file.filename}`
      }
    });

    const user = await userService.update(user_id, {
      name,
      email,
      address,
      password,
      credit_card_name,
      credit_card_number,
      credit_card_expired,
      credit_card_cvv,
      credit_card_type,
      files
    });

    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  findById,
  findAll,
  create,
  update
};
