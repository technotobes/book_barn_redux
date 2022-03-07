'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'email', {
      type: Sequelize.STRING

    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'email')
  }
};
