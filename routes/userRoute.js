const router = require('express').Router();
const UserController = require('../controllers/userController');
const { VerifyUser, adminOnly } = require('../middleware/authUser.js');

router.get('/', UserController.getUsers);
router.get('/:id', VerifyUser, adminOnly, UserController.getUsersById);
router.post('/create', UserController.createUsers);
router.put('/:id', VerifyUser, adminOnly, UserController.updateUser);
router.delete('/:id', VerifyUser, adminOnly, UserController.deleteUsers);
router.post('/impersonate/:id', UserController.impersonateUser);

module.exports = router;
