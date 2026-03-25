import { Link } from "react-router-dom";
import type { Employee } from "../services/api";

interface Props {
    data: Employee[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const getInitials = (name: string) =>
    name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

const EmployeeTable = ({
    data,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
}: Props) => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);

    if (data.length === 0) {
        return (
            <div className="no-results">
                <div className="icon">🔍</div>
                <div>No employees found matching your search.</div>
            </div>
        );
    }

    return (
        <>
            <div className="table-wrapper">
                <table className="emp-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Employee</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Company</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((emp, idx) => (
                            <tr key={emp.id}>
                                <td style={{ color: "var(--text-muted)", width: "48px" }}>
                                    {(currentPage - 1) * itemsPerPage + idx + 1}
                                </td>
                                <td>
                                    <div className="emp-name-cell">
                                        <div className="emp-avatar">{getInitials(emp.name)}</div>
                                        <div>
                                            <Link
                                                to={`/employees/${emp.id}`}
                                                className="emp-name-link"
                                            >
                                                {emp.name}
                                            </Link>
                                            <div className="emp-meta">@{emp.username}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{emp.email}</td>
                                <td>{emp.phone}</td>
                                <td>{emp.company?.name}</td>
                                <td>
                                    <span className="emp-badge">● Active</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
                <div className="pagination-info">
                    Showing <strong>{start}–{end}</strong> of <strong>{totalItems}</strong> employees
                </div>
                <div className="pagination-btns">
                    <button
                        className="page-btn"
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                        title="First page"
                    >
                        «
                    </button>
                    <button
                        className="page-btn"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        title="Previous page"
                    >
                        ‹
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            className={`page-btn ${p === currentPage ? "active" : ""}`}
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </button>
                    ))}

                    <button
                        className="page-btn"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        title="Next page"
                    >
                        ›
                    </button>
                    <button
                        className="page-btn"
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        title="Last page"
                    >
                        »
                    </button>
                </div>
            </div>
        </>
    );
};

export default EmployeeTable;