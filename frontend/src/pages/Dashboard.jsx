import { useEffect, useState } from 'react';
import API from '../services/api';

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const { data } = await API.get('/candidates');
        setCandidates(data);
      } catch (error) {
        alert('Error al cargar candidatos');
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const handleVote = async (candidateId) => {
    try {
      await API.post('/votes', { candidateId });
      alert('¡Voto registrado con éxito!');
      // Aquí podrías redirigir o deshabilitar los botones para que no vote dos veces
    } catch (error) {
      alert(error.response?.data?.message || 'Error al votar');
    }
  };

  if (loading) return <p>Cargando candidatos...</p>;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Resgistra tu Voto 🗳️</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {candidates.map(candidate => (
          <div key={candidate.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '200px' }}>
            <h3>{candidate.name}</h3>
            <p>{candidate.party}</p>
            <button 
              onClick={() => handleVote(candidate.id)}
              style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}
            >
              Votar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;