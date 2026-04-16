import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Container, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CopyrightIcon from '@mui/icons-material/Copyright';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import { keyframes } from '@mui/system';

const pulseSpin = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userRole'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('userRole'));
    };
    window.addEventListener('storage', handleStorageChange);
    // Custom event listener for same-window updates
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userRole');
    localStorage.removeItem('doctorId');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          background: 'rgba(255, 255, 255, 0.85)', 
          backdropFilter: 'blur(12px)',
          color: 'primary.main', 
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}
      >
        <Toolbar sx={{ py: 0.5 }}>
          {!isHome && (
            <IconButton edge="start" color="inherit" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <LocalHospitalIcon sx={{ 
              mr: 1.5, 
              fontSize: '2rem',
              color: '#1a73e8',
              animation: `${pulseSpin} 3s infinite ease-in-out`
            }} />
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ fontWeight: 800, letterSpacing: '-0.5px', background: 'linear-gradient(45deg, #1a73e8, #34a853)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              Vishal Mega Hospital
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {isLoggedIn && !isHome && !location.pathname.startsWith('/login') && (
            <Button 
              color="error" 
              variant="outlined" 
              size="small"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{ borderRadius: 2, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      
      <Box sx={{ flexGrow: 1, py: { xs: 3, md: 5 } }}>
        {children}
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 3, mt: 'auto', bgcolor: 'white', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, fontWeight: 500 }}>
            <CopyrightIcon fontSize="small" /> 2026 Vishal Mega Hospital | Developed by Kushleen Kaur
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
