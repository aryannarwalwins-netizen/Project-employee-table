import { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";
import { useEmployeeContext } from "../context/EmployeeContext";

const ITEMS_PER_PAGE = 10;

const Employees = () => {
    const { employees, loading, error } = useEmployeeContext();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<"asc" | "desc">("asc");
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = (val: string) => { setSearch(val); setCurrentPage(1); };
    const handleSort = (val: "asc" | "desc") => { setSort(val); setCurrentPage(1); };

    const filtered = employees
        .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sort === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div>
            <div className="page-header">
                <h1>Employees</h1>
                <p>Manage and view all your company's employees.</p>
            </div>

            <div className="section-card">
                <div className="section-card-header">
                    <div className="controls-bar">
                        <div className="search-box">
                            <span className="search-icon">🔍</span>
                            <input
                                id="employee-search"
                                type="text"
                                placeholder="Search by name…"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                        <select
                            id="employee-sort"
                            className="sort-select"
                            value={sort}
                            onChange={(e) => handleSort(e.target.value as "asc" | "desc")}
                        >
                            <option value="asc">Name: A → Z</option>
                            <option value="desc">Name: Z → A</option>
                        </select>
                    </div>
                    <Link to="/employees/add" className="btn btn-primary">
                        ➕ &nbsp;Add Employee
                    </Link>
                </div>

                {loading ? (
                    <div className="state-container">
                        <div className="spinner" />
                        <div className="state-title">Loading employees…</div>
                        <div className="state-desc">Fetching from API, please wait.</div>
                    </div>
                ) : error ? (
                    <div style={{ padding: 24 }}>
                        <div className="alert alert-error">{error}</div>
                        <button className="btn btn-outline" onClick={() => window.location.reload()}>Retry</button>
                    </div>
                ) : (
                    <EmployeeTable
                        data={paginated}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={filtered.length}
                        itemsPerPage={ITEMS_PER_PAGE}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </div>
    );
};

export default Employees;
