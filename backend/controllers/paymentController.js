const storage = require('../utils/storage');

exports.createPayment = async (req, res) => {
  try {
    const payment = await storage.createPayment({ ...req.body, user: req.user._id });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await storage.listPaymentsForUser(req.user._id);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments', error: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await storage.listAllPayments();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments', error: error.message });
  }
};
