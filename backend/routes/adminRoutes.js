const express = require('express');
const router = express.Router();
const { getDashboard, getUsers, updateUserStatus, deleteUser, getReports } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/dashboard', authMiddleware, adminMiddleware, getDashboard);
router.get('/users', authMiddleware, adminMiddleware, getUsers);
router.put('/users/:id', authMiddleware, adminMiddleware, updateUserStatus);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);
router.get('/reports', authMiddleware, adminMiddleware, getReports);

module.exports = router;
