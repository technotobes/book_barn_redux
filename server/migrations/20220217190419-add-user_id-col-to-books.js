'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Books', 'user_id', {
      type: Sequelize.INTEGER

    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Books', 'user_id')
  }
};
