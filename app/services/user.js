const bcrypt = require('bcrypt');
const qs = require('querystring');
const flaverr = require('flaverr');
const photoService = require('./photo');
const creditCardService = require('./credit-card');
const { User, Credit_Card, Photo, Sequelize } = require('../models');

const create = async ({
  name,
  email,
  address,
  password,
  credit_card_name,
  credit_card_number,
  credit_card_expired,
  credit_card_cvv,
  files
}, transaction) => {
  try {
    const user_data = {
      name,
      address,
      email,
      password: bcrypt.hashSync(password, 10)
    };

    const user = await User.create(user_data, { transaction, returning: true });
    if (!user) {
      throw flaverr(`E_ERROR`, Error(`failed to register a new user`));
    }

    const credit_card_data = {
      credit_card_name,
      credit_card_cvv,
      credit_card_number,
      credit_card_expired,
      user_id: user.id
    };

    await creditCardService.create(credit_card_data);

    const photo_data = files.map((file) => {
      file.user_id = user.id;
      return file;
    });

    await photoService.bulkCreate(photo_data);

    return Promise.resolve({ user_id: user.id });
  } catch (err) {
    return Promise.reject(err);
  }
}

const findAll = async (filter, transaction) => {
  try {
    const where = {};
    if (filter.name) {
      where.name = { [Sequelize.Op.like]: `%${decodeURIComponent(filter.name)}%` };
    }
    if (filter.address) {
      where.address = { [Sequelize.Op.like]: `%${decodeURIComponent(filter.address)}%` };
    }
    if (filter.email) {
      where.email = { [Sequelize.Op.like]: `%${decodeURIComponent(filter.email)}%` };
    }

    const { count, rows } = await User.findAndCountAll({
      where,
      transaction,
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Credit_Card,
      }, {
        model: Photo
      }]
    });

    if (count < 1) {
      throw flaverr(`E_NOT_FOUND`, Error(`user not found`));
    }

    return Promise.resolve({
      count,
      rows
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

const findOne = async (filter, transaction) => {
  try {
    const where = {};
    if (filter.name) {
      where.name = { [Sequelize.Op.eq]: `${decodeURIComponent(filter.name)}` };
    }
    if (filter.address) {
      where.address = { [Sequelize.Op.eq]: `${decodeURIComponent(filter.address)}` };
    }
    if (filter.email) {
      where.email = { [Sequelize.Op.eq]: `${decodeURIComponent(filter.email)}` };
    }

    const user = await User.findOne({
      where,
      transaction,
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Credit_Card,
      }, {
        model: Photo
      }]
    });

    if (!user) {
      throw flaverr(`E_NOT_FOUND`, Error(`user not found`));
    }

    return Promise.resolve(user);
  } catch (err) {
    return Promise.reject(err);
  }
}

const findById = async (id, transaction) => {
  try {
    const user = await User.findByPk(id, {
      transaction,
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Credit_Card,
      }, {
        model: Photo
      }]
    });

    if (!user) {
      throw flaverr(`E_NOT_FOUND`, Error(`user with id ${id} not found`));
    }

    return Promise.resolve(user);
  } catch (err) {
    return Promise.reject(err);
  }
}

const update = async (id, update = {
  name,
  email,
  address,
  password,
  credit_card_name,
  credit_card_number,
  credit_card_expired,
  credit_card_cvv,
  files
}, transaction) => {
  try {
    const user = await findById(id, transaction);

    if (update.name && update.name !== '') {
      user.name = update.name;
    }
    if (update.address && update.address !== '') {
      user.address = update.address;
    }
    if ((update.email && update.email !== '') && update.email !== user.email) {
      user.email = update.email;
    }
    if (update.password && update.password !== '') {
      user.password = bcrypt.hashSync(update.password, 10);
    }

    const update_user = await user.save({ transaction });
    if (!update_user) {
      throw flaverr(`E_ERROR`, Error(`failed to update user`));
    }

    const credit_card_data = {
      credit_card_name: update.credit_card_name,
      credit_card_cvv: update.credit_card_cvv,
      credit_card_number: update.credit_card_number,
      credit_card_expired: update.credit_card_expired,
      user_id: user.id
    };

    await creditCardService.update(user.Credit_Cards[0].dataValues.id, credit_card_data);

    const photo_data = update.files.map((file) => {
      file.user_id = user.id;
      return file;
    });

    await photoService.bulkCreate(photo_data);

    return Promise.resolve({ success: true });
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  create,
  update,
  findOne,
  findById,
  findAll
};
