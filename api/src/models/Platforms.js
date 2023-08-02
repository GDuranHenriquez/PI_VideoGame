const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
  sequelize.define('platform', {
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
  },   
  {
    timestamps: true,
    createdAt: false,
    updatedAt: false,
  })
}