const { Router } = require("express");

const { getAllDriversHandler } = require('../handlers/getAllDriversHandler');
const { getDriversByIdHandler } = require('../handlers/getDriversByIdHandler');
const { getDriversByNameHandler } = require('../handlers/getDriversByNameHandler');
const { postDriversHandler } = require('../handlers/postDriversHandler');

const router = Router();

router.get('/drivers', getAllDriversHandler);
router.get('/drivers/:id', getDriversByIdHandler);
router.get('/drivers/name', getDriversByNameHandler);
router.post('/drivers', postDriversHandler);

module.exports = router;