import { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Cotizacion.css';

const Cotizacion = () => {
    const [form, setForm] = useState({ nombre: '', apellido: '', dni: '', email: '', terminos: false });
    const [resultado, setResultado] = useState(null);
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.terminos) {
            alert("Debe aceptar los términos y condiciones");
            return;
        }

        setCargando(true);
        setResultado(null);
        try {
            const res = await fetch(`https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/${form.dni}`);
            if (!res.ok) throw new Error("CUIT inválido o sin datos disponibles");
            const data = await res.json();
            setResultado(data.results);
        } catch (error) {
            setResultado({ error: error.message });
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="cotizacion-background">
            <Header />
            <div className="contenedor-formulario">
                <main className="tarjeta-cotizacion">
                    <form className="formulario-cotizacion" onSubmit={handleSubmit}>
                        <h2>Accede a tu Crédito</h2>

                        <div className="form-columns">
                            <div className="columna">
                                <label htmlFor="nombre">Nombre *</label>
                                <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />

                                <label htmlFor="apellido">Apellido *</label>
                                <input type="text" id="apellido" name="apellido" value={form.apellido} onChange={handleChange} required />

                                <label htmlFor="dni">CUIT / CUIL *</label>
                                <input type="text" id="dni" name="dni" value={form.dni} onChange={handleChange} required />
                            </div>
                        </div>

                        <label htmlFor="email">Correo electrónico *</label>
                        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />

                        <div className="checkbox-condiciones">
                            <input type="checkbox" id="terminos" name="terminos" checked={form.terminos} onChange={handleChange} />
                            <label htmlFor="terminos">Acepto los términos y condiciones *</label>
                        </div>

                        <button type="submit" disabled={cargando}>
                            {cargando ? "Consultando..." : "Consultar"}
                        </button>
                    </form>

                    {resultado && (
                        <div className="resultado-crediticio">
                            {resultado.error ? (
                                <p style={{ color: 'red' }}>{resultado.error}</p>
                            ) : (
                                <>
                                    <h3>Resultado para CUIT {resultado.identificacion}</h3>
                                    {resultado.periodos.map((p, idx) => (
                                        <div key={idx}>
                                            <h4>Mes: {p.periodo}</h4>
                                            {p.entidades.map((ent, i) => (
                                                <div key={i}>
                                                    <p>Entidad: {ent.entidad}</p>
                                                    <p>Situación: {ent.situacion} - Monto: ${ent.monto}</p>
                                                    <p>Días de atraso: {ent.diasAtrasoPago}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Cotizacion;


