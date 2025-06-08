import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './DetalleVehiculo.css';

const DetalleVehiculo = ({ vehiculos }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const vehiculo = vehiculos.find(v => v.id === id);

  if (!vehiculo) return <p>Vehículo no encontrado.</p>;

  // Si hay múltiples imágenes usá vehiculo.imagenes, si no, usá una sola
  const imagenes = Array.isArray(vehiculo.imagenes) && vehiculo.imagenes.length > 0
    ? vehiculo.imagenes
    : [vehiculo.imagen];

  const [imagenActual, setImagenActual] = useState(0);

  const avanzar = () => {
    setImagenActual((prev) => (prev + 1) % imagenes.length);
  };

  const retroceder = () => {
    setImagenActual((prev) =>
      prev === 0 ? imagenes.length - 1 : prev - 1
    );
  };

  return (
    <div className="Detalle-background">
      <Header />
      <div className="detalle-container">
        <div className="detalle-columna-izquierda">
          <div className="detalle-imagen-principal">
            {imagenes.length > 1 && (
              <button className="flecha" onClick={retroceder}>&#10094;</button>
            )}
            <img
              src={imagenes[imagenActual]}
              alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            />
            {imagenes.length > 1 && (
              <button className="flecha" onClick={avanzar}>&#10095;</button>
            )}
          </div>

          {imagenes.length > 1 && (
            <div className="miniaturas">
              {imagenes.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  className={`miniatura ${index === imagenActual ? 'activa' : ''}`}
                  onClick={() => setImagenActual(index)}
                />
              ))}
            </div>
          )}
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
