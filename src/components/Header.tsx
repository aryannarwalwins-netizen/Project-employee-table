const Header = () => {
    return (
        <>
          
            <div className="header-brand">
                <div className="logo-icon">👤</div>
                <span className="brand-name">EmpTrack</span>
            </div>

            {/* Main header bar */}
            <header className="header">
                <span className="header-title">Employee Management System</span>

                <div className="header-right">
                    <div className="header-avatar">
                        <div className="avatar-circle">AD</div>
                        <div className="avatar-info">
                            <div className="name">Admin User</div>
                            <div className="role">Administrator</div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
