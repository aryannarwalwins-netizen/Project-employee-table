import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import EmployeeDetails from "./pages/EmployeeDetails";
import AddEmployee from "./pages/AddEmployee";
import { EmployeeProvider } from "./context/EmployeeContext";
import "./index.css";

function App() {
    return (
        <BrowserRouter>
            <EmployeeProvider>
                <Header />
                <div className="app-layout">
                    <Sidebar />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/employees" element={<Employees />} />
                            <Route path="/employees/add" element={<AddEmployee />} />
                            <Route path="/employees/:id" element={<EmployeeDetails />} />
                        </Routes>
                    </main>
                </div>
            </EmployeeProvider>
        </BrowserRouter>
    );
}

export default App;
