import "../styles/layout.css";

export default function Navbar() {
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        🐞 <span className="app-title">Bug Tracker</span>
      </div>

      <div className="navbar-right">
        <span className="role-badge">{role}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
