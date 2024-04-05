const { Driver, Team } = require('../db');

const postCreateDrivers = async (dataDriver) => {
    try {
        const newDriver = await Driver.create(dataDriver);

        if(dataDriver.teams && Array.isArray(dataDriver.teams)) {
            const teams = await Team.findAll({
                where: {
                    id:dataDriver.teams
                }
            });
            await newDriver.setTeams(teams);
        }
        return newDriver;
    } catch (error) {
        console.error('Hubo un error al crear el driver: ', error);
        throw new Error('Hubo un error al crear el driver');
    }
};

module.exports = {
    postCreateDrivers
};