import React, { useState } from 'react';
import { Container, Card, Typography, TextField, Button, Box, Alert, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role') === 'doctor' ? 'doctor' : 'patient';

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!inputValue) {
      setError(`Please enter your ${role === 'doctor' ? 'PIN' : 'Phone Number'}.`);
      return;
    }

    if (role === 'doctor') {
      if (inputValue !== '1234') {
        setError('Invalid Access PIN.');
        return;
      }
    } else {
      // Basic phone number validation for patients
      const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
      if (!phoneRegex.test(inputValue)) {
        setError('Please enter a valid phone number.');
        return;
      }
    }

    setLoading(true);
    setError('');

    // Simulate network delay for realistic experience
    setTimeout(() => {
      setLoading(false);

      if (role === 'patient') {
        localStorage.setItem('userPhone', inputValue);
      }
      localStorage.setItem('userRole', role);
      window.dispatchEvent(new Event('storage')); // trigger event to update Layout UI immediately

      if (role === 'patient') {
        navigate('/patient');
      } else {
        navigate('/doctor');
      }
    }, 1200);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 10 }}>
      <Card sx={{
        p: { xs: 3, sm: 5 },
        borderRadius: 4,
        boxShadow: '0 12px 32px rgba(0,0,0,0.05)',
        textAlign: 'center'
      }}>
        <Box sx={{ bgcolor: role === 'doctor' ? 'rgba(52,168,83,0.1)' : 'rgba(26,115,232,0.1)', width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
          {role === 'doctor' ? (
            <LocalHospitalIcon sx={{ fontSize: 40, color: '#34a853' }} />
          ) : (
            <PersonIcon sx={{ fontSize: 40, color: '#1a73e8' }} />
          )}
        </Box>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {role === 'doctor' ? 'Hospital Access Gateway' : 'Patient Login'}
        </Typography>
        <Typography color="text.secondary" mb={4}>
          {role === 'doctor' ? 'Enter PIN' : 'Log in with your registered phone number'}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

        <form onSubmit={handleLogin}>
          <TextField
            label={role === 'doctor' ? 'PIN' : 'Phone Number'}
            variant="outlined"
            type={role === 'doctor' ? 'password' : 'text'}
            fullWidth
            required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={role === 'doctor' ? '****' : '+1 (555) 000-0000'}
            // helperText={role === 'doctor' ? "Hint: The Universal PIN is 1234" : ""}
            sx={{ mb: 4 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={loading}
            sx={{ py: 1.8, fontSize: '1.1rem', borderRadius: 3 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : `Access ${role === 'doctor' ? 'Doctor Portal' : 'Patient Portal'}`}
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
