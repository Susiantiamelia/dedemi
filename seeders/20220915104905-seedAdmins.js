'use strict';
const fs = require('fs')
module.exports = {
   up (queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./data/admin.json','utf-8'))
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Users',data)
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
    return queryInterface.bulkDelete('Users',null,{})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
