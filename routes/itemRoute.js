const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { VerifyUser } = require('../middleware/authUser.js');

router.get('/', VerifyUser, itemController.index);
router.get('/:id', VerifyUser, itemController.getItemById);
router.post('/create', VerifyUser, itemController.store);
router.put('/:id', VerifyUser, itemController.update);
router.delete('/:id', VerifyUser, itemController.destroy);

module.exports = router;
