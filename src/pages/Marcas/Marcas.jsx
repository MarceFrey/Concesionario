import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import CompMarcas from '../../components/CompMarcas/CompMarcas'

import './Marcas.css';

const Marcas = () => {
  return (
    <div className="marcas-background">
      <Header/>
      <div className='marcas-seccion'>
        <CompMarcas/>
      </div>
      <Footer/>
    </div>
  )
}

export default Marcas
