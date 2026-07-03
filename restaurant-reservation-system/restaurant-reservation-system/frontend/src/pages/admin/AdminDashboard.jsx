import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("");
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    tagline: "",
    cuisine: "",
    city: "",
    description: "",
    heroImage: "",
  });
  const [newTable, setNewTable] = useState({ label: "", capacity: "" });

  const loadRestaurants = async () => {
    try {
      const res = await api.get("/restaurants");
      setRestaurants(res.data.data);
      setSelectedRestaurantId((current) => current || res.data.data[0]?._id || "");
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load restaurants");
      return [];
    }
  };

  const loadReservations = async (restaurantId, date) => {
    if (!restaurantId) return;
    setLoading(true);
    try {
      const params = { restaurant: restaurantId };
      if (date) params.date = date;
      const res = await api.get("/reservations", { params });
      setReservations(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  const loadTables = async (restaurantId) => {
    if (!restaurantId) return;
    try {
      const res = await api.get("/tables", { params: { restaurant: restaurantId } });
      setTables(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tables");
    }
  };

  useEffect(() => {
    loadRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedRestaurantId) return;
    loadReservations(selectedRestaurantId, dateFilter);
    loadTables(selectedRestaurantId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRestaurantId]);

  const handleFilter = (e) => {
    e.preventDefault();
    loadReservations(selectedRestaurantId, dateFilter);
  };

  const handleClearFilter = () => {
    setDateFilter("");
    loadReservations(selectedRestaurantId);
  };

  const handleAdminCancel = async (id) => {
    if (!window.confirm("Cancel this reservation?")) return;
    setError("");
    setSuccess("");
    try {
      await api.patch(`/reservations/${id}/admin-cancel`);
      setSuccess("Reservation cancelled.");
      loadReservations(selectedRestaurantId, dateFilter);
    } catch (err) {
      setError(err.response?.data?.message || "Could not cancel reservation");
    }
  };

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await api.post("/restaurants", newRestaurant);
      setSuccess(`Restaurant "${res.data.data.name}" added.`);
      setNewRestaurant({ name: "", tagline: "", cuisine: "", city: "", description: "", heroImage: "" });
      const updated = await loadRestaurants();
      setSelectedRestaurantId(res.data.data._id);
      loadTables(res.data.data._id);
      loadReservations(res.data.data._id);
      void updated;
    } catch (err) {
      setError(err.response?.data?.message || "Could not add restaurant");
    }
  };

  const handleDeactivateRestaurant = async (id, name) => {
    if (!window.confirm(`Deactivate "${name}"? This also deactivates its tables.`)) return;
    setError("");
    setSuccess("");
    try {
      await api.delete(`/restaurants/${id}`);
      setSuccess(`"${name}" deactivated.`);
      const updated = await loadRestaurants();
      if (selectedRestaurantId === id) {
        const next = updated.find((r) => r._id !== id);
        setSelectedRestaurantId(next?._id || "");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Could not deactivate restaurant");
    }
  };

  const handleAddTable = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.post("/tables", {
        restaurant: selectedRestaurantId,
        label: newTable.label,
        capacity: Number(newTable.capacity),
      });
      setSuccess(`Table ${newTable.label} added.`);
      setNewTable({ label: "", capacity: "" });
      loadTables(selectedRestaurantId);
    } catch (err) {
      setError(err.response?.data?.message || "Could not add table");
    }
  };

  const handleDeactivateTable = async (id, label) => {
    if (!window.confirm(`Deactivate table ${label}?`)) return;
    setError("");
    setSuccess("");
    try {
      await api.delete(`/tables/${id}`);
      setSuccess(`Table ${label} deactivated.`);
      loadTables(selectedRestaurantId);
    } catch (err) {
      setError(err.response?.data?.message || "Could not deactivate table");
    }
  };

  const confirmedCount = reservations.filter((r) => r.status === "confirmed").length;
  const cancelledCount = reservations.filter((r) => r.status === "cancelled").length;
  const totalGuests = reservations
    .filter((r) => r.status === "confirmed")
    .reduce((sum, r) => sum + (r.guests || 0), 0);

  const selectedRestaurant = restaurants.find((r) => r._id === selectedRestaurantId);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">Front of house</div>
          <h1>Admin dashboard</h1>
          <p>Manage restaurants, tables, and today's reservations in one place.</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <section className="card">
        <h2>Restaurants</h2>
        <div className="perf-divider">
          <span className="perf-dot" />
        </div>
        <form className="table-form" onSubmit={handleAddRestaurant}>
          <label>
            Name
            <input
              type="text"
              placeholder="e.g. Willow & Salt"
              value={newRestaurant.name}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
              required
            />
          </label>
          <label>
            Cuisine
            <input
              type="text"
              placeholder="e.g. Contemporary Grill"
              value={newRestaurant.cuisine}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, cuisine: e.target.value })}
              required
            />
          </label>
          <label>
            City / area
            <input
              type="text"
              placeholder="e.g. Riverside"
              value={newRestaurant.city}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, city: e.target.value })}
            />
          </label>
          <label>
            Tagline
            <input
              type="text"
              placeholder="Short one-liner"
              value={newRestaurant.tagline}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, tagline: e.target.value })}
            />
          </label>
          <label style={{ minWidth: 260, flex: 1 }}>
            Hero image URL
            <input
              type="url"
              placeholder="https://..."
              value={newRestaurant.heroImage}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, heroImage: e.target.value })}
              required
            />
          </label>
          <button type="submit" className="btn btn-primary btn-sm">
            Add restaurant
          </button>
        </form>

        {restaurants.length === 0 ? (
          <p className="empty-state">No restaurants yet — add your first one above.</p>
        ) : (
          <div className="table-chip-grid">
            {restaurants.map((r) => (
              <div className="table-chip" key={r._id}>
                <span className="chip-label">{r.name}</span>
                <span className="chip-capacity">{r.cuisine}</span>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleDeactivateRestaurant(r._id, r.name)}
                >
                  Deactivate
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {restaurants.length > 0 && (
        <>
          <section className="card">
            <h2>Managing: {selectedRestaurant?.name || "—"}</h2>
            <div className="perf-divider">
              <span className="perf-dot" />
            </div>
            <div className="reservation-form">
              <label>
                Restaurant
                <select
                  value={selectedRestaurantId}
                  onChange={(e) => setSelectedRestaurantId(e.target.value)}
                >
                  {restaurants.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-label">Confirmed</div>
                <div className="stat-value">{confirmedCount}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Cancelled</div>
                <div className="stat-value">{cancelledCount}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Guests seated</div>
                <div className="stat-value">{totalGuests}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Active tables</div>
                <div className="stat-value">{tables.length}</div>
              </div>
            </div>
          </section>

          <section className="card">
            <h2>Reservations</h2>
            <div className="perf-divider">
              <span className="perf-dot" />
            </div>
            <form className="filter-form" onSubmit={handleFilter}>
              <label>
                Filter by date
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </label>
              <button type="submit" className="btn btn-primary btn-sm">
                Filter
              </button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={handleClearFilter}>
                Clear
              </button>
            </form>

            {loading ? (
              <p className="page-loading">Loading reservations…</p>
            ) : reservations.length === 0 ? (
              <p className="empty-state">No reservations found for this restaurant.</p>
            ) : (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Table</th>
                      <th>Guests</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((r) => (
                      <tr key={r._id}>
                        <td>
                          {r.customer?.name}
                          <div className="subtext">{r.customer?.email}</div>
                        </td>
                        <td>{r.date}</td>
                        <td>{r.timeSlot}</td>
                        <td>{r.table?.label || "—"}</td>
                        <td>{r.guests}</td>
                        <td>
                          <span className={`status-badge status-${r.status}`}>{r.status}</span>
                        </td>
                        <td>
                          {r.status === "confirmed" && (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleAdminCancel(r._id)}
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="card">
            <h2>Tables at {selectedRestaurant?.name}</h2>
            <div className="perf-divider">
              <span className="perf-dot" />
            </div>
            <form className="table-form" onSubmit={handleAddTable}>
              <label>
                Label
                <input
                  type="text"
                  placeholder="e.g. T7"
                  value={newTable.label}
                  onChange={(e) => setNewTable({ ...newTable, label: e.target.value })}
                  required
                />
              </label>
              <label>
                Capacity
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 4"
                  value={newTable.capacity}
                  onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                  required
                />
              </label>
              <button type="submit" className="btn btn-primary btn-sm">
                Add table
              </button>
            </form>

            {tables.length === 0 ? (
              <p className="empty-state">No tables yet — add the first one above.</p>
            ) : (
              <div className="table-chip-grid">
                {tables.map((t) => (
                  <div className="table-chip" key={t._id}>
                    <span className="chip-label">{t.label}</span>
                    <span className="chip-capacity">Seats {t.capacity}</span>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleDeactivateTable(t._id, t.label)}
                    >
                      Deactivate
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
