import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("Agustin");
  const [email, setEmail] = useState("agustin@test.com");
  const [password, setPassword] = useState("Vendio123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      await registerUser({
        nombre,
        email,
        password,
      });

      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "No se pudo registrar el usuario.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>Registro Vendio</h1>

        <p style={styles.subtitle}>
          Crea usuario y workspace automático.
        </p>

        {error && <div style={styles.error}>{error}</div>}

        <label style={styles.label}>
          Nombre
          <input
            style={styles.input}
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
        </label>

        <label style={styles.label}>
          Email
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label style={styles.label}>
          Contraseña
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p style={styles.footerText}>
          ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </form>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f172a",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#111827",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "28px",
  },
  title: {
    margin: 0,
    fontSize: "28px",
  },
  subtitle: {
    color: "#94a3b8",
    marginTop: "8px",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "14px",
    fontSize: "14px",
    color: "#cbd5e1",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    marginTop: "6px",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #475569",
    background: "#020617",
    color: "white",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    padding: "10px",
    borderRadius: "8px",
    background: "#7f1d1d",
    color: "#fecaca",
    marginBottom: "14px",
    fontSize: "14px",
  },
  footerText: {
    marginTop: "16px",
    fontSize: "14px",
    color: "#94a3b8",
  },
};