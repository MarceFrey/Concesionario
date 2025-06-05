import { Link } from 'react-router-dom'
import './Header.css'
const Header = () => {
  return (
    <header className="header">
        <nav className="nav">
            <ul className="ul">
                <li><Link to="/" className="li">Inicio</Link></li>
                <li><Link to="/marcas" className="li">Marcas</Link></li>
                <li><Link to="/vehiculos" className="li">Vehiculos</Link></li>
                <li><Link to="/cotizacion" className="li">Cotizacion</Link></li>
                <li><Link to="/ubicacion" className="li">Ubicacion</Link></li>
                <li><Link to="/sobrenosotros" className="li">Sobre Nosotros</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header
