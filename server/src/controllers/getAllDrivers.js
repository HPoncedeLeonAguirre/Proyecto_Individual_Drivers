const axios = require('axios');
const { Driver, Team } = require('../db')

const getAllDrivers = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/drivers');
        const drivers = response.data;

        res.json(drivers);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al obtener los drivers'});
    }
};

module.exports = {
    getAllDrivers
};