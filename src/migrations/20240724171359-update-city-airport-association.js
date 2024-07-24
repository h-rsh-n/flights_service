'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports',{
      type:'foreign key',
      name:'city_fkey_constraint',
      fields:['cityId'],
      references:{
        table:'Cities',
        field: 'id'
      },
      onUpdate:'cascade',
      onDelete: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports','city_fkey_constraint')
  }
};
