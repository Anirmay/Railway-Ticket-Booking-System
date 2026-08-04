const express = require('express');
const router = express.Router();
const { createPayment, getPaymentHistory, getAllPayments } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', authMiddleware, createPayment);
router.get('/history', authMiddleware, getPaymentHistory);
router.get('/', authMiddleware, adminMiddleware, getAllPayments);

module.exports = router;
