import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = (window.__ENV && window.__ENV.API_URL) || import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const fetchUsuarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/usuarios`);
      setUsuarios(res.data || []);
    } catch (e) {
      console.error(e);
      setError("No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !email) return;
    try {
      await axios.post(`${API_URL}/usuarios`, { nombre, email });
      setNombre("");
      setEmail("");
      fetchUsuarios();
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.error || "Error al crear usuario");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header"> 
        <h1>Usuarios</h1>
        <p className="lead">Listado simple con creación rápida de Usuarios</p>
      </header>

      <section className="card form-card">
        <form className="user-form" onSubmit={handleSubmit}>
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <button type="submit">Agregar</button>
            <button type="button" onClick={fetchUsuarios} style={{ marginLeft: 8 }}>
              Refrescar
            </button>
          </div>
        </form>
        {error && <div className="error">{error}</div>}
      </section>

      <section>
        {loading ? (
          <div>Cargando usuarios...</div>
        ) : (
          <div className="user-grid">
            {usuarios.map((u) => (
              <div className="user-card" key={u.id}>
                <div className="avatar">{u.nombre?.charAt(0)?.toUpperCase() || "U"}</div>
                <div className="user-info">
                  <div className="user-name">{u.nombre}</div>
                  <div className="user-email">{u.email}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;