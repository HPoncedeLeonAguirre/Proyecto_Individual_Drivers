const {default: axios} = require('axios');
const { Sequelize } = require('sequelize');

const { Driver, Team } = require('../db');

const getDriversByNameDB = async (name) => {
    const dbDrivers = await Driver.findAll({
        where: {
            [Sequelize.Op.or]: [
                { forename: { [Sequelize.Op.iLike]: `%${name}%` } },
                { surname: { [Sequelize.Op.iLike]: `%${name}%` } },
                Sequelize.literal(`forename || ' ' || surname ILIKE '%${name}%'`),
            ],
        },
        include: [{ model: Team, through: 'driver_team' }],
    });
    return dbDrivers;
};

const getDriversByNameServer = async (name) => {
    try {
        const response = await axios.get(`http://localhost:3001/drivers`);
        const apiDrivers = response.data;
        
        const nameLowerCase = name.toLowerCase();
        const drivers = apiDrivers.filter((driver) => {
            const fullName = (driver.name && driver.name.forename && driver.name.surname) 
            ? `${driver.name.forename} ${driver.name.surname}`.toLowerCase() 
            : '';
            return fullName.includes(nameLowerCase);
        });
        return drivers;
    } catch (error) {
        console.error('Hubo un error al obtener al driver por su nombre del servidor: ', error);
        throw new Error('Hubo un error al obtener al driver por su nombre del servidor');
    }
};

const getDriversByName = async (name) => {
    try {
        let dbResults = await getDriversByNameDB(name);
        if(dbResults.length === 0){
            return await getDriversByNameServer(name);
        }
        return dbResults;
    } catch (error) {
        console.error('Hubo un error al obtener los drivers por nombre: ', error);
        throw new Error('Hubo un error al obtener los drivers por nombre');
    }
};

module.exports = {
    getDriversByName
};