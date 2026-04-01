import { createContext, useContext, useState, useEffect } from "react";
import { fetchEmployees } from "../services/api";
import type { Employee } from "../services/api";

interface EmployeeContextType {
    employees: Employee[];
    loading: boolean;
    error: string | null;
    addEmployee: (emp: Employee) => void;
}

const EmployeeContext = createContext<EmployeeContextType | null>(null);

export const EmployeeProvider = ({ children }: { children: React.ReactNode }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
   
    useEffect(() => {
        fetchEmployees()
            .then(setEmployees)
            .catch(() => setError("Failed to fetch employees. Please try again."))
            .finally(() => setLoading(false));
    }, []);

    const addEmployee = (emp: Employee) => {
        setEmployees((prev) => [...prev, emp]);
    };

    return (
        <EmployeeContext.Provider value={{ employees, loading, error, addEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployeeContext = () => {
    const ctx = useContext(EmployeeContext);
    if (!ctx) throw new Error("useEmployeeContext must be used inside EmployeeProvider");
    return ctx;
};

