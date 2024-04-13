const { Router } = require("express");
const { getAllDriversHandler } = require('../handlers/getAllDriversHandler');
const { getDriversByIdHandler } = require('../handlers/getDriversByIdHandler');
const { postDriversHandler } = require('../handlers/postDriversHandler');
const { getAllTeamsHandler } = require('../handlers/getAllTeamsHandler')

const router = Router();

router.get('/drivers', getAllDriversHandler);
router.get('/drivers/:id', getDriversByIdHandler);
router.get('/teams', getAllTeamsHandler);
router.post('/drivers', postDriversHandler);

module.exports = router;