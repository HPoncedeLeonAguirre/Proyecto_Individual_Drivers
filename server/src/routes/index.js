const { Router } = require("express");
const driversRouter = require('./driversRouter');

const mainRouter = Router();

mainRouter.use('/drivers', driversRouter);


module.exports = mainRouter;