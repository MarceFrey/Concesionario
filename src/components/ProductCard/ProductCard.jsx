import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

function ProductCard({ vehiculos }) {
  const navigate = useNavigate();
  if (!Array.isArray(vehiculos)) return <p>No hay vehículos para mostrar.</p>;

  return (
    <div className="vehiculo-container">
      {vehiculos.map((auto, index) => {
        // Obtener la primera imagen:
        const primeraImagen = Array.isArray(auto.imagenes) && auto.imagenes.length > 0
          ? auto.imagenes[0]
          : auto.imagen; // fallback si no hay array, toma la imagen simple

        return (
          <div className="tarjeta" key={index}>
            <img src={primeraImagen} alt={`${auto.marca} ${auto.modelo}`} className="tarjeta-imagen" />
            <p className="tarjeta-nombre">{auto.marca}</p>
            <p className="tarjeta-nombre">{auto.modelo}</p>
            <p className="tarjeta-nombre">{auto.anio}</p>
            <p className="tarjeta-precio">${auto.precio}</p>
            <button
              className="tarjeta-boton"
              onClick={() => navigate(`/vehiculo/${auto.id}`)}
            >
              Más información
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ProductCard;