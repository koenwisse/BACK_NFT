"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //  User.belongsTo(UserRole, {as: 'role'}); // Adds roleId to user rather than userRoleId

      purchase.belongsTo(models.nft);
      purchase.belongsTo(models.user);
    }
  }
  purchase.init(
    {
      nftId: DataTypes.INTEGER,
      buyerId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      isSold: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "purchase",
    }
  );
  return purchase;
};
