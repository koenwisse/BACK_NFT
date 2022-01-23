"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("nfts", [
      {
        specialAbility: 1,
        youthTrainingSkill: 11,
        seniorTrainingSkill: 12,
        imageUrl: "https://i.imgur.com/iYsytWZ.png",
        price: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        specialAbility: 2,
        youthTrainingSkill: 21,
        seniorTrainingSkill: 22,
        imageUrl: "https://i.imgur.com/iYsytWZ.png",
        price: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        specialAbility: 3,
        youthTrainingSkill: 31,
        seniorTrainingSkill: 32,
        imageUrl: "https://i.imgur.com/iYsytWZ.png",
        price: 33,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("nfts", null, {});
  },
};
