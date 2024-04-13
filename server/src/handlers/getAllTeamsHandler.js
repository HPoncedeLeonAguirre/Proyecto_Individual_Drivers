const { getAllTeams } = require('../controllers/getAllTeams');

const getAllTeamsHandler = async (req, res) => {
    try {
        const teams = await getAllTeams();
        return res.json(teams);
    } catch (error) {
        console.error('Hubo un error en el handler al obtener los teams:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllTeamsHandler
};