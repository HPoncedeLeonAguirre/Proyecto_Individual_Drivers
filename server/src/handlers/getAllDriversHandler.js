const getAllDriversController = require('../controllers/getAllDrivers');

const getAllDriversHandler = async (req, res) => {
    try {
        const allDrivers = await getAllDriversController.getAllDrivers();
        res.json(allDrivers);
    } catch (error) {
        console.error('Hubo un error al obtener los drivers: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getAllDriversHandler
}