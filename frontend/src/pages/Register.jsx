import { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Enviamos los datos al endpoint de creación de votantes
      await API.post('/voters', { name, email, password });
      
      alert('¡Usuario registrado con éxito! Ahora puedes iniciar sesión.');
      navigate('/login'); // Redirigimos al login tras el éxito
    } catch (error) {
      alert('Error en el registro: ' + (error.response?.data?.message || 'Error de conexión'));
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Registro de Votante</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Nombre completo" 
          onChange={(e) => setName(e.target.value)} 
          required 
        /><br/><br/>
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        /><br/><br/>
        <input 
          type="password" 
          placeholder="Contraseña" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        /><br/><br/>
        <button type="submit">Registrarme</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

export default Register;