"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          last_name: "Arends",
          first_name: "Anton",
          email: "anton@arends.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          balance: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          last_name: "Barends",
          first_name: "Bernard",
          email: "bernard@barends.com",
          password: bcrypt.hashSync("a", SALT_ROUNDS),
          balance: 2000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
