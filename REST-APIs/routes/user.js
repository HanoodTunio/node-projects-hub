// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Adjust the path as necessary

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
