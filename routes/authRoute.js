const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/me', authController.me);
router.post('/login', authController.login);
router.delete('/logout', authController.logout);

module.exports = router;
