const storage = require('../utils/storage');
const { randomUUID } = require('crypto');

exports.createBooking = async (req, res) => {
  try {
    const { trainId, passengerName, age, gender, seatPreference, seats, journeyDate } = req.body;
    const train = storage.getTrainById(trainId);
    if (!train) return res.status(404).json({ message: 'Train not found' });
    if (train.seatsAvailable < Number(seats)) return res.status(400).json({ message: 'Not enough seats available' });

    const pnr = `PNR${randomUUID().slice(0, 8).toUpperCase()}`;
    const amount = train.fare * Number(seats);
    const booking = storage.createBooking({
      user: req.user._id,
      train: train._id,
      passengerName,
      age,
      gender,
      seatPreference,
      seats: Number(seats),
      journeyDate,
      pnr,
      amount,
      coach: train.coach,
      seatNumber: `${Math.floor(Math.random() * 20) + 1}${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}`,
      trainName: train.name,
      source: train.source,
      destination: train.destination,
    });

    train.seatsAvailable -= Number(seats);
    storage.updateTrain(train._id, { seatsAvailable: train.seatsAvailable });

    const payment = storage.createPayment({
      user: req.user._id,
      booking: booking._id,
      method: 'UPI',
      amount,
      transactionId: `TXN${randomUUID().slice(0, 8).toUpperCase()}`,
    });

    res.status(201).json({ booking, payment });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = storage.listBookingsForUser(req.user._id);
    const trains = storage.loadState().trains;
    const enriched = bookings.map((booking) => ({ ...booking, train: trains.find((train) => train._id === booking.train) }));
    res.json(enriched);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = storage.updateBooking(req.params.id, { status: 'cancelled' });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(500).json({ message: 'Cancellation failed', error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = storage.listAllBookings();
    const users = storage.loadState().users;
    const trains = storage.loadState().trains;
    const enriched = bookings.map((booking) => ({ ...booking, user: users.find((user) => user._id === booking.user), train: trains.find((train) => train._id === booking.train) }));
    res.json(enriched);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all bookings', error: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = storage.updateBooking(req.params.id, { status: req.body.status || undefined, paymentStatus: req.body.paymentStatus || undefined });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update booking', error: error.message });
  }
};
