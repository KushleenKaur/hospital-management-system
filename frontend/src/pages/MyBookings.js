import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Alert, CircularProgress, Box, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { doctors } from '../utils/doctors';

const MyBookings = () => {
  const navigate = useNavigate();
  const userPhone = localStorage.getItem('userPhone');

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userPhone || localStorage.getItem('userRole') !== 'patient') {
      navigate('/login?role=patient');
      return;
    }

    axios.get(`http://localhost:8080/api/appointments/phone/${encodeURIComponent(userPhone)}`)
      .then(res => setBookings(res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [navigate, userPhone]);

  return (
    <Container maxWidth="md" sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h3" fontWeight={700} color="#1a73e8" gutterBottom align="center">
        My Bookings
      </Typography>
      
      {loading ? <CircularProgress sx={{ mt: 4 }} /> : bookings.length === 0 ? 
        <Alert severity="info" sx={{ mt: 4 }}>No appointments found linked to your phone number.</Alert> : (
        <Box sx={{ width: '100%', mt: 4 }}>
          <Grid container spacing={3} justifyContent="center" direction="column" alignItems="center">
            {bookings.map(b => (
              <Grid item xs={12} sx={{ width: '100%', maxWidth: 600 }} key={b.id}>
                 <Card sx={{ borderRadius: 3, borderLeft: '6px solid #34a853', boxShadow: 2, width: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={600} color="primary" gutterBottom>
                       Doctor: {doctors.find(d => d.id === b.doctorId)?.name || `ID: ${b.doctorId}`}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      <strong>Patient:</strong> {b.patientName} &nbsp; | &nbsp; <strong>Date:</strong> {b.date} &nbsp; | &nbsp; <strong>Time:</strong> {b.time}
                    </Typography>
                    <Typography variant="body1" sx={{ bgcolor: '#f4f6f8', p: 2, borderRadius: 2 }}>
                      <strong>Reason:</strong> {b.reason}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default MyBookings;