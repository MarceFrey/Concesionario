import './CompMarcas.css'
import { Link } from 'react-router-dom'

const logos = [
  { id: 1, src: '/volkswagen.png', alt: 'Volkswagen', path: '/marcas/volkswagen' },
  { id: 2, src: '/chevrolet.png', alt: 'Chevrolet', path: '/marcas/chevrolet' },
  { id: 3, src: '/toyota.png', alt: 'Toyota', path: '/marcas/toyota' },
  { id: 4, src: '/honda.png', alt: 'Honda', path: '/marcas/honda' },
  { id: 5, src: '/renault.png', alt: 'Renault', path: '/marcas/renault' },
  { id: 6, src: '/fiat.png', alt: 'Fiat', path: '/marcas/fiat' },
  { id: 7, src: '/ford.png', alt: 'Ford', path: '/marcas/ford' },
  { id: 8, src: '/peugeot.png', alt: 'Peugeot', path: '/marcas/peugeot' },
]

const CompMarcas = () => {
  return (
    <section className="marcas-section">
      <h2 className="marcas-title">Nuestras Marcas</h2>
      <div className="marcas-grid">
        {logos.map(logo => (
          <Link to={logo.path} key={logo.id}>
            <img
              src={logo.src}
              alt={logo.alt}
              className="logo-img"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CompMarcas

