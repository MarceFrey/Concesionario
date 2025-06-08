import { useParams } from 'react-router-dom'

import './MarcaVehiculo.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';

const MarcaVehiculo = ({ vehiculos, loading, error }) => {
  const { marca } = useParams()

  const autosFiltrados = vehiculos.filter(auto =>
    auto.marca.toLowerCase() === marca.toLowerCase()
  )

  if (!vehiculos.length) {
    return <p>Cargando autos de {marca}...</p>
  }

  if (autosFiltrados.length === 0) {
    return <p>No hay vehículos disponibles para {marca}</p>
  }

  return (
    <div className="MarcaVehiculo-background">
      <Header />
      {loading && <p>Cargando productos...</p>}
      {error && <p>{error}</p>}
      <ProductCard vehiculos={autosFiltrados} />
      <Footer />
    </div>
  )
}

export default MarcaVehiculo