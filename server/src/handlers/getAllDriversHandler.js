const { getAllDrivers } = require('../controllers/getAllDrivers');
const { getDriversByNameDB, getDriversByNameServer } = require('../controllers/getDriversByName');

const getAllDriversHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if(name){
            const responseByNameDB = await getDriversByNameDB(name);
            const responseByNameServer = await getDriversByNameServer(name);
            
            const uniqueDrivers = {};

            responseByNameDB.forEach((driver) => {
                uniqueDrivers[driver.id] = driver;
            });

            responseByNameServer.forEach((driver) => {
                uniqueDrivers[driver.id] = driver;
            });

            const clusteredDrivers = Object.values(uniqueDrivers);
            const first15Drivers = clusteredDrivers.slice(0, 15);
            if(first15Drivers.length === 0) {
                return res.status(404).json(({ message: "No se encontraron conductores con ese nombre." }))
            }
            return res.json(first15Drivers);
        } else {
            const responseAllDrivers = await getAllDrivers();
            res.json(responseAllDrivers);
        }
    } catch (error) {
        console.error('Hubo un error al obtener los drivers: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllDriversHandler
};