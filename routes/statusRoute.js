const router = require('express').Router();
const statusController = require('../controllers/statusController');
// const { VerifyUser, adminOnly } = require('../middleware/authUser');

router.get('/', statusController.index);
// router.patch('/:id/user', VerifyUser, adminOnly, statusController.updateStatus);
router.patch('/:id/user', statusController.updateStatus);

module.exports = router;
