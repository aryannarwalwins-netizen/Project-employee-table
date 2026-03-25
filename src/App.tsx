import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import EmployeeDetails from "./pages/EmployeeDetails";
import AddEmployee from "./pages/AddEmployee";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/:id" element={<EmployeeDetails />} />
            <Route path="/employees/add" element={<AddEmployee />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;