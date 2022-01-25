// "use strict";

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.addColumn("nfts", "purchaseId", {
//       type: Sequelize.INTEGER,
//       references: {
//         model: "purchases",
//         key: "id",
//       },
//       onUpdate: "CASCADE",
//       onDelete: "SET NULL",
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.removeColumn("nfts", "purchaseId");
//   },
// };
