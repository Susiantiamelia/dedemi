'use strict';
const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    const course = JSON.parse(fs.readFileSync('./data/course.json', 'utf-8')).map(el => {
      return {
        ...el,
        createdAt: new Date(),
        updatedAt: new Date
      }
    })
    return queryInterface.bulkInsert('Courses', course)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Courses')
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
