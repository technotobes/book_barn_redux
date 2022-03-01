'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Books', 'username', {
      type: Sequelize.STRING

    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Books', 'username')
  }
};
