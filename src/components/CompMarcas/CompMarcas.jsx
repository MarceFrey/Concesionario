import './CompMarcas.css'
import { Link } from 'react-router-dom'

const logos = [
  { id: 1, src: '/src/assets/volkswagen.png', alt: 'Volkswagen', path: '/marcas/volkswagen' },
  { id: 2, src: '/src/assets/chevrolet.png', alt: 'Chevrolet', path: '/marcas/chevrolet' },
  { id: 3, src: '/src/assets/toyota.png', alt: 'Toyota', path: '/marcas/toyota' },
  { id: 4, src: '/src/assets/honda.png', alt: 'Honda', path: '/marcas/honda' },
  { id: 5, src: '/src/assets/renault.png', alt: 'Renault', path: '/marcas/renault' },
  { id: 6, src: '/src/assets/fiat.png', alt: 'Fiat', path: '/marcas/fiat' },
  { id: 7, src: '/src/assets/ford.png', alt: 'Ford', path: '/marcas/ford' },
  { id: 8, src: '/src/assets/peugeot.png', alt: 'Peugeot', path: '/marcas/peugeot' },
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

