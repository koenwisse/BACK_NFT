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
      purchase.belongsTo(models.user);
      // purchase.hasMany(models.nft);
    }
  }
  purchase.init(
    {
      nftId: DataTypes.INTEGER,
      buyerId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      isSold: DataTypes.BOOLEAN,
      offer: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "purchase",
    }
  );
  return purchase;
};
