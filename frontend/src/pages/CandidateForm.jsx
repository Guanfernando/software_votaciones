import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const CandidateForm = () => {
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviamos el nombre y el partido al backend
      await API.post('/candidates', { name, party });
      
      alert('Candidato registrado con éxito');
      setName('');
      setParty('');
      // Opcional: redirigir al dashboard para ver cómo quedó
      navigate('/dashboard'); 
    } catch (error) {
      alert('Error al registrar candidato: ' + (error.response?.data?.message || 'Error de servidor'));
    }
  };

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h2>Registrar Nuevo Candidato 👤</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left', border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
        <label>Nombre del Candidato:</label><br/>
        <input 
          type="text" 
          value={name}
          placeholder="Ej: Juan Fernando" 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{ width: '250px', marginBottom: '15px', padding: '8px' }}
        /><br/>

        <label>Partido Político:</label><br/>
        <input 
          type="text" 
          value={party}
          placeholder="Ej: Partido de la Tecnología" 
          onChange={(e) => setParty(e.target.value)} 
          required 
          style={{ width: '250px', marginBottom: '15px', padding: '8px' }}
        /><br/>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Guardar Candidato
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;