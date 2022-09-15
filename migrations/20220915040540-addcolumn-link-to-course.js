'use strict';

module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Courses','link',{
      type : Sequelize.TEXT,
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

   down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Courses','link')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
