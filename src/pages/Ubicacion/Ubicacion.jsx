import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Ubicacion.css';

const Ubicacion = () => {
    // Ejemplo de coordenadas (latitud, longitud)
    const lat = -34.6037;  // Buenos Aires, Argentina
    const lng = -58.3816;

    // URL de Google Maps embebido con marcador en la ubicación
    const mapaURL = `https://www.google.com/maps/embed/v1/place?key=TU_API_KEY&q=${lat},${lng}`;

    return (
        <div className="ubicacion-background">
            <Header />
            <div className="mapa-container">
                <iframe
                    src="https://www.google.com/maps?q=-34.49018197534675,-58.58221694064898&z=15&output=embed"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
            </div>
            <Footer />
        </div>
    );
};

export default Ubicacion;