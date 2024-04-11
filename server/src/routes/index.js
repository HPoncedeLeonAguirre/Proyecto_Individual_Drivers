const { Router } = require("express");

const { getAllDriversHandler } = require('../handlers/getAllDriversHandler');
const { getDriversByIdHandler } = require('../handlers/getDriversByIdHandler');
const { postDriversHandler } = require('../handlers/postDriversHandler');
const { getAllTeamsHandler } = require('../handlers/getAllTeamsHandler')

const router = Router();

router.get('/drivers', getAllDriversHandler);
router.get('/drivers/:id', getDriversByIdHandler);
router.post('/drivers', postDriversHandler);
router.get('/teams', getAllTeamsHandler);

module.exports = router;