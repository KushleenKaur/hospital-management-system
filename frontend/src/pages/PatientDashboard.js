import React, { useEffect } from 'react';
import { Container, Typography, Button, Box, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ListAltIcon from '@mui/icons-material/ListAlt';

const PatientDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('userPhone') || localStorage.getItem('userRole') !== 'patient') {
      navigate('/login?role=patient');
    }
  }, [navigate]);

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 10 }}>
      <Typography variant="h3" align="center" fontWeight={700} color="primary" gutterBottom>
        Patient Portal
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" mb={6}>
        Manage your healthcare journey easily.
      </Typography>
      
      <Box sx={{ mt: 6, display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Card sx={{ width: 340, textAlign: 'center', p: 4, borderRadius: 5, transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 16px 30px rgba(0,0,0,0.1)' } }}>
          <Box sx={{ bgcolor: '#ebf2fa', width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <CalendarTodayIcon sx={{ fontSize: 40, color: '#1a73e8' }} />
          </Box>
          <Typography variant="h5" fontWeight={600} gutterBottom>Book Appointment</Typography>
          <Typography color="text.secondary" mb={4}>Schedule a visit with our top specialists.</Typography>
          <Button variant="contained" fullWidth size="large" onClick={() => navigate('/book-appointment')} sx={{ borderRadius: 3, py: 1.5 }}>
            Book Now
          </Button>
        </Card>

        <Card sx={{ width: 340, textAlign: 'center', p: 4, borderRadius: 5, transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 16px 30px rgba(0,0,0,0.1)' } }}>
          <Box sx={{ bgcolor: '#e6f4ea', width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <ListAltIcon sx={{ fontSize: 40, color: '#34a853' }} />
          </Box>
          <Typography variant="h5" fontWeight={600} gutterBottom>View My Bookings</Typography>
          <Typography color="text.secondary" mb={4}>Check your upcoming and past appointments.</Typography>
          <Button variant="outlined" color="secondary" fullWidth size="large" onClick={() => navigate('/my-bookings')} sx={{ borderRadius: 3, py: 1.5, borderWidth: 2, '&:hover': { borderWidth: 2 } }}>
            View Bookings
          </Button>
        </Card>
      </Box>
    </Container>
  );
};

export default PatientDashboard;