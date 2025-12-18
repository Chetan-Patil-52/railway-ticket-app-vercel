import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Trains from './pages/Trains';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Success from './pages/Success';
import MobileConfirm from './pages/MobileConfirm';
import MobileSuccess from './pages/MobileSuccess';
import MobileOpen from './pages/MobileOpen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/trains" element={<Trains />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/success" element={<Success />} />
      <Route path="/mobile-confirm/:transactionId" element={<MobileConfirm />} />
      <Route path="/mobile-success" element={<MobileSuccess />} />
      <Route path="/mobile-open/:transactionId" element={<MobileOpen />} />
      {/* Fallback to login for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

