const flaverr = require('flaverr');
const { Photo, Sequelize } = require('../models');

const create = async ({
  path_location,
  url,
  user_id
}, transaction) => {
  try {
    const photo_data = {
      path_location,
      url,
      user_id
    };

    const photo = await Photo.create(photo_data, { transaction, returning: true });
    if (!photo) {
      throw flaverr(`E_ERROR`, Error(`failed to save a new user photo`));
    }

    return Promise.resolve({ photo_id: photo.id });
  } catch (err) {
    return Promise.reject(err);
  }
}

const bulkCreate = async (photos = [{
  path_location,
  url,
  user_id
}], transaction) => {
  try {
    const photo = await Photo.bulkCreate(photos, { transaction, returning: true });
    if (!photo) {
      throw flaverr(`E_ERROR`, Error(`failed to save a new user photo`));
    }

    return Promise.resolve(photo);
  } catch (err) {
    return Promise.reject(err);
  }
}

const findAll = async (filter, transaction) => {
  try {
    const where = {};
    if (filter.path_location) {
      where.path_location = { [Sequelize.Op.like]: `%${decodeURIComponent(filter.path_location)}%` };
    }
    if (filter.url) {
      where.url = { [Sequelize.Op.like]: `%${decodeURIComponent(filter.url)}%` };
    }

    const { count, rows } = await Photo.findAndCountAll({
      where,
      transaction
    });

    if (count < 1) {
      throw flaverr(`E_NOT_FOUND`, Error(`user photo not found`));
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
    if (filter.path_location) {
      where.path_location = { [Sequelize.Op.eq]: `${decodeURIComponent(filter.path_location)}` };
    }
    if (filter.url) {
      where.url = { [Sequelize.Op.eq]: `${decodeURIComponent(filter.url)}` };
    }
    if (filter.user_id) {
      where.user_id = { [Sequelize.Op.eq]: filter.user_id };
    }

    const photo = await Photo.findOne({
      where,
      transaction
    });

    if (!photo) {
      throw flaverr(`E_NOT_FOUND`, Error(`user photo not found`));
    }

    return Promise.resolve(photo);
  } catch (err) {
    return Promise.reject(err);
  }
}

const findById = async (id, transaction) => {
  try {
    const photo = await Photo.findByPk(id, {
      transaction
    });

    if (!photo) {
      throw flaverr(`E_NOT_FOUND`, Error(`user photo with id ${id} not found`));
    }

    return Promise.resolve(photo);
  } catch (err) {
    return Promise.reject(err);
  }
}

const update = async (
  id,
  update = {
    path_location,
    url,
    user_id
  },
  transaction
) => {
  try {
    const photo = await findById(id, transaction);

    if (update.path_location && update.path_location !== '') {
      photo.path_location = update.path_location;
    }
    if (update.url && update.url !== '') {
      photo.url = update.url;
    }
    if (update.user_id && update.user_id !== '') {
      photo.user_id = update.user_id;
    }

    const update_photo = await photo.save({ transaction });
    if (!update_photo) {
      throw flaverr(`E_ERROR`, Error(`failed to update user photo`));
    }

    return Promise.resolve({ success: true });
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  create,
  bulkCreate,
  update,
  findOne,
  findById,
  findAll,
};
