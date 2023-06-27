'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VideoMeta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VideoMeta.init({
    nextPageToken: DataTypes.STRING,
    currentPage: DataTypes.INTEGER,
    currentVideoPlayTime: DataTypes.DATE,
    currentVideoIndex: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'VideoMeta',
  });
  return VideoMeta;
};