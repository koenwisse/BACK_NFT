"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("purchases", [
      {
        nftId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        buyerId: 2,
        sellerId: 1,
        isSold: true,
        offer: 1000,
      },

      {
        nftId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        buyerId: 2,
        sellerId: 1,
        isSold: false,
        offer: 1000,
      },
      {
        nftId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
        buyerId: 2,
        sellerId: 3,
        isSold: false,
        offer: 1000,
      },
      {
        nftId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        buyerId: 1,
        sellerId: 2,
        isSold: false,
        offer: 1000,
      },
      {
        nftId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        buyerId: 3,
        sellerId: 2,
        isSold: false,
        offer: 1000,
      },
      {
        nftId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        buyerId: 3,
        sellerId: 1,
        isSold: false,
        offer: 1000,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("purchases", null, {});
  },
};
