const { DataTypes } = require('sequelize');

module.exports = (sequelise) => {
  sequelise.define('genre', {
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
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  })
}