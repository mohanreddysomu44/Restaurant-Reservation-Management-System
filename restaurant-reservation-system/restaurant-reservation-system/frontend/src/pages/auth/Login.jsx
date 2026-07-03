import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === "admin" ? "/admin" : "/customer");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-visual">
        <img
          src="https://images.unsplash.com/photo-1653259038915-7cf0b7a4dd6c?auto=format&fit=crop&w=1200&q=75"
          alt="Warmly lit restaurant dining room"
        />
        <div className="auth-visual-content">
          <p className="auth-visual-quote">
            "Every table we've reserved has been ready and waiting — no line, no mix-ups."
          </p>
          <div className="auth-visual-byline">Regular guest, Table 5</div>
        </div>
      </div>

      <div className="auth-form-side">
        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="eyebrow">Welcome back</div>
          <h1 style={{ fontSize: "1.6rem" }}>Log in to your table</h1>
          <p className="auth-subtitle">Manage your reservations in a couple of taps.</p>

          {error && <div className="alert alert-error">{error}</div>}

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </label>

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? "Logging in…" : "Log in"}
          </button>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Register</Link>
          </p>

          <div className="auth-hint">
            DEMO ADMIN → admin@restaurant.com / Admin@123
            <br />
            (after running <code>npm run seed</code> on the backend)
          </div>
        </form>
      </div>
    </div>
  );
}
