import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { useEmployeeContext } from "../context/EmployeeContext";
import type { Employee } from "../services/api";

const AddEmployee = () => {
    const { addEmployee } = useEmployeeContext();
    const navigate = useNavigate();
    const [added, setAdded] = useState<Employee[]>([]);

    const handleSuccess = (emp: Employee) => {
        addEmployee(emp);
        setAdded((prev) => [emp, ...prev]);
        navigate("/employees");
    };

    return (
        <div>
            <Link to="/employees" className="back-btn">← Back to Employees</Link>

            <div className="page-header">
                <h1>Add Employee</h1>
                <p>Fill in the form below to add a new employee to the system.</p>
            </div>

           <div className="section-card">
                <div className="section-card-header"><h2>Employee Information</h2></div>
                <div className="section-card-body">
                    <EmployeeForm onSuccess={handleSuccess} />
                </div>
            </div>

            {added.length > 0 && (
                <div className="section-card" style={{ marginTop: 24 }}>
                    <div className="section-card-header">
                        <h2>Added This Session ({added.length})</h2>
                        <Link to="/employees" className="btn btn-outline">Go to Employees →</Link>
                    </div>
                    <div className="table-wrapper">
                        <table className="emp-table">
                            <thead>
                                <tr><th>Name</th><th>Email</th><th>Phone</th><th>Company</th></tr>
                            </thead>
                            <tbody>
                                {added.map((emp, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600, color: "var(--text-heading)" }}>{emp.name}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.phone || "—"}</td>
                                        <td>{emp.company?.name || "—"}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};
export default AddEmployee;
