import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './Home.css';

const Home = () => {
    return (
        <div className="home-background">
            <Header />
            <Footer />
            <a
                href="https://wa.me/5491127852935?text=Hola%2C%20estoy%20interesado%20en%20uno%20de%20los%20veh%C3%ADculos%20que%20vi%20en%20su%20sitio%20web"
                className="whatsapp-float"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
                    alt="WhatsApp"
                    className="whatsapp-icon"
                />
            </a>
        </div>
    )
}

export default Home
