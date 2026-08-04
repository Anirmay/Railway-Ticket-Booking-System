const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },
  passengerName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  seatPreference: { type: String, required: true },
  seats: { type: Number, required: true },
  journeyDate: { type: String, required: true },
  pnr: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'cancelled', 'pending'], default: 'confirmed' },
  paymentStatus: { type: String, enum: ['paid', 'pending'], default: 'paid' },
  coach: { type: String, default: 'A1' },
  seatNumber: { type: String, default: '12A' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
