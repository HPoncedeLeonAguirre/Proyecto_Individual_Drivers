const { Router } = require("express");

const { getAllDrivers } = require('../controllers/getAllDrivers');

const driversRouter = Router();

driversRouter.get('/', getAllDrivers);

module.exports = driversRouter;