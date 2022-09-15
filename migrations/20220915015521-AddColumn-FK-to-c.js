'use strict';

module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users_Courses','CourseId',{
      type : Sequelize.INTEGER,
      references : {
        model : "Courses",
        key : "id"
      },
      onDelete : 'cascade'
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

   down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users_Courses','CourseId')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
