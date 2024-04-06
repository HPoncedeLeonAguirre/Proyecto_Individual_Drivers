const { Driver, Team } = require("../db");

const postCreateDrivers = async (
    forename,
    surname,
    description,
    image,
    nationality,
    dob,
    teams
) => {
    try {
        const newDriver = await Driver.create({
            forename,
            surname,
            description,
            image,
            nationality,
            dob,
    });

    const teamNames = teams.split(",").map((team) => team.trim());
    const searchTeams = await Team.findAll({
        where: {
            name: teamNames,
        },
    });
    await newDriver.addTeams(searchTeams);

    return { message: "Conductor creado exitosamente", driver: newDriver };
    } catch (error) {
        console.error("Hubo un error al crear el driver:", error);
        throw new Error("Hubo un error al crear el driver");
    }
};

module.exports = { 
    postCreateDrivers
};