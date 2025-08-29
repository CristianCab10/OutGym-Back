const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');


router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ message: 'Error al obtener las reservas' });
  }
});


router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).sort({ date: 1, time: 1 });
    res.json({ bookings });
  } catch (error) {
    console.error('Error al obtener reservas por usuario:', error);
    res.status(500).json({ message: 'Error al obtener las reservas del usuario' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { classType, date, time, name, email, userId } = req.body;

    const existingBookings = await Booking.countDocuments({ classType, date, time });

    if (existingBookings >= 20) {
      return res.status(400).json({ message: 'Cupo completo para esta clase' });
    }

    const newBooking = new Booking({ classType, date, time, name, email, userId });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ message: 'Error al crear la reserva' });
  }
});


router.get('/count', async (req, res) => {
  try {
    const { classType, date, time } = req.query;
    const count = await Booking.countDocuments({ classType, date, time });
    res.json({ count });
  } catch (error) {
    console.error('Error al contar reservas:', error);
    res.status(500).json({ message: 'Error al contar las reservas' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const result = await Booking.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send('No encontrado');
    res.send('Eliminado');
  } catch (error) {
    console.error('Error al eliminar reserva:', error);
    res.status(500).send('Error al eliminar reserva');
  }
});

module.exports = router;
