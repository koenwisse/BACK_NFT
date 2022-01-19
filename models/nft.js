'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  nft.init({
    special_ability: DataTypes.INTEGER,
    youth_training_skill: DataTypes.INTEGER,
    senior_training_skill: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'nft',
  });
  return nft;
};