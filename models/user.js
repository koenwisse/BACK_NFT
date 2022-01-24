"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //  User.belongsTo(UserRole, {as: 'role'}); // Adds roleId to user rather than userRoleId
    static associate(models) {
      user.hasMany(models.nft);
      user.belongsToMany(models.nft, {
        through: "purchase",
        foreignKey: "sellerId",
      });
      user.belongsToMany(models.nft, {
        through: "purchase",
        foreignKey: "buyerId",
      });
    }
  }
  user.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
