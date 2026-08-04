const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dataFile = path.join(__dirname, '../data/app-data.json');
let state = null;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function formatDate(offsetDays) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
}

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
    const journeyDate = formatDate(journeyOffset);
    const createdAt = new Date(Date.now() - (i * 3600 * 1000 * 5)).toISOString();

    bookingData.push({
      _id: createId('booking'),
      user: user._id,
      train: train._id,
      trainName: train.name,
      passengerName: user.name,
      age: 20 + (i % 30),
      gender: randomItem(genders),
      seatPreference: randomItem(seatPreferences),
      seats,
      journeyDate,
      pnr: `PNR${10000 + i}`,
      amount,
      status,
      paymentStatus: status === 'pending' ? 'pending' : status === 'cancelled' ? 'refunded' : 'paid',
      coach: train.coach,
      seatNumber: `${10 + i}${['A','B','C','D'][i % 4]}`,
      createdAt,
    });
  }

  return bookingData;
}

function generatePayments(bookings) {
  const methods = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking'];
  const statuses = ['success', 'pending', 'failed'];
  return bookings.map((booking, index) => ({
    _id: createId('payment'),
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

function buildDefaultState() {
  const passwordHash = bcrypt.hashSync('password123', 10);
  const users = [
    { _id: 'user-admin', name: 'Administrator', username: 'admin', email: 'admin@railease.com', phone: '0000000000', password: passwordHash, role: 'admin', status: 'active', createdAt: formatDate(-365) },
    { _id: 'user-2', name: 'Meera Rao', username: 'meera', email: 'meera@example.com', phone: '9876543211', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-270) },
    { _id: 'user-3', name: 'Rohan Verma', username: 'rohan', email: 'rohan@example.com', phone: '9876543212', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-260) },
    { _id: 'user-4', name: 'Sneha Kulkarni', username: 'sneha', email: 'sneha@example.com', phone: '9876543213', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-240) },
    { _id: 'user-5', name: 'Karthik Nair', username: 'karthik', email: 'karthik@example.com', phone: '9876543214', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-220) },
    { _id: 'user-6', name: 'Pooja Singh', username: 'pooja', email: 'pooja@example.com', phone: '9876543215', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-210) },
    { _id: 'user-7', name: 'Ankit Rao', username: 'ankit', email: 'ankit@example.com', phone: '9876543216', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-200) },
    { _id: 'user-8', name: 'Divya Patel', username: 'divya', email: 'divya@example.com', phone: '9876543217', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-180) },
    { _id: 'user-9', name: 'Nikhil Agarwal', username: 'nikhil', email: 'nikhil@example.com', phone: '9876543218', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-160) },
    { _id: 'user-10', name: 'Ishita Bose', username: 'ishita', email: 'ishita@example.com', phone: '9876543219', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-150) },
    { _id: 'user-11', name: 'Aarav Patel', username: 'aarav', email: 'aarav@example.com', phone: '9876543220', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-130) },
    { _id: 'user-12', name: 'Tanya Sharma', username: 'tanya', email: 'tanya@example.com', phone: '9876543221', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-120) },
    { _id: 'user-13', name: 'Vivek Singh', username: 'vivek', email: 'vivek@example.com', phone: '9876543222', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-110) },
    { _id: 'user-14', name: 'Neha Gupta', username: 'neha', email: 'neha@example.com', phone: '9876543223', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-100) },
    { _id: 'user-15', name: 'Arjun Malhotra', username: 'arjun', email: 'arjun@example.com', phone: '9876543224', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-90) },
    { _id: 'user-16', name: 'Sanya Mehta', username: 'sanya', email: 'sanya@example.com', phone: '9876543225', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-80) },
    { _id: 'user-17', name: 'Harsh Vyas', username: 'harsh', email: 'harsh@example.com', phone: '9876543226', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-70) },
    { _id: 'user-18', name: 'Rhea Kapoor', username: 'rhea', email: 'rhea@example.com', phone: '9876543227', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-60) },
    { _id: 'user-19', name: 'Manav Joshi', username: 'manav', email: 'manav@example.com', phone: '9876543228', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-50) },
    { _id: 'user-20', name: 'Priya Desai', username: 'priya', email: 'priya@example.com', phone: '9876543229', password: passwordHash, role: 'user', status: 'active', createdAt: formatDate(-40) },
  ];

  const trains = [
    { _id: 'train-1', trainNumber: '12015', name: 'Rajdhani Express', source: 'Delhi', destination: 'Mumbai', departure: '08:00', arrival: '20:30', fare: 1865, seatsAvailable: 68, status: 'active', image: 'https://images.unsplash.com/photo-1516008623956-7b68f2f4d6b1?auto=format&fit=crop&w=900&q=80', route: 'Delhi → Jaipur → Ahmedabad → Mumbai', facilities: ['AC', 'WiFi', 'Food'], coach: 'A1' },
    { _id: 'train-2', trainNumber: '12617', name: 'Shatabdi Superfast', source: 'Mumbai', destination: 'Pune', departure: '06:45', arrival: '09:20', fare: 820, seatsAvailable: 44, status: 'active', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80', route: 'Mumbai → Thane → Pune', facilities: ['AC', 'Catering'], coach: 'B2' },
    { _id: 'train-3', trainNumber: '12431', name: 'Garib Rath', source: 'Chennai', destination: 'Bengaluru', departure: '21:00', arrival: '04:30', fare: 940, seatsAvailable: 54, status: 'active', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80', route: 'Chennai → Salem → Bengaluru', facilities: ['AC', 'Charging'], coach: 'C3' },
    { _id: 'train-4', trainNumber: '12951', name: 'Duronto Express', source: 'Kolkata', destination: 'New Delhi', departure: '22:10', arrival: '08:55', fare: 1675, seatsAvailable: 61, status: 'active', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80', route: 'Kolkata → Varanasi → New Delhi', facilities: ['AC', 'WiFi', 'Meal'], coach: 'D4' },
    { _id: 'train-5', trainNumber: '20801', name: 'Vande Bharat', source: 'Hyderabad', destination: 'Vijayawada', departure: '05:50', arrival: '09:15', fare: 1100, seatsAvailable: 50, status: 'active', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=900&q=80', route: 'Hyderabad → Warangal → Vijayawada', facilities: ['AC', 'WiFi'], coach: 'E5' },
    { _id: 'train-6', trainNumber: '11013', name: 'Swarna Jayanti', source: 'Bengaluru', destination: 'Howrah', departure: '14:20', arrival: '08:10', fare: 1480, seatsAvailable: 57, status: 'active', image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80', route: 'Bengaluru → Vijayawada → Howrah', facilities: ['AC', 'Food'], coach: 'F6' },
    { _id: 'train-7', trainNumber: '12295', name: 'Jan Shatabdi', source: 'Ahmedabad', destination: 'Jaipur', departure: '07:10', arrival: '12:45', fare: 760, seatsAvailable: 49, status: 'active', image: 'https://images.unsplash.com/photo-1469307592270-0f5b7a8ff2b1?auto=format&fit=crop&w=900&q=80', route: 'Ahmedabad → Udaipur → Jaipur', facilities: ['AC', 'Catering'], coach: 'G7' },
    { _id: 'train-8', trainNumber: '12859', name: 'Karnavati Express', source: 'Surat', destination: 'Delhi', departure: '19:40', arrival: '10:35', fare: 1325, seatsAvailable: 63, status: 'active', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80', route: 'Surat → Vadodara → Delhi', facilities: ['AC', 'WiFi', 'Food'], coach: 'H8' },
    { _id: 'train-9', trainNumber: '16587', name: 'Mysuru Express', source: 'Mysuru', destination: 'Chennai', departure: '18:50', arrival: '05:40', fare: 915, seatsAvailable: 46, status: 'active', image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=900&q=80', route: 'Mysuru → Bengaluru → Chennai', facilities: ['AC', 'Charging'], coach: 'I9' },
    { _id: 'train-10', trainNumber: '12365', name: 'Paschim Express', source: 'Lucknow', destination: 'Kanpur', departure: '16:15', arrival: '19:05', fare: 690, seatsAvailable: 40, status: 'active', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80', route: 'Lucknow → Kanpur', facilities: ['AC', 'Food'], coach: 'J10' },
    { _id: 'train-11', trainNumber: '12455', name: 'Kanyakumari Express', source: 'Chennai', destination: 'Trivandrum', departure: '11:30', arrival: '23:50', fare: 980, seatsAvailable: 45, status: 'active', image: 'https://images.unsplash.com/photo-1512303452021-8a2d9947c5bd?auto=format&fit=crop&w=900&q=80', route: 'Chennai → Madurai → Trivandrum', facilities: ['AC', 'Meal'], coach: 'K1' },
    { _id: 'train-12', trainNumber: '22691', name: 'Bangalore Rajdhani', source: 'Bengaluru', destination: 'New Delhi', departure: '20:15', arrival: '08:30', fare: 1840, seatsAvailable: 38, status: 'active', image: 'https://images.unsplash.com/photo-1518977956813-3534f35923c8?auto=format&fit=crop&w=900&q=80', route: 'Bengaluru → Nagpur → Delhi', facilities: ['AC', 'WiFi', 'Food'], coach: 'L2' },
    { _id: 'train-13', trainNumber: '12565', name: 'Humsafar Express', source: 'Delhi', destination: 'Agra', departure: '09:30', arrival: '13:45', fare: 650, seatsAvailable: 35, status: 'active', image: 'https://images.unsplash.com/photo-1530050776332-2255f5df8527?auto=format&fit=crop&w=900&q=80', route: 'Delhi → Mathura → Agra', facilities: ['AC', 'WiFi'], coach: 'M3' },
    { _id: 'train-14', trainNumber: '15651', name: 'Coastal Express', source: 'Mumbai', destination: 'Goa', departure: '14:50', arrival: '22:10', fare: 900, seatsAvailable: 42, status: 'active', image: 'https://images.unsplash.com/photo-1521120098177-76b0aee2b94f?auto=format&fit=crop&w=900&q=80', route: 'Mumbai → Ratnagiri → Goa', facilities: ['AC', 'Food'], coach: 'P4' },
    { _id: 'train-15', trainNumber: '16112', name: 'Tamil Nadu Express', source: 'Chennai', destination: 'New Delhi', departure: '20:00', arrival: '10:30', fare: 1750, seatsAvailable: 25, status: 'active', image: 'https://images.unsplash.com/photo-1499933374294-4584851497d2?auto=format&fit=crop&w=900&q=80', route: 'Chennai → Vijayawada → Delhi', facilities: ['AC', 'Charging'], coach: 'T5' },
  ];

  const bookings = generateBookings(users.filter((user) => user.role === 'user'), trains, 50);
  const payments = generatePayments(bookings);

  return {
    users,
    trains,
    bookings,
    payments,
  };
}

function loadState() {
  if (state) return state;
  if (fs.existsSync(dataFile)) {
    state = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  } else {
    state = buildDefaultState();
    saveState();
  }

  ensureDefaultAdmin();
  ensureDemoData();
  return state;
}

function ensureDefaultAdmin() {
  const currentState = getState();
  const adminUser = currentState.users.find((user) => user.username === 'admin');
  const defaultAdminData = {
    name: 'Anirmay Khan',
    email: 'admin@railease.com',
    phone: '+91 8367833266',
    role: 'admin',
    status: 'active',
    department: 'Railway Administration',
    profilePhoto: '',
    address: 'RailEase Headquarters',
    city: 'Bardhaman',
    state: 'West Bengal',
    country: 'India',
    pinCode: '713101',
    employeeId: 'ADM-1001',
    memberSince: 'January 2026',
    lastLogin: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notifications: {
      booking: true,
      payment: true,
      userRegistration: true,
      refund: true,
      reports: true,
      email: true,
    },
  };

  if (!adminUser) {
    const passwordHash = bcrypt.hashSync('admin123', 10);
    currentState.users.push({
      _id: createId('user'),
      username: 'admin',
      password: passwordHash,
      createdAt: formatDate(-365),
      ...defaultAdminData,
    });
    saveState();
    return;
  }

  let updated = false;
  Object.entries(defaultAdminData).forEach(([key, value]) => {
    if (adminUser[key] === undefined || adminUser[key] === null) {
      adminUser[key] = value;
      updated = true;
    }
  });
  if (updated) saveState();
}

function ensureDemoData() {
  const currentState = getState();
  if (currentState.bookings.length === 0 && currentState.payments.length === 0) {
    const users = currentState.users.filter((user) => user.role === 'user');
    const bookings = generateBookings(users, currentState.trains, 50);
    const payments = generatePayments(bookings);
    currentState.bookings = bookings;
    currentState.payments = payments;
    saveState();
  }
}

function saveState() {
  fs.writeFileSync(dataFile, JSON.stringify(state, null, 2));
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function getState() {
  return loadState();
}

async function registerUser(payload) {
  const currentState = getState();
  if (currentState.users.some((user) => user.username === payload.username || user.email === payload.email)) {
    throw new Error('Username or email already exists');
  }
  const user = {
    _id: createId('user'),
    name: payload.name,
    username: payload.username,
    email: payload.email,
    phone: payload.phone,
    password: bcrypt.hashSync(payload.password, 10),
    role: 'user',
    status: 'active',
  };
  currentState.users.push(user);
  saveState();
  return user;
}

function getUserById(id) {
  return getState().users.find((user) => user._id === id);
}

function getUserByUsername(username) {
  return getState().users.find((user) => user.username === username);
}

function getAllUsers() {
  return getState().users.filter((user) => user.role === 'user');
}

async function authenticateUser(username, password) {
  const user = getUserByUsername(username);
  if (!user) return null;
  const ok = bcrypt.compareSync(password, user.password);
  return ok ? user : null;
}

function updateUser(id, updates) {
  const currentState = getState();
  const user = currentState.users.find((entry) => entry._id === id);
  if (!user) return null;
  Object.assign(user, updates);
  saveState();
  return user;
}

function deleteUser(id) {
  const currentState = getState();
  currentState.users = currentState.users.filter((user) => user._id !== id);
  saveState();
}

function listTrains(query = {}) {
  const { source, destination } = query;
  return getState().trains.filter((train) => {
    const sourceMatch = !source || train.source.toLowerCase().includes(source.toLowerCase());
    const destMatch = !destination || train.destination.toLowerCase().includes(destination.toLowerCase());
    return sourceMatch && destMatch;
  });
}

function getTrainById(id) {
  return getState().trains.find((train) => train._id === id);
}

function addTrain(payload) {
  const currentState = getState();
  const train = { _id: createId('train'), ...payload };
  currentState.trains.push(train);
  saveState();
  return train;
}

function updateTrain(id, updates) {
  const currentState = getState();
  const train = currentState.trains.find((entry) => entry._id === id);
  if (!train) return null;
  Object.assign(train, updates);
  saveState();
  return train;
}

function deleteTrain(id) {
  const currentState = getState();
  currentState.trains = currentState.trains.filter((train) => train._id !== id);
  saveState();
}

function createBooking(payload) {
  const currentState = getState();
  const booking = {
    _id: createId('booking'),
    ...payload,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: new Date().toISOString(),
  };
  currentState.bookings.push(booking);
  saveState();
  return booking;
}

function listBookingsForUser(userId) {
  return getState().bookings.filter((booking) => booking.user === userId);
}

function listAllBookings() {
  return getState().bookings;
}

function updateBooking(id, updates) {
  const currentState = getState();
  const booking = currentState.bookings.find((entry) => entry._id === id);
  if (!booking) return null;
  Object.assign(booking, updates);
  saveState();
  return booking;
}

function createPayment(payload) {
  const currentState = getState();
  const payment = {
    _id: createId('payment'),
    ...payload,
    status: 'success',
    createdAt: new Date().toISOString(),
  };
  currentState.payments.push(payment);
  saveState();
  return payment;
}

function listPaymentsForUser(userId) {
  return getState().payments.filter((payment) => payment.user === userId);
}

function listAllPayments() {
  return getState().payments;
}

function getDashboardStats() {
  const currentState = getState();
  const users = currentState.users.filter((user) => user.role === 'user');
  const bookings = currentState.bookings;
  const payments = currentState.payments;
  const today = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter((booking) => booking.journeyDate === today).length;
  const cancelledTickets = bookings.filter((booking) => booking.status === 'cancelled').length;
  const pendingPayments = payments.filter((payment) => payment.status === 'pending').length;
  const activeTrains = currentState.trains.filter((train) => train.status === 'active').length;
  const revenue = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const paymentsProcessed = payments.filter((payment) => payment.status === 'success').length;
  const reportsGenerated = Object.keys(getReports().monthly).length;
  const refundRequests = payments.filter((payment) => payment.status === 'pending' || payment.status === 'failed').length;
  return {
    totalUsers: users.length,
    totalTrains: currentState.trains.length,
    totalBookings: bookings.length,
    todayBookings,
    cancelledTickets,
    revenue,
    pendingPayments,
    activeTrains,
    paymentsProcessed,
    reportsGenerated,
    refundRequests,
  };
}

function getReports() {
  const currentState = getState();
  const monthly = {};
  currentState.bookings.forEach((booking) => {
    const month = new Date(booking.createdAt || Date.now()).toLocaleString('default', { month: 'short' });
    monthly[month] = (monthly[month] || 0) + 1;
  });
  return { bookings: currentState.bookings, monthly };
}

module.exports = {
  loadState,
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
