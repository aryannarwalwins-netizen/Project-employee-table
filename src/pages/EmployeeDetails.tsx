import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchEmployeeById } from "../services/api";
import type { Employee } from "../services/api";
import { useEmployeeContext } from "../context/EmployeeContext";

const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const EmployeeDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { employees } = useEmployeeContext();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const found = employees.find((e) => String(e.id) === id);

        if (found) {
            setEmployee(found);
            setLoading(false);
            return;
        }

        fetchEmployeeById(Number(id))
            .then(setEmployee)
            .catch(() => setError("Employee not found or failed to load."))
            .finally(() => setLoading(false));
    }, [id, employees]);

    if (loading) {
        return (
            <div className="state-container">
                <div className="spinner" />
                <div className="state-title">Loading employee…</div>
            </div>
        );
    }

    if (error || !employee) {
        return (
            <div>
                <div className="alert alert-error">{error ?? "Employee not found."}</div>
                <Link to="/employees" className="btn btn-outline">
                    ← Back to Employees
                </Link>
            </div>
        );
    }
     
    return (
        <div>
            <Link to="/employees" className="back-btn">
                ← Back to Employees
            </Link>
        
            <div className="section-card">
                <div className="employee-hero">
                    <div className="big-avatar">{getInitials(employee.name)}</div>

                    <div className="hero-info">

                        <h2>{employee.name}</h2>
                        <div className="username">@{employee.username}</div>
                    </div>
                    <span className="emp-badge" style={{ marginLeft: "auto" }}>
                        ● Active
                    </span>
                </div>

                <div className="section-card-body">
                    <div className="section-card-header" style={{ padding: "16px 0", border: "none" }}>
                        <h2 style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                            Contact Information
                        </h2>
                    </div>
                    <div className="detail-grid" style={{ marginBottom: 32 }}>

                        <div className="detail-item">

                            <div className="dl">📧 Email</div>

                            <div className="dd">{employee.email}</div>

                        </div>

                        <div className="detail-item">

                            <div className="dl">📞 Phone</div>

                            <div className="dd">{employee.phone}</div>
                        </div>
                        <div className="detail-item">

                            <div className="dl">🌐 Website</div>

                            <div className="dd">{employee.website}</div>
                        </div>
                    </div>

                    <div className="section-card-header" style={{ padding: "16px 0", border: "none" }}>
                        <h2 style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                            Address
                        </h2>
                    </div>

                    <div className="detail-grid" style={{ marginBottom: 32 }}>

                        <div className="detail-item">

                            <div className="dl">🏠 Street</div>
                            <div className="dd">{employee.address.street}, {employee.address.suite}</div>
                        </div>
                        <div className="detail-item">
                            <div className="dl">🏙️ City</div>
                            <div className="dd">{employee.address.city}</div>
                        </div>
                        <div className="detail-item">
                            <div className="dl">📮 Zipcode</div>
                            <div className="dd">{employee.address.zipcode}</div>
                        </div>
                        <div className="detail-item">
                            <div className="dl">📍 Coordinates</div>
                            <div className="dd">{employee.address.geo.lat}, {employee.address.geo.lng}</div>
                        </div>
                    </div>

                    <div className="section-card-header" style={{ padding: "16px 0", border: "none" }}>
                        <h2 style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                            Company Details
                        </h2>
                    </div>
                    <div className="detail-grid">
                        <div className="detail-item">
                            <div className="dl">🏢 Company Name</div>
                            <div className="dd">{employee.company.name}</div>
                        </div>
                        <div className="detail-item">
                            <div className="dl">💡 Catch Phrase</div>
                            <div className="dd">{employee.company.catchPhrase}</div>
                        </div>
                        <div className="detail-item">
                            <div className="dl">📋 Business</div>
                            <div className="dd">{employee.company.bs}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;