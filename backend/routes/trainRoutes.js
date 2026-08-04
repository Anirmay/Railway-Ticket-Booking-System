const express = require('express');
const router = express.Router();
const { getTrains, getTrainById, createTrain, updateTrain, deleteTrain } = require('../controllers/trainController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', getTrains);
router.get('/:id', getTrainById);
router.post('/', authMiddleware, adminMiddleware, createTrain);
router.put('/:id', authMiddleware, adminMiddleware, updateTrain);
router.delete('/:id', authMiddleware, adminMiddleware, deleteTrain);

module.exports = router;
