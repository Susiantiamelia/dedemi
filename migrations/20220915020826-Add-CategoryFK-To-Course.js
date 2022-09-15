'use strict';

module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Courses','CategoryId',{
      type : Sequelize.INTEGER,
      references : {
        model : "Categories",
        key : "id"
      }
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

   down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Courses','CategoryId')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
