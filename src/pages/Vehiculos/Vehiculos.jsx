import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './Vehiculos.css'
import ProductCard from '../../components/ProductCard/ProductCard'

const Vehiculos = ({vehiculos, error, loading}) => {
  return (
    <div className='vehiculos-background'>
      <Header/>
      <div className='vehiculos-content'>
        {loading && <p>Cargando productos...</p>}
        {error && <p>{error}</p>}
        <ProductCard vehiculos={vehiculos} />
      </div>
      <Footer/>
    </div>
  )
}

export default Vehiculos
