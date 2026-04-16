import React from 'react';
import { Box, Button, Card, CardContent, Typography, Container, Grid, Avatar } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      minHeight: '80vh',
      pt: 12,
      pb: 12,
      display: 'flex',
      alignItems: 'center'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={6} md={5} sx={{ display: 'flex' }}>
            <Card sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 6,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              '&:hover': { transform: 'translateY(-12px)', boxShadow: '0 24px 48px rgba(26,115,232,0.15)' }
            }}>
              <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Avatar sx={{ bgcolor: 'rgba(26,115,232,0.1)', width: 90, height: 90, mx: 'auto', mb: 4 }}>
                  <PersonIcon sx={{ fontSize: 45, color: '#1a73e8' }} />
                </Avatar>
                <Typography variant="h4" fontWeight={700} gutterBottom>Patient Portal</Typography>
                <Typography color="text.secondary" paragraph sx={{ mb: 5, fontSize: '1.1rem', lineHeight: 1.6, flexGrow: 1 }}>
                  Book appointments and manage health records.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => navigate('/login?role=patient')}
                  startIcon={<MedicalServicesIcon />}
                  sx={{ py: 2, fontSize: '1.1rem', borderRadius: 4, letterSpacing: '0.5px' }}
                >
                  Access as Patient
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={5} sx={{ display: 'flex' }}>
            <Card sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 6,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              '&:hover': { transform: 'translateY(-12px)', boxShadow: '0 24px 48px rgba(52,168,83,0.15)' }
            }}>
              <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Avatar sx={{ bgcolor: 'rgba(52,168,83,0.1)', width: 90, height: 90, mx: 'auto', mb: 4 }}>
                  <LocalHospitalIcon sx={{ fontSize: 45, color: '#34a853' }} />
                </Avatar>
                <Typography variant="h4" fontWeight={700} gutterBottom>Doctor Portal</Typography>
                <Typography color="text.secondary" paragraph sx={{ mb: 5, fontSize: '1.1rem', lineHeight: 1.6, flexGrow: 1 }}>
                  Manage your schedule, appointments and treat patients.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  onClick={() => navigate('/login?role=doctor')}
                  sx={{ py: 2, fontSize: '1.1rem', borderRadius: 4, letterSpacing: '0.5px' }}
                >
                  Access as Doctor
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;