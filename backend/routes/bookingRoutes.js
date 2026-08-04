const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, cancelBooking, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', authMiddleware, createBooking);
router.get('/my', authMiddleware, getMyBookings);
router.get('/', authMiddleware, adminMiddleware, getAllBookings);
router.put('/:id', authMiddleware, adminMiddleware, updateBookingStatus);
router.delete('/:id', authMiddleware, cancelBooking);

module.exports = router;
