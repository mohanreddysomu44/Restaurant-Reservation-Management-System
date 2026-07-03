import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BrandMark from "./BrandMark";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${user?.role === "admin" ? "navbar-admin" : ""}`}>
      <div className="navbar-brand">
        <Link
          to={user ? (user.role === "admin" ? "/admin" : "/customer") : "/"}
          onClick={() => setMenuOpen(false)}
        >
          <BrandMark />
          Bookend 
          {user?.role === "admin" && <span className="admin-badge">ADMIN</span>}
        </Link>
      </div>

      <button
        className="navbar-toggle btn btn-ghost btn-sm"
        onClick={() => setMenuOpen((o) => !o)}
        aria-expanded={menuOpen}
        aria-label="Toggle menu"
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      <div className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`}>
        {user?.role === "customer" && (
          <Link to="/" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>
            Browse
          </Link>
        )}
        {user ? (
          <>
            <span className="navbar-user">
              <strong>{user.name}</strong> · {user.role}
            </span>
            <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
              Reserve a table
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
