const axios = require('axios');
const { Driver, Team } = require('../db');

const getDriversByIdDB = async (id) => {
    try{
        const dbDrivers = await Driver.findOne({
            where: { id },
            include: [{ model: Team, through: "driver_team" }]
        });

        if(dbDrivers){
            return dbDrivers;
        }    
    } catch (error) {
        console.error('Hubo un error al obtener el driver de la base de datos: ', error);
        throw new Error('Hubo un error al obtener el driver de la base de datos');
    }
};

const getDriversByIdServer = async (id) => {
    try{
        const response = await axios.get('http://localhost:5000/drivers');
        const apiDrivers = response.data;
        
        const drivers = apiDrivers.filter((driver) => driver.id.toString() === id);

        return drivers ? [drivers] : [];
    } catch (error) {
        console.error('Hubo un error al obtener el driver del servidor: ', error);
        throw new Error('Hubo un error al obtener el driver del servidor');
    }
};

const getDriversById = async(id, query) => {
    try {
        if(query === 'api'){
            return await getDriversByIdServer(id);
        } else {
            return await getDriversByIdDB(id);
        }
    } catch (error) {
        console.error('Hubo un error al obtener el driver: ', error);
        throw new Error('Hubo un error al obtener el driver');
    }
};

module.exports = {
    getDriversById
}