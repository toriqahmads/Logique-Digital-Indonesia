const flaverr = require('flaverr');
const { Credit_Card, Sequelize } = require('../models');

const create = async ({
  credit_card_number,
  credit_card_name,
  credit_card_expired,
  credit_card_cvv,
  user_id
}, transaction) => {
  try {
    const credit_card_data = {
      credit_card_number,
      credit_card_name,
      credit_card_expired,
      credit_card_cvv,
      user_id
    };

    const cc = await Credit_Card.create(credit_card_data, { transaction, returning: true });
    if (!cc) {
      throw flaverr(`E_ERROR`, Error(`failed to save a new credit card`));
    }

    return Promise.resolve({ credit_card_id: cc.id });
  } catch (err) {
    return Promise.reject(err);
  }
}

const findAll = async (filter, transaction) => {
  try {
    const where = {};
    if (filter.credit_card_name) {
      where.credit_card_name = { [Sequelize.Op.like]: `%${decodeURIComponent(filter.credit_card_name)}%` };
    }
    if (filter.credit_card_number) {
      where.credit_card_number = { [Sequelize.Op.like]: `%${decodeURIComponent(filter.credit_card_number)}%` };
    }
    if (filter.credit_card_expired) {
      where.credit_card_expired = { [Sequelize.Op.like]: `%${decodeURIComponent(filter.credit_card_expired)}%` };
    }
    if (filter.credit_card_cvv) {
      where.credit_card_cvv = { [Sequelize.Op.like]: `%${decodeURIComponent(filter.credit_card_cvv)}%` };
    }
    if (filter.user_id) {
      where.user_id = { [Sequelize.Op.eq]: filter.user_id };
    }

    const { count, rows } = await Credit_Card.findAndCountAll({
      where,
      transaction
    });

    if (count < 1) {
      throw flaverr(`E_NOT_FOUND`, Error(`credit card not found`));
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
    if (filter.credit_card_name) {
      where.credit_card_name = { [Sequelize.Op.eq]: `${decodeURIComponent(filter.credit_card_name)}` };
    }
    if (filter.credit_card_number) {
      where.credit_card_number = { [Sequelize.Op.eq]: `${decodeURIComponent(filter.credit_card_number)}` };
    }
    if (filter.credit_card_expired) {
      where.credit_card_expired = { [Sequelize.Op.eq]: `${decodeURIComponent(filter.credit_card_expired)}` };
    }
    if (filter.credit_card_cvv) {
      where.credit_card_cvv = { [Sequelize.Op.eq]: `${decodeURIComponent(filter.credit_card_cvv)}` };
    }
    if (filter.user_id) {
      where.user_id = { [Sequelize.Op.eq]: filter.user_id };
    }

    const cc = await Credit_Card.findOne({
      where,
      transaction
    });

    if (!cc) {
      throw flaverr(`E_NOT_FOUND`, Error(`credit card not found`));
    }

    return Promise.resolve(cc);
  } catch (err) {
    return Promise.reject(err);
  }
}

const findById = async (id, transaction) => {
  try {
    const cc = await Credit_Card.findByPk(id, {
      transaction
    });

    if (!cc) {
      throw flaverr(`E_NOT_FOUND`, Error(`credit card with id ${id} not found`));
    }

    return Promise.resolve(cc);
  } catch (err) {
    return Promise.reject(err);
  }
}

const update = async (
  id,
  update = {
    credit_card_number,
    credit_card_name,
    credit_card_expired,
    credit_card_cvv,
    user_id
  },
  transaction
) => {
  try {
    const cc = await findById(id, transaction);

    if (update.credit_card_name && update.credit_card_name !== '') {
      cc.credit_card_name = update.credit_card_name;
    }
    if (update.credit_card_number && update.credit_card_number !== '') {
      cc.credit_card_number = update.credit_card_number;
    }
    if (update.credit_card_expired && update.credit_card_expired !== '') {
      cc.credit_card_expired = update.credit_card_expired;
    }
    if (update.credit_card_cvv && update.credit_card_cvv !== '') {
      cc.credit_card_cvv = update.credit_card_cvv;
    }

    const update_cc = await cc.save({ transaction });
    if (!update_cc) {
      throw flaverr(`E_ERROR`, Error(`failed to update credit card`));
    }

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
