import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './DetalleVehiculo.css';

const DetalleVehiculo = ({ vehiculos }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const vehiculo = vehiculos.find(v => v.id === id);

  if (!vehiculo) return <p>Vehículo no encontrado.</p>;

  return (
    <div className="Detalle-background">
      <Header />
      <div className="detalle-container">
        <div className="detalle-imagen">
          <img src={vehiculo.imagen} alt={`${vehiculo.marca} ${vehiculo.modelo}`} />
        </div>
        <div className="detalle-info">
          <h2>{vehiculo.marca} {vehiculo.modelo}</h2>
          <p><strong>Año:</strong> {vehiculo.anio}</p>
          <p><strong>Precio:</strong> ${vehiculo.precio}</p>
          <p><strong>Kilometraje:</strong> {vehiculo.kilometraje || 'No especificado'}</p>
          <p><strong>Color:</strong> {vehiculo.color || 'No especificado'}</p>
          <p><strong>Descripción:</strong> {vehiculo.descripcion || 'Sin descripción'}</p>
          <button className="volver-btn" onClick={() => navigate(-1)}>← Volver</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetalleVehiculo;