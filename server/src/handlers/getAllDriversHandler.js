const { getAllDrivers } = require('../controllers/getAllDrivers');
const { getDriversByName } = require('../controllers/getDriversByName');

const getAllDriversHandler = async (req, res) => {
    const { name } = req.query;
    try {
        if(name){
            const responseByName = await getDriversByName(name);

            if(responseByName.length === 0){
                return res.status(404).json(({ message: "No se encontraron conductores con ese nombre." }))
            }

            const first15Drivers = responseByName.slice(0, 15);

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