const fs = require('fs');
const path = require('path');

const getDriversPathJSON = path.join(__dirname, "../../api/db.json");

const getAllDrivers = () => {
    try {
        const dataDrivers = fs.readFileSync(getDriversPathJSON, 'utf8');
        const jsonDrivers = JSON.parse(dataDrivers);
        const drivers = jsonDrivers.drivers;

        drivers.forEach((driver) => {
            if(!driver.image.url) {
                driver.image = { url: '/assets/img-default.jpg' };
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