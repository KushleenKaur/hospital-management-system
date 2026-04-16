import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PatientDashboard from './pages/PatientDashboard';
import BookAppointment from './pages/BookAppointment';
import MyBookings from './pages/MyBookings';
import DoctorDashboard from './pages/DoctorDashboard';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;