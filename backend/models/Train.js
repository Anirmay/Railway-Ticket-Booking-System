const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  fare: { type: Number, required: true },
  seatsAvailable: { type: Number, required: true },
  image: { type: String },
  route: { type: String },
  facilities: [{ type: String }],
  coach: { type: String, default: 'A1' },
}, { timestamps: true });

module.exports = mongoose.model('Train', trainSchema);
