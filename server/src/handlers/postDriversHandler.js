const { postCreateDrivers } = require("../controllers/postCreateDrivers");


const postDriversHandler = async (req, res) => {
    try {
        const { forename, surname, description, image, nationality, dob, teams } =
        req.body;

        const newDriverResult = await postCreateDrivers(
            forename,
            surname,
            description,
            image,
            nationality,
            dob,
            teams
    );
        res.status(200).json(newDriverResult);
    } catch (error) {
        console.error("Hubo un error en el handler de crear un driver:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = { 
    postDriversHandler 
};