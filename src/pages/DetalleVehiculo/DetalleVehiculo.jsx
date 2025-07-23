import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import './DetalleVehiculo.css';

function DetalleVehiculo() {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);
  const [imagenIndex, setImagenIndex] = useState(0);
  const [zoomUrl, setZoomUrl] = useState(null);

  useEffect(() => {
    fetch(`https://concesionariobackend-production.up.railway.app/api/vehiculos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener vehículo");
        return res.json();
      })
      .then(data => setVehiculo(data))
      .catch(err => console.error("Error:", err));
  }, [id]);

  if (!vehiculo) return <p>Cargando vehículo...</p>;

  const imagenActual = vehiculo.imagenes?.[imagenIndex];

  return (
    <div className="detalle-fondo">
      <Header />
      <div className="detalle-background">
        <div className="detalle-container">
          <div className="detalle-carrusel">
            <button onClick={() => setImagenIndex((imagenIndex - 1 + vehiculo.imagenes.length) % vehiculo.imagenes.length)}>&lt;</button>
            <img
              src={imagenActual}
              alt="imagen principal"
              onClick={() => setZoomUrl(imagenActual)}
              className="detalle-imagen-grande"
            />
            <button onClick={() => setImagenIndex((imagenIndex + 1) % vehiculo.imagenes.length)}>&gt;</button>
          </div>

          <div className="detalle-miniaturas">
            {vehiculo.imagenes.map((img, i) => (
              <img
                key={i}
                src={img}
                className={`miniatura ${i === imagenIndex ? 'seleccionada' : ''}`}
                onClick={() => setImagenIndex(i)}
                alt={`thumb-${i}`}
              />
            ))}
          </div>

          <div className="detalle-info">
            <h2>{vehiculo.marca} {vehiculo.modelo} ({vehiculo.anio})</h2>
            <p><strong>Precio:</strong> ${vehiculo.precio}</p>
            <p><strong>Kilometraje:</strong> {vehiculo.kilometraje} km</p>
            <p><strong>Color:</strong> {vehiculo.color}</p>
            <p><strong>Descripción:</strong> {vehiculo.descripcion}</p>
          </div>
        </div>

        {/* Modal de zoom */}
        {zoomUrl && (
          <div className="zoom-modal" onClick={() => setZoomUrl(null)}>
            <img src={zoomUrl} alt="Zoom" />
          </div>
        )}
      </div>
    </div>
  );
}

export default DetalleVehiculo;





