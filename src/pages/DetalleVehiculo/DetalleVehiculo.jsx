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
    fetch("https://concesionariobackend-production.up.railway.app/api/vehiculos")
      .then(res => res.json())
      .then(data => {
        const encontrado = data.find(v => v.id === parseInt(id));
        setVehiculo(encontrado);
      });
  }, [id]);

  if (!vehiculo) return <p>Cargando vehículo...</p>;

  const imagenActual = vehiculo.imagenes[imagenIndex];
  const imagenUrl = (url) => `https://concesionariobackend-production.up.railway.app/imagenes/${url.split("/").pop()}`;


  const seleccionarImagen = (i) => setImagenIndex(i);

  return (
    <div className="detalle-fondo">
      <Header />
      <div className="detalle-background">
        <div className="detalle-container">
          <div className="detalle-carrusel">
            <button onClick={() => setImagenIndex((imagenIndex - 1 + vehiculo.imagenes.length) % vehiculo.imagenes.length)}>&lt;</button>
            <img
              src={imagenUrl(imagenActual)}
              alt="imagen principal"
              onClick={() => setZoomUrl(imagenUrl(imagenActual))}
              className="detalle-imagen-grande"
            />
            <button onClick={() => setImagenIndex((imagenIndex + 1) % vehiculo.imagenes.length)}>&gt;</button>
          </div>

          <div className="detalle-miniaturas">
            {vehiculo.imagenes.map((img, i) => (
              <img
                key={i}
                src={imagenUrl(img)}
                className={`miniatura ${i === imagenIndex ? 'seleccionada' : ''}`}
                onClick={() => seleccionarImagen(i)}
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



