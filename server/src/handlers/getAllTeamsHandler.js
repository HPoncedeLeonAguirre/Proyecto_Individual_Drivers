const { getAllTeams } = require('../controllers/getAllTeams');

const getAllTeamsHandler = async (req, res) => {
    try {
        return getAllTeams(req, res.json.bind(res));
    } catch (error) {
        console.error('Hubo un error en el handler al obtener los teams:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllTeamsHandler
};