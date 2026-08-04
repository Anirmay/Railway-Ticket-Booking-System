const express = require('express');
const router = express.Router();
const {
  getDashboard,
  getUsers,
  updateUserStatus,
  deleteUser,
  getReports,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
  uploadAdminPhoto,
} = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/dashboard', authMiddleware, adminMiddleware, getDashboard);
router.get('/profile', authMiddleware, adminMiddleware, getAdminProfile);
router.put('/profile', authMiddleware, adminMiddleware, updateAdminProfile);
router.put('/change-password', authMiddleware, adminMiddleware, changeAdminPassword);
router.post('/upload-photo', authMiddleware, adminMiddleware, uploadAdminPhoto);
router.get('/users', authMiddleware, adminMiddleware, getUsers);
router.put('/users/:id', authMiddleware, adminMiddleware, updateUserStatus);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);
router.get('/reports', authMiddleware, adminMiddleware, getReports);

module.exports = router;
