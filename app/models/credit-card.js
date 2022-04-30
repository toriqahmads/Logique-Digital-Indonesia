'use strict'

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Credit_Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Credit_Card.belongsTo(models.User);
    }
  }
  Credit_Card.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    credit_card_number: {
      type: DataTypes.STRING(19),
      allowNull: false,
    },
    credit_card_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    credit_card_expired: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    credit_card_cvv: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: true,
    underscored: true,
    paranoid: true,
    modelName: 'Credit_Card',
    tableName: 'credit_cards',
  })
  return Credit_Card
}
