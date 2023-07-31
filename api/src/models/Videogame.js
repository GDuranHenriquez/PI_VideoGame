const { DataTypes, DATE } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,      
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false
    },
    launchDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    rating:{
      type: DataTypes.DECIMAL(3,2),
      allowNull: false,
      validate:{
        max: 5,
        min: 0,
      }
    }

  });
};
