const axios = require('axios');

const { Team } = require('../db');

const getAllTeams = async () => {
    try {
        const dbTeams = await Team.findAll();
        if(dbTeams.length === 0) {
            const response = await axios.get("http://localhost:3001/drivers");
            const drivers = response.data;

            const saveTeams = []
            drivers.forEach(driver => {
                if(driver.teams){
                    const teams = driver.teams.split(',').map(team => team.trim());
                    teams.forEach(teamName => {
                    if(!saveTeams.some(saveTeam => saveTeam.name === teamName)){
                        saveTeams.push({
                            name: teamName,
                        });
                    }
                });
                }
            });
            await Team.bulkCreate(saveTeams, { individualHooks: true });
        }
        const allTeams = await Team.findAll();
        return allTeams;
    } catch (error) {
        console.error('Hubo un error al obtener los teams:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllTeams
};