import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import HeroTicket from "../components/HeroTicket";

const FEATURES = [
  {
    title: "Real-time table matching",
    desc: "Tell us your party size and we'll match you to the right table automatically — or pick your favorite spot yourself.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "No double-bookings",
    desc: "Every table, every slot, checked instantly. If it's taken, you'll know before you commit — never after.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 11h18" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "One tap to cancel",
    desc: "Plans change. Cancel from your bookings list and the table opens right back up for the next guest.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
];

export default function Landing() {
  const { user, loading } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsLoading, setRestaurantsLoading] = useState(true);
  const [restaurantsError, setRestaurantsError] = useState("");

  useEffect(() => {
    api
      .get("/restaurants")
      .then((res) => setRestaurants(res.data.data))
      .catch(() => setRestaurantsError("Could not load restaurants right now."))
      .finally(() => setRestaurantsLoading(false));
  }, []);

  if (loading) return <div className="page-loading">Setting the table…</div>;
  if (user?.role === "admin") return <Navigate to="/admin" replace />;

  return (
    <div>
      <section className="hero">
        <img
          src="https://images.unsplash.com/photo-1653259038915-7cf0b7a4dd6c?auto=format&fit=crop&w=1600&q=75"
          alt="Dimly lit restaurant dining room with a city view at dusk"
        />
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <span
              className="perf-dot"
              style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ember)", display: "inline-block" }}
            />
            Reservations, done properly
          </div>
          <h1>Book the table. Skip the hold music.</h1>
          <p>
            Browse our partner restaurants, pick a table in seconds, and get a
            real-time confirmation — no phone tag, no double-booked four-tops,
            no guesswork.
          </p>
          <div className="hero-actions">
            <a href="#restaurants" className="btn btn-primary btn-lg">
              Browse restaurants
            </a>
            {!user && (
              <Link to="/login" className="btn btn-ghost btn-lg">
                I have an account
              </Link>
            )}
            {user?.role === "customer" && (
              <Link to="/customer" className="btn btn-ghost btn-lg">
                My reservations
              </Link>
            )}
          </div>
        </div>
        <HeroTicket />
      </section>

      <section className="section" id="restaurants">
        <div className="section-narrow">
          <div className="section-head">
            <div className="eyebrow">Where to eat</div>
            <h2>Pick a table, anywhere on our floor</h2>
          </div>

          {restaurantsLoading ? (
            <p className="page-loading">Loading restaurants…</p>
          ) : restaurantsError ? (
            <div className="alert alert-error">{restaurantsError}</div>
          ) : restaurants.length === 0 ? (
            <p className="empty-state">No restaurants are open for booking right now.</p>
          ) : (
            <div className="restaurant-grid">
              {restaurants.map((r) => (
                <Link to={`/restaurants/${r._id}`} className="restaurant-card" key={r._id}>
                  <div className="restaurant-card-media">
                    <img src={r.heroImage} alt={r.name} />
                    <span className="restaurant-card-cuisine">{r.cuisine}</span>
                  </div>
                  <div className="restaurant-card-body">
                    <h3>{r.name}</h3>
                    <p className="restaurant-card-tagline">{r.tagline}</p>
                    <div className="restaurant-card-meta">
                      <span>{r.city}</span>
                      <span className="restaurant-card-cta">Reserve a table →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-narrow">
          <div className="section-head">
            <div className="eyebrow">Why it works</div>
            <h2>Built around the reservation, not the phone call</h2>
          </div>
          <div className="feature-grid">
            {FEATURES.map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!user && (
        <section className="cta-band">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Tables fill up fast on weekends
          </div>
          <h2>Grab your seat by the hearth</h2>
          <p>Create an account and your first reservation takes under a minute.</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Create your account
          </Link>
        </section>
      )}

      <footer className="site-footer">
        © {new Date().getFullYear()} Reserved. Booking for four restaurants and counting.
      </footer>
    </div>
  );
}