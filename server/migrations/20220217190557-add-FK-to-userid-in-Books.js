'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Books', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user_id',
      references: { //Required field
        table: 'Users',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Books', 'user_id');
  }
};
