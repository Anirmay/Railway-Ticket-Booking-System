const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const storage = require('../utils/storage');

exports.register = async (req, res) => {
  try {
    const { name, username, email, phone, password, confirmPassword } = req.body;
    if (!name || !username || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });
    if (password.length < 6) return res.status(400).json({ message: 'Password should be at least 6 characters' });

    const user = await storage.registerUser({ name, username, email, phone, password });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'railway-secret', { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });

    const user = await storage.authenticateUser(username, password);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.status === 'suspended') return res.status(403).json({ message: 'Account suspended' });
    if (user.role !== 'user') return res.status(403).json({ message: 'Please use the Admin Login page.' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'railway-secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });

    const user = await storage.authenticateUser(username, password);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.status === 'suspended') return res.status(403).json({ message: 'Account suspended' });
    if (user.role !== 'admin') return res.status(403).json({ message: 'Access Denied. You are not an administrator.' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'railway-secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  res.json(req.user);
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) updates.password = await bcrypt.hash(updates.password, 10);
    const user = await storage.updateUser(req.user._id, updates);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Profile update failed', error: error.message });
  }
};
