const axios = require('axios');

const { Driver, Team, Op } = require('../db');

const getDriversByNameDB = async (name) => {
    try {
        const dbDrivers = await Driver.findAll({
            where: {
                [Op.or]: [
                    { forename: { [Op.iLike]: `%${name}%` } },
                    { surname: { [Op.iLike]: `%${name}%` } },
                ],
            },
            include: [{ model: Team, through: 'driver_team' }],
            limit: 15,
        });
        return dbDrivers;
    } catch (error) {
        console.error('Hubo un error al obtener al driver por su nombre de la base de datos: ', error);
        throw new Error('Hubo un error al obtener al driver por su nombre de la base de datos');
    }
};

const getDriversByNameServer = async (name) => {
    try {
        const response = await axios.get(`http://localhost:5000/drivers?name=${name}`);
        const apiDrivers = response.data;

        return apiDrivers.slice(0, 15);
    } catch (error) {
        console.error('Hubo un error al obtener al driver por su nombre del servidor: ', error);
        throw new Error('Hubo un error al obtener al driver por su nombre del servidor');
    }
};

const getDriversByName = async (name) => {
    try {
        const dbDriver = await getDriversByNameDB(name);
        const serverDriver = await getDriversByNameServer(name);

        const drivers = [...dbDriver, ...serverDriver].reduce((acc, driver) => {
            const existDriver = acc.find(d => d.id === driver.id);
            if(!existDriver){
                acc.push(driver);
            } else {
                existDriver.teams = driver.teams;
            }
            return acc;
        }, []);
        return drivers.slice(0, 15);
    } catch (error) {
        console.error('Hubo un error al obtener al driver por su nombre: ', error);
        throw new Error('Hubo un error al obtener al driver por su nombre');
    }
};

module.exports = {
    getDriversByName
};