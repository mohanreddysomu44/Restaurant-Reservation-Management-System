import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const shortCode = (id) => `RES-${id.slice(-4).toUpperCase()}`;

export default function CustomerDashboard() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/reservations/my");
      setReservations(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load your reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this reservation?")) return;
    setError("");
    setSuccess("");
    try {
      await api.patch(`/reservations/${id}/cancel`);
      setSuccess("Reservation cancelled.");
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Could not cancel reservation");
    }
  };

  const upcoming = reservations.filter((r) => r.status === "confirmed").length;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">Your bookings</div>
          <h1>My reservations</h1>
          <p>
            {upcoming > 0
              ? `You have ${upcoming} upcoming reservation${upcoming === 1 ? "" : "s"}.`
              : "No upcoming reservations yet — browse restaurants and book one."}
          </p>
        </div>
        <Link to="/" className="btn btn-primary">
          Browse restaurants
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <section>
        {loading ? (
          <p className="page-loading">Loading your bookings…</p>
        ) : reservations.length === 0 ? (
          <p className="empty-state">
            You have no reservations yet — your first ticket will show up here.
          </p>
        ) : (
          <div className="ticket-list">
            {reservations.map((r) => (
              <div className="ticket" key={r._id}>
                <div className="ticket-stub">
                  <span className="stub-label">Table</span>
                  <span className="stub-code">{r.table?.label || "—"}</span>
                </div>
                <div className="ticket-perf" />
                <div className="ticket-body">
                  <div className="ticket-info">
                    <div className="ticket-field" style={{ gridColumn: "1 / -1" }}>
                      <span className="tf-label">Restaurant</span>
                      <span className="tf-value">
                        {r.table?.restaurant?.name || "—"}
                        {r.table?.restaurant?.city ? ` · ${r.table.restaurant.city}` : ""}
                      </span>
                    </div>
                    <div className="ticket-field">
                      <span className="tf-label">Date</span>
                      <span className="tf-value">{r.date}</span>
                    </div>
                    <div className="ticket-field">
                      <span className="tf-label">Time</span>
                      <span className="tf-value">{r.timeSlot}</span>
                    </div>
                    <div className="ticket-field">
                      <span className="tf-label">Guests</span>
                      <span className="tf-value">{r.guests}</span>
                    </div>
                    <div className="ticket-field">
                      <span className="tf-label">Code</span>
                      <span className="tf-value">{shortCode(r._id)}</span>
                    </div>
                  </div>
                  <div className="ticket-actions">
                    <span className={`status-badge status-${r.status}`}>{r.status}</span>
                    {r.status === "confirmed" && (
                      <button className="btn btn-danger btn-sm" onClick={() => handleCancel(r._id)}>
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
