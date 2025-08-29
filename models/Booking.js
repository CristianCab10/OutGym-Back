const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  classType: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  userId: { type: String }
});

BookingSchema.index({ classType: 1, date: 1, time: 1 });

module.exports = mongoose.model('Booking', BookingSchema);
