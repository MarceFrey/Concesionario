import { useState, useEffect } from "react";
import { useAuth } from '../../Context/AuthContext';
import Header from '../../components/Header/Header';
import './Admin.css';

function Admin() {
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    anio: "",
    precio: "",
    kilometraje: "",
    color: "",
    descripcion: ""
  });
  const [imagenes, setImagenes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [vehiculos, setVehiculos] = useState([]);
  const [editando, setEditando] = useState(null);

  const { token } = useAuth(); // Obtenemos el token del contexto

  useEffect(() => {
  if (token) {
    fetchVehiculos();
  }
}, [token]);

const fetchVehiculos = async () => {
  try {
    const res = await fetch("https://concesionariobackend-production.up.railway.app/api/vehiculos", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error("No autorizado");
    }

    const data = await res.json();
    setVehiculos(data);

  } catch (error) {
    console.error("Error al cargar vehículos:", error);
    setMensaje("❌ No se pudo cargar la lista de vehículos. ¿Estás logueado como ADMIN?");
  }
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagenes = (e) => {
    setImagenes([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = new FormData();
    for (let key in form) {
      datos.append(key, form[key]);
    }
    imagenes.forEach((img) => datos.append("imagenes", img));

    try {
      const res = await fetch("https://concesionariobackend-production.up.railway.app/api/vehiculos/subir", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}` // Agregar token aquí
        },
        body: datos
      });
      if (!res.ok) throw new Error("Error al subir vehículo");
      setMensaje("✅ Vehículo guardado correctamente");
      setForm({ marca: "", modelo: "", anio: "", precio: "", kilometraje: "", color: "", descripcion: "" });
      setImagenes([]);
      fetchVehiculos();
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al guardar el vehículo");
    }
  };

  const eliminarVehiculo = async (id) => {
    if (!window.confirm("¿Eliminar este vehículo?")) return;

    try {
      const res = await fetch(`https://concesionariobackend-production.up.railway.app/api/vehiculos/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("No autorizado o error en el servidor");
      fetchVehiculos();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar el vehículo. ¿Estás logueado como ADMIN?");
    }
  };

  const abrirEdicion = (vehiculo) => setEditando({ ...vehiculo });
  const handleEditarChange = (e) => setEditando({ ...editando, [e.target.name]: e.target.value });

  const guardarCambios = async () => {
    try {
      const res = await fetch(`https://concesionariobackend-production.up.railway.app/api/vehiculos/${editando.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editando)
      });

      if (!res.ok) throw new Error("Error al actualizar vehículo");
      setEditando(null);
      fetchVehiculos();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar. Verifica tus permisos.");
    }
  };

  return (
    <div className="admin-background">
      <Header />
      <div className="admin-container">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>Agregar Vehículo</h2>
          <input type="text" name="marca" placeholder="Marca" value={form.marca} required onChange={handleChange} />
          <input type="text" name="modelo" placeholder="Modelo" value={form.modelo} required onChange={handleChange} />
          <input type="number" name="anio" placeholder="Año" value={form.anio} required onChange={handleChange} />
          <input type="number" name="precio" placeholder="Precio" value={form.precio} required onChange={handleChange} />
          <input type="number" name="kilometraje" placeholder="Kilometraje" value={form.kilometraje} required onChange={handleChange} />
          <input type="text" name="color" placeholder="Color" value={form.color} required onChange={handleChange} />
          <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} rows={3} required onChange={handleChange} />
          <input type="file" accept="image/*" multiple required onChange={handleImagenes} />
          <button type="submit">Guardar Vehículo</button>
          {mensaje && <p>{mensaje}</p>}
        </form>

        <div className="admin-lista">
          <h2>Vehículos cargados</h2>
          {vehiculos.map((v) => (
            <div key={v.id} className="admin-card">
              <p><strong>{v.marca} {v.modelo}</strong> - {v.anio} - ${v.precio}</p>
              <p>Kms: {v.kilometraje} | Color: {v.color}</p>
              <p style={{ fontSize: '0.9rem', color: '#555' }}>{v.descripcion}</p>
              <button onClick={() => abrirEdicion(v)}>✏️ Editar</button>
              <button onClick={() => eliminarVehiculo(v.id)}>🗑 Eliminar</button>
            </div>
          ))}
        </div>
      </div>

      {editando && (
        <div className="modal-edicion">
          <div className="modal-contenido">
            <h3>Editar Vehículo</h3>
            <input type="text" name="marca" value={editando.marca} onChange={handleEditarChange} />
            <input type="text" name="modelo" value={editando.modelo} onChange={handleEditarChange} />
            <input type="number" name="anio" value={editando.anio} onChange={handleEditarChange} />
            <input type="number" name="precio" value={editando.precio} onChange={handleEditarChange} />
            <input type="number" name="kilometraje" value={editando.kilometraje} onChange={handleEditarChange} />
            <input type="text" name="color" value={editando.color} onChange={handleEditarChange} />
            <textarea name="descripcion" value={editando.descripcion} rows={3} onChange={handleEditarChange} />
            <div style={{ marginTop: "1rem" }}>
              <button onClick={guardarCambios}>💾 Guardar</button>
              <button onClick={() => setEditando(null)}>❌ Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;