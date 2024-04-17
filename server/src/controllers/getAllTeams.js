const axios = require('axios');

const { Team } = require('../db');

const getAllTeams = async (req, sendJson) => {
    try {
        let allTeams = await Team.findAll();
        if(allTeams.length === 0) {
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
            allTeams = await Team.findAll();
        }
        const formattedTeams = allTeams.map(team => team.name);
        return sendJson(formattedTeams);

    } catch (error) {
        console.error('Hubo un error al obtener los teams:', error);
        return sendJson({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllTeams
};