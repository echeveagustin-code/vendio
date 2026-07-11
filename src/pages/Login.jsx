import { useState } from "react";
import { loginUser } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await loginUser({ email, password });

      window.location.hash = "#dashboard";
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-4">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm border border-brand-navy/10">
        <div className="text-center">
          <h1 className="font-display text-3xl font-extrabold text-brand-navy">
            Iniciar sesión
          </h1>
          <p className="mt-2 text-sm text-brand-ink/60">
            Entrá a tu cuenta para gestionar tus publicaciones.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >
          <div>
            <label className="text-sm font-semibold text-brand-ink">
              Email
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-brand-navy/10 px-4 py-3 text-sm outline-none focus:border-brand-navy"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-brand-ink">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-brand-navy/10 px-4 py-3 text-sm outline-none focus:border-brand-navy"
              required
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-navy px-4 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            window.location.hash = "#inicio";
            window.dispatchEvent(new HashChangeEvent("hashchange"));
          }}
          className="mt-4 w-full text-sm font-semibold text-brand-ink/55 hover:text-brand-navy"
        >
          Volver al inicio
        </button>
      </section>
    </main>
  );
}
