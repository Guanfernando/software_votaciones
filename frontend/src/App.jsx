import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register'
import CandidateForm from './pages/CandidateForm';


function App() {
  return (
    <Router>    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/candidates" element={<CandidateForm />} />
        <Route path="/register" element={<Register />} />
        {/* Redirigir por defecto al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;


