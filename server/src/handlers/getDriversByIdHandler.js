const { getDriversById } = require('../controllers/getDriversById');

const getDriversByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const query = isNaN(id) ? "db" : "api";
        const response = await getDriversById(id, query);

        if(response){
            res.json(response);
        } else {
            res.status(400).json({ message: 'No se encontró el driver' });
        }
    } catch (error) {
        console.error('Hubo un error al obtener el driver: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getDriversByIdHandler
}