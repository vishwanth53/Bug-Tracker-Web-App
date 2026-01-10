import "../styles/layout.css";

export default function Layout({ children }) {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          🐞 <span className="app-title">Bug Tracker</span>
        </div>

        <div className="navbar-right">
          {name && (
            <span className="user-badge">
              {name} <span className="user-role">({role})</span>
            </span>
          )}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <main className="app-container">{children}</main>
    </>
  );
}


