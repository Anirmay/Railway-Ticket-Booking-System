const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Train = require('../models/Train');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

function generateBookings(users, trains, count) {
  const seatPreferences = ['Window', 'Aisle', 'Middle'];
  const genders = ['Male', 'Female', 'Other'];
  const statuses = ['confirmed', 'cancelled', 'pending'];
  const bookingData = [];

  for (let i = 0; i < count; i += 1) {
    const user = users[i % users.length];
    const train = trains[i % trains.length];
    const seats = (i % 4) + 1;
    const amount = train.fare * seats;
    const status = statuses[i % statuses.length];
    const journeyOffset = (i % 30) - 5;
    const journeyDate = new Date(Date.now() + journeyOffset * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const createdAt = new Date(Date.now() - (i * 3600 * 1000 * 5)).toISOString();

    bookingData.push({
      user: user._id,
      train: train._id,
      trainName: train.name,
      passengerName: user.name,
      age: 20 + (i % 30),
      gender: genders[i % genders.length],
      seatPreference: seatPreferences[i % seatPreferences.length],
      seats,
      journeyDate,
      pnr: `PNR${10000 + i}`,
      amount,
      status,
      paymentStatus: status === 'pending' ? 'pending' : status === 'cancelled' ? 'refunded' : 'paid',
      coach: train.coach,
      seatNumber: `${10 + i}${['A', 'B', 'C', 'D'][i % 4]}`,
      createdAt,
    });
  }

  return bookingData;
}

function generatePayments(bookings) {
  const methods = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking'];
  return bookings.map((booking, index) => ({
    user: booking.user,
    booking: booking._id,
    pnr: booking.pnr,
    method: methods[index % methods.length],
    amount: booking.amount,
    transactionId: `TXN${120000 + index}`,
    status: booking.paymentStatus === 'paid' ? 'success' : booking.paymentStatus,
    createdAt: new Date(new Date(booking.createdAt).getTime() + 3600 * 1000).toISOString(),
  }));
}

async function ensureSeedData() {
  const adminExists = await User.findOne({ username: 'admin' });
  if (!adminExists) {
    const passwordHash = await bcrypt.hash('password123', 10);
    await User.create({
      name: 'Administrator',
      username: 'admin',
      email: 'admin@railease.com',
      phone: '0000000000',
      password: passwordHash,
      role: 'admin',
      status: 'active',
    });
  }

  const trainCount = await Train.countDocuments();
  if (trainCount === 0) {
    const userDocs = await User.find({ role: 'user' }).lean();
    const initialTrains = [
      { trainNumber: '12015', name: 'Rajdhani Express', source: 'Delhi', destination: 'Mumbai', departure: '08:00', arrival: '20:30', fare: 1865, seatsAvailable: 68, image: 'https://images.unsplash.com/photo-1516008623956-7b68f2f4d6b1?auto=format&fit=crop&w=900&q=80', route: 'Delhi → Jaipur → Ahmedabad → Mumbai', facilities: ['AC', 'WiFi', 'Food'], coach: 'A1' },
      { trainNumber: '12617', name: 'Shatabdi Superfast', source: 'Mumbai', destination: 'Pune', departure: '06:45', arrival: '09:20', fare: 820, seatsAvailable: 44, image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80', route: 'Mumbai → Thane → Pune', facilities: ['AC', 'Catering'], coach: 'B2' },
      { trainNumber: '12431', name: 'Garib Rath', source: 'Chennai', destination: 'Bengaluru', departure: '21:00', arrival: '04:30', fare: 940, seatsAvailable: 54, image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80', route: 'Chennai → Salem → Bengaluru', facilities: ['AC', 'Charging'], coach: 'C3' },
      { trainNumber: '12951', name: 'Duronto Express', source: 'Kolkata', destination: 'New Delhi', departure: '22:10', arrival: '08:55', fare: 1675, seatsAvailable: 61, image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80', route: 'Kolkata → Varanasi → New Delhi', facilities: ['AC', 'WiFi', 'Meal'], coach: 'D4' },
      { trainNumber: '20801', name: 'Vande Bharat', source: 'Hyderabad', destination: 'Vijayawada', departure: '05:50', arrival: '09:15', fare: 1100, seatsAvailable: 50, image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=900&q=80', route: 'Hyderabad → Warangal → Vijayawada', facilities: ['AC', 'WiFi'], coach: 'E5' },
    ];

    const createdTrains = await Train.insertMany(initialTrains);
    if (userDocs.length > 0) {
      const bookings = generateBookings(userDocs, createdTrains, 12);
      const createdBookings = await Booking.insertMany(bookings);
      await Payment.insertMany(generatePayments(createdBookings));
    }
  }
}

async function registerUser(payload) {
  const existingUser = await User.findOne({ $or: [{ username: payload.username }, { email: payload.email }] });
  if (existingUser) throw new Error('Username or email already exists');

  const user = await User.create({
    name: payload.name,
    username: payload.username,
    email: payload.email,
    phone: payload.phone,
    password: bcrypt.hashSync(payload.password, 10),
    role: 'user',
    status: 'active',
  });
  return user;
}

async function getUserById(id) {
  return User.findById(id);
}

async function getAllUsers() {
  return User.find({ role: 'user' }).sort({ createdAt: -1 });
}

async function authenticateUser(username, password) {
  const user = await User.findOne({ username });
  if (!user) return null;
  const ok = bcrypt.compareSync(password, user.password);
  return ok ? user : null;
}

async function updateUser(id, updates) {
  return User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
}

async function deleteUser(id) {
  await Promise.all([
    Booking.deleteMany({ user: id }),
    Payment.deleteMany({ user: id }),
    User.findByIdAndDelete(id),
  ]);
}

async function listTrains(query = {}) {
  const { source, destination } = query;
  const filter = {};
  if (source) filter.source = { $regex: source, $options: 'i' };
  if (destination) filter.destination = { $regex: destination, $options: 'i' };
  return Train.find(filter).sort({ createdAt: -1 });
}

async function getTrainById(id) {
  return Train.findById(id);
}

async function addTrain(payload) {
  const train = await Train.create({
    trainNumber: payload.trainNumber || `TR${Date.now()}`,
    name: payload.name,
    source: payload.source,
    destination: payload.destination,
    departure: payload.departure || '00:00',
    arrival: payload.arrival || '00:00',
    fare: payload.fare || 0,
    seatsAvailable: payload.seatsAvailable || 0,
    image: payload.image || '',
    route: payload.route || `${payload.source || ''} → ${payload.destination || ''}`,
    facilities: payload.facilities || [],
    coach: payload.coach || 'A1',
  });
  return train;
}

async function updateTrain(id, updates) {
  return Train.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
}

async function deleteTrain(id) {
  await Promise.all([
    Booking.deleteMany({ train: id }),
    Payment.deleteMany({ booking: { $in: await Booking.find({ train: id }).select('_id') } }),
    Train.findByIdAndDelete(id),
  ]);
}

async function createBooking(payload) {
  const booking = await Booking.create({
    ...payload,
    status: 'confirmed',
    paymentStatus: 'paid',
  });
  return booking;
}

async function listBookingsForUser(userId) {
  return Booking.find({ user: userId }).populate('user').populate('train').sort({ createdAt: -1 });
}

async function listAllBookings() {
  return Booking.find().populate('user').populate('train').sort({ createdAt: -1 });
}

async function updateBooking(id, updates) {
  return Booking.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
}

async function createPayment(payload) {
  const payment = await Payment.create({
    ...payload,
    status: 'success',
  });
  return payment;
}

async function listPaymentsForUser(userId) {
  return Payment.find({ user: userId }).populate('booking').sort({ createdAt: -1 });
}

async function listAllPayments() {
  return Payment.find().populate('user').populate('booking').sort({ createdAt: -1 });
}

async function getDashboardStats() {
  const [users, totalTrains, totalBookings, payments, todayBookings, cancelledTickets, pendingPayments, activeTrains] = await Promise.all([
    User.countDocuments({ role: 'user' }),
    Train.countDocuments(),
    Booking.countDocuments(),
    Payment.find(),
    Booking.countDocuments({ journeyDate: new Date().toISOString().split('T')[0] }),
    Booking.countDocuments({ status: 'cancelled' }),
    Payment.countDocuments({ status: 'pending' }),
    Train.countDocuments({ status: 'active' }),
  ]);

  const revenue = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const paymentsProcessed = payments.filter((payment) => payment.status === 'success').length;
  const refundRequests = payments.filter((payment) => payment.status === 'pending' || payment.status === 'failed').length;

  return {
    totalUsers: users,
    totalTrains,
    totalBookings,
    todayBookings,
    cancelledTickets,
    revenue,
    pendingPayments,
    activeTrains,
    paymentsProcessed,
    reportsGenerated: 1,
    refundRequests,
  };
}

async function getReports() {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  const monthly = {};
  bookings.forEach((booking) => {
    const month = new Date(booking.createdAt || Date.now()).toLocaleString('default', { month: 'short' });
    monthly[month] = (monthly[month] || 0) + 1;
  });
  return { bookings, monthly };
}

module.exports = {
  ensureSeedData,
  registerUser,
  authenticateUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  listTrains,
  getTrainById,
  addTrain,
  updateTrain,
  deleteTrain,
  createBooking,
  listBookingsForUser,
  listAllBookings,
  updateBooking,
  createPayment,
  listPaymentsForUser,
  listAllPayments,
  getDashboardStats,
  getReports,
};
