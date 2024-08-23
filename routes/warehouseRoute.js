const router = require('express').Router();
const warehouseController = require('../controllers/warehouseController');

router.get('/', warehouseController.index);

module.exports = router;
