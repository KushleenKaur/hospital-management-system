import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, MenuItem, Typography, Alert, Box, CircularProgress, Card } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';

import { doctors } from '../utils/doctors';

const BookAppointment = () => {
  const navigate = useNavigate();
  const userPhone = localStorage.getItem('userPhone') || '';

  useEffect(() => {
    if (!userPhone || localStorage.getItem('userRole') !== 'patient') {
      navigate('/login?role=patient');
    }
  }, [navigate, userPhone]);

  const [form, setForm] = useState({
    patientName: '',
    phoneNumber: userPhone,
    doctorId: '',
    date: dayjs(),
    time: '10:00',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async () => {
    if (!form.patientName || !form.phoneNumber || !form.doctorId || !form.reason) {
      setMessage({ type: 'error', text: 'Please fill all required fields' });
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/appointments', {
        patientName: form.patientName,
        phoneNumber: form.phoneNumber,
        doctorId: Number(form.doctorId),
        date: form.date.format('YYYY-MM-DD'),
        time: form.time,
        reason: form.reason
      });

      setMessage({ type: 'success', text: 'Appointment booked successfully!' });

      setForm({
        ...form,
        patientName: '',
        doctorId: '',
        date: dayjs(),
        time: '10:00',
        reason: ''
      });

    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to book. Check backend/CORS' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 10 }}>
      <Typography variant="h3" fontWeight={700} color="primary" align="center" gutterBottom>
        Book Appointment
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" mb={4}>
        Fill in the details below to schedule your visit.
      </Typography>

      <Card sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, boxShadow: '0 12px 32px rgba(0,0,0,0.05)' }}>
        {message && <Alert severity={message.type} sx={{ mb: 3, borderRadius: 2 }}>{message.text}</Alert>}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Patient Full Name"
            fullWidth
            value={form.patientName}
            onChange={e => setForm({ ...form, patientName: e.target.value })}
            required
          />

          <TextField
            label="Phone Number"
            fullWidth
            value={form.phoneNumber}
            disabled
            required
            helperText="Bound to your logged-in account."
          />

          <TextField
            select
            label="Select Doctor"
            fullWidth
            value={form.doctorId}
            onChange={e => setForm({ ...form, doctorId: e.target.value })}
            required
          >
            {doctors.map(doc => (
              <MenuItem key={doc.id} value={doc.id}>{doc.name} — {doc.specialty}</MenuItem>
            ))}
          </TextField>

          <DatePicker
            label="Appointment Date"
            value={form.date}
            onChange={newValue => newValue && setForm({ ...form, date: newValue })}
            sx={{ width: '100%' }}
          />

          <TextField
            select
            label="Preferred Time"
            fullWidth
            value={form.time}
            onChange={e => setForm({ ...form, time: e.target.value })}
          >
            {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>

          <TextField
            label="Reason for Visit"
            multiline
            rows={4}
            fullWidth
            value={form.reason}
            onChange={e => setForm({ ...form, reason: e.target.value })}
            required
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ py: 1.5, mt: 2, fontSize: '1.1rem', borderRadius: 3 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirm Appointment'}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default BookAppointment;