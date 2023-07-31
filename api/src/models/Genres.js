const { DataTypes } = require('sequelize');

module.exports = (sequelise) => {
  sequelise.define('genres', {
    id:{
      type: DataTypes.INTEGER,      
      primaryKey: true,
      autoIncrement: true,
      unique: true,      
      allowNull: false,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  })
}