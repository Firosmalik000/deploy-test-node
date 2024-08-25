const router = require('express').Router();
const UserController = require('../controllers/userController');
const { VerifyUser, adminOnly } = require('../middleware/authUser.js');

router.get('/', VerifyUser, adminOnly, UserController.getUsers);
router.get('/:id', VerifyUser, adminOnly, UserController.getUsersById);
router.post('/create', UserController.createUsers);
router.put('/:id', VerifyUser, adminOnly, UserController.updateUser);
router.delete('/:id', VerifyUser, adminOnly, UserController.deleteUsers);

module.exports = router;
