'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('credit_cards', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      credit_card_type: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      credit_card_number: {
        type: Sequelize.STRING(19),
        allowNull: false,
      },
      credit_card_name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      credit_card_expired: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      credit_card_cvv: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('credit_cards')
  }
}
