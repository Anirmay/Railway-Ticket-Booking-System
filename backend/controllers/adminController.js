const bcrypt = require('bcryptjs');
const storage = require('../utils/storage');

exports.getDashboard = async (req, res) => {
  try {
    res.json(await storage.getDashboardStats());
  } catch (error) {
    res.status(500).json({ message: 'Dashboard failed', error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    res.json(await storage.getAllUsers());
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const user = await storage.updateUser(req.params.id, { status: req.body.status });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await storage.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    res.json(await storage.getReports());
  } catch (error) {
    res.status(500).json({ message: 'Reports failed', error: error.message });
  }
};

exports.getAdminProfile = async (req, res) => {
  res.json(req.user);
};

exports.updateAdminProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.password;
    const user = await storage.updateUser(req.user._id, { ...updates, updatedAt: new Date().toISOString() });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Admin profile update failed', error: error.message });
  }
};

exports.changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new password are required' });
    }

    const existingUser = await storage.getUserById(req.user._id);
    if (!existingUser) return res.status(404).json({ message: 'Admin not found' });
    const passwordMatch = bcrypt.compareSync(currentPassword, existingUser.password);
    if (!passwordMatch) return res.status(400).json({ message: 'Current password is incorrect' });
    if (newPassword.length < 6) return res.status(400).json({ message: 'New password should be at least 6 characters' });

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await storage.updateUser(req.user._id, { password: hashedPassword, updatedAt: new Date().toISOString() });
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Password update failed', error: error.message });
  }
};

exports.uploadAdminPhoto = async (req, res) => {
  try {
    const { photoUrl, photoBase64 } = req.body;
    if (!photoUrl && !photoBase64) {
      return res.status(400).json({ message: 'Photo upload data is required' });
    }
    const profilePhoto = photoUrl || photoBase64;
    const user = await storage.updateUser(req.user._id, { profilePhoto, updatedAt: new Date().toISOString() });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Photo upload failed', error: error.message });
  }
};
