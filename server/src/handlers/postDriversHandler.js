const { postCreateDrivers } = require('../controllers/postCreateDrivers');

const postDriversHandler = async (req, res) => {
    try {
        const dataDriver = req.body;
        const newDriver = await postCreateDrivers(dataDriver);

        res.status(200).json(newDriver);
    } catch (error) {
        console.error('Hubo un error al crear el driver: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    postDriversHandler
};