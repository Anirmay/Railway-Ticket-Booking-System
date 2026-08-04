const storage = require('../utils/storage');

exports.getDashboard = async (req, res) => {
  try {
    res.json(storage.getDashboardStats());
  } catch (error) {
    res.status(500).json({ message: 'Dashboard failed', error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    res.json(storage.getAllUsers());
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const user = storage.updateUser(req.params.id, { status: req.body.status });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    storage.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    res.json(storage.getReports());
  } catch (error) {
    res.status(500).json({ message: 'Reports failed', error: error.message });
  }
};
