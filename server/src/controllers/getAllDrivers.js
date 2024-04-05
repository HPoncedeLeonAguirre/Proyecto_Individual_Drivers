const fs = require('fs');
const path = require('path');

const { Driver, Team } = require('../db');

const getDriversPathJSON = path.join(__dirname, "../../api/db.json");

const getAllDrivers = async () => {
    try {
        const dataDrivers = fs.readFileSync(getDriversPathJSON, 'utf8');
        const jsonDrivers = JSON.parse(dataDrivers);
        const apiDrivers = jsonDrivers.drivers;

        const dbDrivers = await Driver.findAll({
            include: [{ model: Team, through: 'driver_team' }]
        });

        const drivers = [...dbDrivers, ...apiDrivers].reduce((acc, driver) => {
            const existDriver = acc.find(d => d.id === driver.id);
            if(!existDriver){
                acc.push(driver);
            } else {
                existDriver.teams = driver.teams;
            }
            return acc;
        }, []);

        drivers.forEach((driver) => {
            if(!driver.image || !driver.image.url) {
                driver.image = driver.image || {};
                driver.image.url = '/assets/img-default.jpg';
            }
        });

        return drivers;

    } catch (error) {
        console.error('Hubo un error al obtener los drivers: ', error);
        throw new Error('Error interno del servidor');
    }
};

module.exports = {
    getAllDrivers
};