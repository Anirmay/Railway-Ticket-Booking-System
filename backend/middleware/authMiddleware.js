const jwt = require('jsonwebtoken');
const storage = require('../utils/storage');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'railway-secret');
    const user = await storage.getUserById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    req.user = { ...user.toObject(), password: undefined };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
