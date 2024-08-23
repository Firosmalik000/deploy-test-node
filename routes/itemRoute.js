const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { VerifyUser, adminOnly } = require('../middleware/authUser.js');

router.get('/', itemController.index);
router.get('/:id', VerifyUser, itemController.getItemById);
router.post('/create', itemController.store);
router.put('/:id', VerifyUser, itemController.update);
router.delete('/:id', VerifyUser, itemController.destroy);
router.patch('/:id/user', VerifyUser, adminOnly, itemController.updateStatus);

module.exports = router;
