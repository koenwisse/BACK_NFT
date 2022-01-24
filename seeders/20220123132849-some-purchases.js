"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("purchases", [
      {
        nftId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        buyerId: 1,
        sellerId: 1,
        isSold: true,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("purchases", null, {});
  },
};
