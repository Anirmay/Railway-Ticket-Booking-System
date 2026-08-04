const storage = require('../utils/storage');

exports.getTrains = async (req, res) => {
  try {
    const trains = storage.listTrains(req.query);
    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trains', error: error.message });
  }
};

exports.getTrainById = async (req, res) => {
  try {
    const train = storage.getTrainById(req.params.id);
    if (!train) return res.status(404).json({ message: 'Train not found' });
    res.json(train);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch train', error: error.message });
  }
};

exports.createTrain = async (req, res) => {
  try {
    const train = storage.addTrain(req.body);
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add train', error: error.message });
  }
};

exports.updateTrain = async (req, res) => {
  try {
    const train = storage.updateTrain(req.params.id, req.body);
    res.json(train);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update train', error: error.message });
  }
};

exports.deleteTrain = async (req, res) => {
  try {
    storage.deleteTrain(req.params.id);
    res.json({ message: 'Train deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete train', error: error.message });
  }
};
