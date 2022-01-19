"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("nfts", [
      {
        special_ability: 1,
        youth_training_skill: 11,
        senior_training_skill: 12,
        image_url: "https://imgur.com/RCkbo5h.png",
        price: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        special_ability: 2,
        youth_training_skill: 21,
        senior_training_skill: 22,
        image_url: "https://imgur.com/RCkbo5h.png",
        price: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        special_ability: 3,
        youth_training_skill: 31,
        senior_training_skill: 32,
        image_url: "https://imgur.com/RCkbo5h.png",
        price: 33,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("nfts", null, {});
  },
};
