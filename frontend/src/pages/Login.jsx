import { useState } from 'react';
import API from '../services/api'; // El que creamos antes
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/voters/login', { email, password });
      
      // Guardamos el token para futuras peticiones
      localStorage.setItem('token', data.token);
      
      alert('¡Bienvenido!');
      navigate('/dashboard'); // Nos vamos a la zona de votación
    } catch (error) {
      alert('Error en el login: ' + error.response?.data?.message || 'Error de conexión');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Sistema de Votaciones 2026</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Tu correo" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        /><br/><br/>
        <input 
          type="password" 
          placeholder="Tu contraseña" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        /><br/><br/>
        <button type="submit">Entrar</button>
      </form>
      <p>
      ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;