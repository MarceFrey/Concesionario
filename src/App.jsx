import './App.css'
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Marcas from './pages/Marcas/Marcas';
import Vehiculos from './pages/Vehiculos/Vehiculos';


function App() {

  const [auto, setAutos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch('/data.json')
    .then(res => {
      if (!res.ok) throw new Error('Error al cargar productos');
      return res.json();
    })
    .then(data => setAutos(data))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, []);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/marcas" element={<Marcas/>}/>
          <Route path="/vehiculos" element={<Vehiculos vehiculos={auto} error={error} loading={loading}/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
