import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import "../styles/dashboard.css";

export default function Bugs() {
  const [bugs, setBugs] = useState([]);
  const [developers, setDevelopers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");

  const role = localStorage.getItem("role");

  /* ------------------ FETCH DATA ------------------ */

  const fetchBugs = async () => {
    const res = await api.get("/bugs");
    setBugs(res.data);
  };

  const fetchDevelopers = async () => {
    const res = await api.get("/users?role=developer");
    setDevelopers(res.data);
  };

  useEffect(() => {
    fetchBugs();
    if (role === "admin") {
      fetchDevelopers();
    }
  }, []);

  /* ------------------ CREATE BUG ------------------ */

  const handleCreateBug = async (e) => {
    e.preventDefault();

    await api.post("/bugs", {
      title,
      description,
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority("Medium");

    fetchBugs();
  };

  /* ------------------ UPDATE STATUS ------------------ */

  const updateStatus = async (bugId, status) => {
    await api.patch(`/bugs/${bugId}/status`, { status });
    fetchBugs();
  };

  /* ------------------ ASSIGN BUG ------------------ */

  const assignBug = async (bugId, userId) => {
    await api.patch(`/bugs/${bugId}/assign`, {
      assignedTo: userId,
    });
    fetchBugs();
  };

  /* ------------------ HELPERS ------------------ */

  const getStatusClass = (status) =>
    `status status-${status.toLowerCase().replace(" ", "-")}`;

  const getPriorityClass = (priority) =>
    `priority priority-${priority.toLowerCase()}`;

  const filteredBugs =
    filter === "All"
      ? bugs
      : bugs.filter((bug) => bug.status === filter);

  /* ------------------ UI ------------------ */

  return (
    <Layout>
      <div className="dashboard-title">Bug Dashboard</div>

      {/* FILTERS */}
      <div className="status-filters">
        {["All", "Open", "In Progress", "Resolved", "Closed"].map((s) => (
          <button
            key={s}
            className={`filter-tab ${filter === s ? "active" : ""}`}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* CREATE BUG */}
      {(role === "tester" || role === "admin") && (
        <div className="create-bug-card">
          <div className="create-bug-title">Create New Bug</div>

          <form className="create-bug-form" onSubmit={handleCreateBug}>
            <input
              placeholder="Bug title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Bug description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>

            <button className="create-bug-btn">Create Bug</button>
          </form>
        </div>
      )}

      {/* EMPTY STATE */}
      {filteredBugs.length === 0 && (
        <div className="empty-state">
          🎉 No bugs found for this filter.
        </div>
      )}

      {/* BUG LIST */}
      {filteredBugs.map((bug) => (
        <div className="bug-card" key={bug._id}>
          <div className="bug-header">
            <div className="bug-title">{bug.title}</div>

            <div className="bug-tags">
              <span className={getStatusClass(bug.status)}>
                {bug.status}
              </span>
              <span className={getPriorityClass(bug.priority)}>
                {bug.priority}
              </span>
            </div>
          </div>

          <div className="bug-description">{bug.description}</div>

          {/* ASSIGNMENT */}
          <div className="assignment">
            Assigned to:{" "}
            {bug.assignedTo ? (
              <span className="assigned">{bug.assignedTo.name}</span>
            ) : (
              <span className="unassigned">Unassigned</span>
            )}

            {role === "admin" && (
              <select
                className="assign-select"
                onChange={(e) =>
                  assignBug(bug._id, e.target.value)
                }
                defaultValue=""
              >
                <option value="" disabled>
                  Assign Developer
                </option>
                {developers.map((dev) => (
                  <option key={dev._id} value={dev._id}>
                    {dev.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* STATUS ACTIONS */}
          {(role === "developer" || role === "admin") && (
            <div className="status-actions">
              {bug.status === "Open" && (
                <button
                  className="status-btn btn-progress"
                  onClick={() =>
                    updateStatus(bug._id, "In Progress")
                  }
                >
                  Start Progress
                </button>
              )}

              {bug.status === "In Progress" && (
                <button
                  className="status-btn btn-resolve"
                  onClick={() =>
                    updateStatus(bug._id, "Resolved")
                  }
                >
                  Resolve
                </button>
              )}

              {bug.status === "Resolved" && (
                <button
                  className="status-btn btn-close"
                  onClick={() =>
                    updateStatus(bug._id, "Closed")
                  }
                >
                  Close
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </Layout>
  );
}
