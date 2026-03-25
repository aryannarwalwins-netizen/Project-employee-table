import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";
import type { Employee } from "../services/api";
import { Link } from "react-router-dom";

const activityFeed = [
    { text: "New employee John Doe added", time: "2 min ago" },
    { text: "Jane Smith profile updated", time: "1 hr ago" },
    { text: "Report Q1 generated", time: "3 hr ago" },
    { text: "5 employees marked inactive", time: "Yesterday" },
    { text: "System backup completed", time: "Yesterday" },
];

const Dashboard = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEmployees()
            .then(setEmployees)
            .catch(() => setError("Failed to load employee data."))
            .finally(() => setLoading(false));
    }, []);

    const total = employees.length;
    // Simulate: odd IDs = active, even IDs = inactive
    const active = employees.filter((e) => e.id % 2 !== 0).length;
    const inactive = total - active;

    return (
        <div>
            <div className="page-header">
                <h1>Dashboard</h1>
                <p>Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Cards */}
            {loading ? (
                <div className="state-container">
                    <div className="spinner" />
                    <div className="state-desc">Loading stats…</div>
                </div>
            ) : error ? (
                <div className="alert alert-error">{error}</div>
            ) : (
                <div className="stats-grid">
                    <div
                        className="stat-card"
                        style={
                            {
                                "--card-accent": "var(--primary)",
                                "--card-icon-bg": "rgba(99,102,241,0.12)",
                            } as React.CSSProperties
                        }
                    >
                        <div className="stat-icon">👥</div>
                        <div className="stat-info">
                            <div className="label">Total Employees</div>
                            <div className="value">{total}</div>
                        </div>
                    </div>

                    <div
                        className="stat-card"
                        style={
                            {
                                "--card-accent": "var(--success)",
                                "--card-icon-bg": "rgba(16,185,129,0.12)",
                            } as React.CSSProperties
                        }
                    >
                        <div className="stat-icon">✅</div>
                        <div className="stat-info">
                            <div className="label">Active Employees</div>
                            <div className="value" style={{ color: "var(--success)" }}>
                                {active}
                            </div>
                        </div>
                    </div>

                    <div
                        className="stat-card"
                        style={
                            {
                                "--card-accent": "var(--danger)",
                                "--card-icon-bg": "rgba(239,68,68,0.12)",
                            } as React.CSSProperties
                        }
                    >
                        <div className="stat-icon">⛔</div>
                        <div className="stat-info">
                            <div className="label">Inactive Employees</div>
                            <div className="value" style={{ color: "var(--danger)" }}>
                                {inactive}
                            </div>
                        </div>
                    </div>

                    <div
                        className="stat-card"
                        style={
                            {
                                "--card-accent": "var(--accent)",
                                "--card-icon-bg": "rgba(6,182,212,0.12)",
                            } as React.CSSProperties
                        }
                    >
                        <div className="stat-icon">🏢</div>
                        <div className="stat-info">
                            <div className="label">Departments</div>
                            <div className="value" style={{ color: "var(--accent)" }}>
                                {new Set(employees.map((e) => e.company?.name)).size}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Section */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {/* Recent Employees */}
                <div className="section-card">
                    <div className="section-card-header">
                        <h2>Recent Employees</h2>
                        <Link className="btn btn-outline" to="/employees">
                            View All →
                        </Link>
                    </div>
                    <div>
                        {loading ? null : (
                            <table className="emp-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Company</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.slice(0, 5).map((emp) => (
                                        <tr key={emp.id}>
                                            <td>
                                                <Link
                                                    to={`/employees/${emp.id}`}
                                                    className="emp-name-link"
                                                >
                                                    {emp.name}
                                                </Link>
                                            </td>
                                            <td style={{ color: "var(--text-muted)", fontSize: 12 }}>
                                                {emp.company?.name}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="section-card">
                    <div className="section-card-header">
                        <h2>Recent Activity</h2>
                    </div>
                    <div className="section-card-body">
                        <div className="activity-list">
                            {activityFeed.map((a, i) => (
                                <div key={i} className="activity-item">
                                    <div className="activity-dot" />
                                    <div className="activity-text">{a.text}</div>
                                    <div className="activity-time">{a.time}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;