const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.index);
router.get('/:id', itemController.getItemById);
router.post('/create', itemController.store);
router.put('/:id', itemController.update);
router.delete('/:id', itemController.destroy);

module.exports = router;
