import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Alert, CircularProgress, Box, Grid, CardActionArea, Divider, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { doctors } from '../utils/doctors';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  
  // Dashboard state
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Dialog / PIN state
  const [pinDialogOpen, setPinDialogOpen] = useState(false);
  const [targetDoctor, setTargetDoctor] = useState(null);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  useEffect(() => {
    // Stage 1 Auth Gate: Ensure they passed the Universal PIN
    if (localStorage.getItem('userRole') !== 'doctor') {
      navigate('/login?role=doctor');
    }
  }, [navigate]);

  const handleDoctorClick = (doc) => {
    setTargetDoctor(doc);
    setPinInput('');
    setPinError('');
    setPinDialogOpen(true);
  };

  const handlePinSubmit = () => {
    if (pinInput !== targetDoctor.pin) {
      setPinError('Incorrect PIN. Please try again.');
      return;
    }
    
    // Stage 2 Auth Success: Unlocked specific doctor portal
    setPinDialogOpen(false);
    setSelectedDoctor(targetDoctor);
    fetchAppointments(targetDoctor.id);
  };

  const fetchAppointments = (doctorId) => {
    setLoading(true);
    setError('');
    axios.get(`http://localhost:8080/api/appointments/doctor/${doctorId}`)
      .then(res => setAppointments(res.data))
      .catch(() => {
        setError('No appointments found for this doctor');
        setAppointments([]);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h3" fontWeight={700} color="secondary" gutterBottom align="center">
        Hospital Doctor Directory
      </Typography>

      {!selectedDoctor && (
        <Box sx={{ width: '100%', mt: 4 }}>
          <Typography variant="h6" color="text.secondary" align="center" gutterBottom mb={4}>
            Select your profile to view your schedule
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, mb: 5 }}>
            {doctors.map((doc) => (
              <Card key={doc.id} sx={{ 
                width: 260,
                borderRadius: 4, 
                transition: 'all 0.3s ease', 
                display: 'flex',
                flexDirection: 'column',
                '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 } 
              }}>
                <CardActionArea onClick={() => handleDoctorClick(doc)} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Avatar sx={{ bgcolor: '#e6f4ea', width: 70, height: 70, mb: 2 }}>
                    <MedicalServicesIcon sx={{ fontSize: 40, color: '#34a853' }} />
                  </Avatar>
                  <Typography variant="h6" fontWeight={600} align="center">{doc.name}</Typography>
                  <Typography color="text.secondary" align="center">{doc.specialty}</Typography>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {selectedDoctor && (
        <Box sx={{ width: '100%', mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, position: 'relative' }}>
            <Typography variant="button" sx={{ position: 'absolute', left: 0, cursor: 'pointer', color: 'text.secondary', fontWeight: 600, '&:hover': { color: '#34a853' } }} onClick={() => setSelectedDoctor(null)}>
              ← Back to Directory
            </Typography>
            <Typography variant="h5" align="center" fontWeight={600}>
              Appointments for {selectedDoctor.name}
            </Typography>
          </Box>
          <Divider sx={{ mb: 4 }} />
          
          {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}
          {loading && <Box display="flex" justifyContent="center"><CircularProgress /></Box>}

          {!loading && appointments.length === 0 && !error && (
            <Alert severity="info" sx={{ mt: 2 }}>No appointments scheduled for you yet.</Alert>
          )}

          <Grid container spacing={3} justifyContent="center" direction="column" alignItems="center">
            {appointments.map(app => (
              <Grid item xs={12} sx={{ width: '100%', maxWidth: 600 }} key={app.id}>
                 <Card sx={{ borderRadius: 3, borderLeft: '6px solid #1a73e8', boxShadow: 2, width: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={600} color="primary" gutterBottom>
                       Patient: {app.patientName} &nbsp; ({app.phoneNumber || 'No phone provided'})
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      <strong>Date:</strong> {app.date} &nbsp; | &nbsp; <strong>Time:</strong> {app.time}
                    </Typography>
                    <Typography variant="body1" sx={{ bgcolor: '#f4f6f8', p: 2, borderRadius: 2 }}>
                      <strong>Reason:</strong> {app.reason}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* PIN Unlock Dialog */}
      <Dialog open={pinDialogOpen} onClose={() => setPinDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 700, mt: 2 }}>
          <LockOpenIcon color="secondary" sx={{ fontSize: 40, mb: 1, display: 'block', mx: 'auto' }} />
          Doctor Verification
        </DialogTitle>
        <DialogContent sx={{ px: 4 }}>
          {pinError && <Alert severity="error" sx={{ mb: 3 }}>{pinError}</Alert>}
          <Typography variant="body1" align="center" color="text.secondary" mb={3}>
            Please enter the 4-digit PIN for {targetDoctor?.name}.
          </Typography>
          <TextField
            autoFocus
            variant="outlined"
            type="password"
            label="4-Digit PIN"
            fullWidth
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
            inputProps={{ maxLength: 4, style: { textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.2rem' } }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
          <Button onClick={() => setPinDialogOpen(false)} color="inherit" sx={{ mr: 1 }}>Cancel</Button>
          <Button onClick={handlePinSubmit} variant="contained" color="secondary" size="large" sx={{ px: 4, borderRadius: 2 }}>
            Unlock
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DoctorDashboard;