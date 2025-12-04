const express = require('express');
const { getUserById, getAllUsers, updateUser, deleteUser } = require('../controller/user');
const router = express.Router();

module.exports = router;

// Define user-related routes here
router.get('/',getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
