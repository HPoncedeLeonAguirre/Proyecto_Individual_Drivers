const { Router } = require("express");

const { getAllDriversHandler } = require('../handlers/getAllDriversHandler');
const { getDriversByIdHandler } = require('../handlers/getDriversByIdHandler');

const router = Router();

router.get('/drivers', getAllDriversHandler);
router.get('/drivers/:id', getDriversByIdHandler);

module.exports = router;