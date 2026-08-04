const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Train = require('../models/Train');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/railway-db');
  await Promise.all([User.deleteMany(), Train.deleteMany(), Booking.deleteMany(), Payment.deleteMany()]);

  const hashedPassword = await bcrypt.hash('password123', 10);
  const users = await User.insertMany([
    { name: 'Administrator', username: 'admin', email: 'admin@railease.com', phone: '0000000000', password: hashedPassword, role: 'admin' },
    { name: 'Meera Rao', username: 'meera', email: 'meera@example.com', phone: '9876543211', password: hashedPassword, role: 'user' },
    { name: 'Rohan Verma', username: 'rohan', email: 'rohan@example.com', phone: '9876543212', password: hashedPassword, role: 'user' },
    { name: 'Sneha Kulkarni', username: 'sneha', email: 'sneha@example.com', phone: '9876543213', password: hashedPassword, role: 'user' },
    { name: 'Karthik Nair', username: 'karthik', email: 'karthik@example.com', phone: '9876543214', password: hashedPassword, role: 'user' },
    { name: 'Pooja Singh', username: 'pooja', email: 'pooja@example.com', phone: '9876543215', password: hashedPassword, role: 'user' },
    { name: 'Ankit Rao', username: 'ankit', email: 'ankit@example.com', phone: '9876543216', password: hashedPassword, role: 'user' },
    { name: 'Divya Patel', username: 'divya', email: 'divya@example.com', phone: '9876543217', password: hashedPassword, role: 'user' },
    { name: 'Nikhil Agarwal', username: 'nikhil', email: 'nikhil@example.com', phone: '9876543218', password: hashedPassword, role: 'user' },
    { name: 'Ishita Bose', username: 'ishita', email: 'ishita@example.com', phone: '9876543219', password: hashedPassword, role: 'user' },
  ]);

  const trains = await Train.insertMany([
    { trainNumber: '12015', name: 'Rajdhani Express', source: 'Delhi', destination: 'Mumbai', departure: '08:00', arrival: '20:30', fare: 1865, seatsAvailable: 68, image: 'https://images.unsplash.com/photo-1516008623956-7b68f2f4d6b1?auto=format&fit=crop&w=900&q=80', route: 'Delhi → Jaipur → Ahmedabad → Mumbai', facilities: ['AC', 'WiFi', 'Food'], coach: 'A1' },
    { trainNumber: '12617', name: 'Shatabdi Superfast', source: 'Mumbai', destination: 'Pune', departure: '06:45', arrival: '09:20', fare: 820, seatsAvailable: 44, image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80', route: 'Mumbai → Thane → Pune', facilities: ['AC', 'Catering'], coach: 'B2' },
    { trainNumber: '12431', name: 'Garib Rath', source: 'Chennai', destination: 'Bengaluru', departure: '21:00', arrival: '04:30', fare: 940, seatsAvailable: 54, image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80', route: 'Chennai → Salem → Bengaluru', facilities: ['AC', 'Charging'], coach: 'C3' },
    { trainNumber: '12951', name: 'Duronto Express', source: 'Kolkata', destination: 'New Delhi', departure: '22:10', arrival: '08:55', fare: 1675, seatsAvailable: 61, image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80', route: 'Kolkata → Varanasi → New Delhi', facilities: ['AC', 'WiFi', 'Meal'], coach: 'D4' },
    { trainNumber: '20801', name: 'Vande Bharat', source: 'Hyderabad', destination: 'Vijayawada', departure: '05:50', arrival: '09:15', fare: 1100, seatsAvailable: 50, image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=900&q=80', route: 'Hyderabad → Warangal → Vijayawada', facilities: ['AC', 'WiFi'], coach: 'E5' },
    { trainNumber: '11013', name: 'Swarna Jayanti', source: 'Bengaluru', destination: 'Howrah', departure: '14:20', arrival: '08:10', fare: 1480, seatsAvailable: 57, image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80', route: 'Bengaluru → Vijayawada → Howrah', facilities: ['AC', 'Food'], coach: 'F6' },
    { trainNumber: '12295', name: 'Jan Shatabdi', source: 'Ahmedabad', destination: 'Jaipur', departure: '07:10', arrival: '12:45', fare: 760, seatsAvailable: 49, image: 'https://images.unsplash.com/photo-1469307592270-0f5b7a8ff2b1?auto=format&fit=crop&w=900&q=80', route: 'Ahmedabad → Udaipur → Jaipur', facilities: ['AC', 'Catering'], coach: 'G7' },
    { trainNumber: '12859', name: 'Karnavati Express', source: 'Surat', destination: 'Delhi', departure: '19:40', arrival: '10:35', fare: 1325, seatsAvailable: 63, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80', route: 'Surat → Vadodara → Delhi', facilities: ['AC', 'WiFi', 'Food'], coach: 'H8' },
    { trainNumber: '16587', name: 'Mysuru Express', source: 'Mysuru', destination: 'Chennai', departure: '18:50', arrival: '05:40', fare: 915, seatsAvailable: 46, image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=900&q=80', route: 'Mysuru → Bengaluru → Chennai', facilities: ['AC', 'Charging'], coach: 'I9' },
    { trainNumber: '12365', name: 'Paschim Express', source: 'Lucknow', destination: 'Kanpur', departure: '16:15', arrival: '19:05', fare: 690, seatsAvailable: 40, image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80', route: 'Lucknow → Kanpur', facilities: ['AC', 'Food'], coach: 'J10' },
  ]);

  const bookings = [];
  for (let i = 0; i < 20; i += 1) {
    const train = trains[i % trains.length];
    const user = users[(i % (users.length - 1)) + 1];
    const amount = train.fare * (i % 3 + 1);
    const booking = {
      user: user._id,
      train: train._id,
      passengerName: user.name,
      age: 25 + (i % 10),
      gender: i % 2 === 0 ? 'Female' : 'Male',
      seatPreference: i % 2 === 0 ? 'Window' : 'Aisle',
      seats: (i % 3) + 1,
      journeyDate: '2026-08-20',
      pnr: `PNR${1000 + i}`,
      amount,
      status: i % 4 === 0 ? 'cancelled' : 'confirmed',
      paymentStatus: 'paid',
      coach: train.coach,
      seatNumber: `${10 + i}A`,
    };
    bookings.push(booking);
  }

  const createdBookings = await Booking.insertMany(bookings);
  await Payment.insertMany(createdBookings.map((booking, index) => ({
    user: booking.user,
    booking: booking._id,
    method: index % 2 === 0 ? 'UPI' : 'Credit Card',
    amount: booking.amount,
    transactionId: `TXN${10000 + index}`,
    status: 'success',
  })));

  console.log('Seed completed');
  mongoose.disconnect();
};

seed().catch((err) => console.error(err));
