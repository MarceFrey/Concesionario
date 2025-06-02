import './ProductCard.css';

function ProductCard({ vehiculos }) {
  if (!Array.isArray(vehiculos)) return <p>No hay vehículos para mostrar.</p>;

  return (
    <div className="vehiculo-container">
      {vehiculos.map((auto, index) => (
        <div className="tarjeta" key={index}>
            <img src={auto.imagen} className="tarjeta-imagen" />
          <p className="tarjeta-nombre">{auto.marca}</p>
          <p className="tarjeta-nombre">{auto.modelo}</p>
          <p className="tarjeta-nombre">{auto.anio}</p>
          <p className="tarjeta-precio">${auto.precio}</p>
          <button className="tarjeta-boton">Cotizar</button>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;