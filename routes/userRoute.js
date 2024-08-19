const router = require('express').Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUsersById);
router.post('/create', UserController.createUsers);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUsers);

module.exports = router;
