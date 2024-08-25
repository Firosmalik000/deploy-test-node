const router = require('express').Router();
const warehouseController = require('../controllers/warehouseController');

router.get('/', warehouseController.index);
router.put('/:id', warehouseController.updateWarehouse);

module.exports = router;
