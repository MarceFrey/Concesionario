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
import ProtectedRoute from './pages/Auth/ProtectedRoute';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';
import { useAuth } from './Context/AuthContext';

function App() {
  const { isAuth } = useAuth();
  const [auto, setAutos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const res = await fetch('https://concesionariobackend-production.up.railway.app/api/vehiculos');
        if (!res.ok) throw new Error('Error al cargar vehículos');
        const data = await res.json();
        setAutos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehiculos();
  }, []);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/vehiculos" element={<Vehiculos vehiculos={auto} error={error} loading={loading} />} />
          <Route path="/sobrenosotros" element={<SobreNosotros />} />
          <Route path="/ubicacion" element={<Ubicacion />} />
          <Route path="/cotizacion" element={<Cotizacion />} />
          <Route path="/vehiculo/:id" element={<DetalleVehiculo vehiculos={auto} />} />
          <Route path="/marcas/:marca" element={<MarcaVehiculo vehiculos={auto} error={error} loading={loading} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute isAuthenticated={isAuth}>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;

