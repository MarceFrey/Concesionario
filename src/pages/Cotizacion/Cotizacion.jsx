import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Cotizacion.css';

const Cotizacion = () => {
    return (
        <div className="cotizacion-background">
            <Header />
            <div className="contenedor-formulario">
                <main className="tarjeta-cotizacion">
                    <form className="formulario-cotizacion">
                        <h2>Cotizador Online</h2>
                        <h3>Detalles de facturación</h3>

                        <div className="form-columns">
                            <div className="columna">
                                <label htmlFor="nombre">Nombre *</label>
                                <input type="text" id="nombre" name="nombre" required />

                                <label htmlFor="apellido">Apellido *</label>
                                <input type="text" id="apellido" name="apellido" required />

                                <label htmlFor="dni">DNI *</label>
                                <input type="text" id="dni" name="dni" required />

                                <label htmlFor="empresa">Empresa (opcional)</label>
                                <input type="text" id="empresa" name="empresa" />

                                <label htmlFor="domicilio">Domicilio *</label>
                                <input type="text" id="domicilio" name="domicilio" required />

                                <label htmlFor="piso">Piso / Depto / Etc.</label>
                                <input type="text" id="piso" name="piso" />
                            </div>

                            <div className="columna">
                                <label htmlFor="barrio">Barrio cerrado / Lote</label>
                                <input type="text" id="barrio" name="barrio" />

                                <label htmlFor="provincia">Provincia *</label>
                                <input type="text" id="provincia" name="provincia" required />

                                <label htmlFor="localidad">Localidad / Ciudad *</label>
                                <input type="text" id="localidad" name="localidad" required />

                                <label htmlFor="codigoPostal">Código postal *</label>
                                <input type="text" id="codigoPostal" name="codigoPostal" required />

                                <label htmlFor="celular">Teléfono celular *</label>
                                <input type="tel" id="celular" name="celular" required />

                                <label htmlFor="telefonoFijo">Teléfono de línea</label>
                                <input type="tel" id="telefonoFijo" name="telefonoFijo" />
                            </div>
                        </div>

                        <label htmlFor="email">Correo electrónico *</label>
                        <input type="email" id="email" name="email" required />

                        <div className="checkbox-condiciones">
                            <input type="checkbox" id="terminos" name="terminos" required />
                            <label htmlFor="terminos">Acepto los términos y condiciones *</label>
                        </div>

                        <button type="submit">Cotizar</button>
                    </form>

                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Cotizacion;

