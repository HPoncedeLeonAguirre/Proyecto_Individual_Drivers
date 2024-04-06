const { getDriversByName } = require('../controllers/getDriversByName');

const getDriversByNameHandler = async (req, res) => {
    try {
        const { name } = req.query;
        const drivers = await getDriversByName(name);

        if(drivers.length > 0) {
            res.json(drivers);
        } else {
            res.status(400).json({ message: 'No se encontraron drivers con ese nombre' });
        }
    } catch (error) {
        console.error('Hubo un error al obtener los drivers por su nombre: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getDriversByNameHandler
};