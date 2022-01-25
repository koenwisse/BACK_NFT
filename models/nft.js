"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class nft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      nft.belongsTo(models.user);

      nft.belongsToMany(models.user, {
        through: "purchase",
        foreignKey: "nftId",
      });
      // nft.belongsTo(models.purchase);
    }
  }
  nft.init(
    {
      specialAbility: DataTypes.INTEGER,
      youthTrainingSkill: DataTypes.INTEGER,
      seniorTrainingSkill: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
      price: DataTypes.INTEGER,
      userId: DataTypes.STRING,
      purchaseId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "nft",
    }
  );
  return nft;
};
