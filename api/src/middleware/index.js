const inicializatePlatforms  = require('./FillPlatforms');
const inicializateGenres = require('./FillGenres');

async function InitializateDataModels(){
  try {
    await inicializateGenres();
    await inicializatePlatforms();
    console.log('Datos inicializados correctamente')
  } catch (error) {
    console.error('Error al insertar datos iniciales:', error);
  }
};

module.exports = InitializateDataModels;