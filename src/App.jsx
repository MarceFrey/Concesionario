import './App.css'
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Marcas from './pages/Marcas/Marcas';
import Vehiculos from './pages/Vehiculos/Vehiculos';
import SobreNosotros from './pages/SobreNosotros/SobreNosotros';
import Ubicacion from './pages/Ubicacion/Ubicacion';
import DetalleVehiculo from './pages/DetalleVehiculo/DetalleVehiculo';
import Cotizacion from './pages/Cotizacion/Cotizacion';
import MarcaVehiculo from './pages/MarcaVehiculo/MarcaVehiculo';

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
          <Route path="/sobrenosotros" element={<SobreNosotros/>}/>
          <Route path="/ubicacion" element={<Ubicacion/>}/>
          <Route path="/cotizacion" element={<Cotizacion/>}/>
          <Route path="/vehiculo/:id" element={<DetalleVehiculo vehiculos={auto} />} />
          <Route path="/marcas/:marca" element={<MarcaVehiculo vehiculos={auto} error={error} loading={loading}/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
