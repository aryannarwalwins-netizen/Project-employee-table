import { NavLink,} from "react-router-dom";

const navItems = [
    { to: "/", icon: "🏠", label: "Dashboard", exact: true },
    { to: "/employees", icon: "👥", label: "Employees", badge: "0" },
    { to: "/employees/add", icon: "➕", label: "Add Employee" },
];

const reportsItems = [
    { icon: "📊", label: "Reports", disabled: true },
    { icon: "📁", label: "Documents", disabled: true },
];

const Sidebar = () => {
    // const location = useLocation();

    return (
        <aside className="sidebar">
            <div className="sidebar-section-label">Main Menu</div>

            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.exact}
                    className={({ isActive }) =>
                        "sidebar-link" + (isActive ? " active" : "")
                    }
                >
                    <span className="nav-icon">{item.icon}</span>
                    {item.label}
                    {item.badge && <span className="badge">{item.badge}</span>}
                </NavLink>
            ))}

            <div className="sidebar-section-label">Analytics</div>
            {reportsItems.map((item) => (
                <div key={item.label} className="sidebar-link disabled">
                    <span className="nav-icon">{item.icon}</span>
                    {item.label}
                </div>
            ))}

            <div className="sidebar-section-label">Settings</div>
            <div className="sidebar-link disabled">
                <span className="nav-icon">⚙️</span>
                Settings
            </div>
        </aside>
    );
};

export default Sidebar;
