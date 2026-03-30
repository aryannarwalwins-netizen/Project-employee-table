import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export interface Employee {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: { lat: string; lng: string };
    };
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export interface NewEmployee {
    name: string;
    email: string;
    phone: string;
    company: string;
    street: string;
    city: string;
    zipcode: string;
}

export const fetchEmployees = async (): Promise<Employee[]> => {
    const res = await axios.get(`${BASE_URL}/users`);
    return res.data;
};

export const fetchEmployeeById = async (id: number): Promise<Employee> => {
    const res = await axios.get(`${BASE_URL}/users/${id}`);
    return res.data;
};

export const createEmployee = async (data: NewEmployee): Promise<Employee> => {
    const added: Employee[] = JSON.parse(localStorage.getItem("added_employees") || "[]");
    const newId = 10 + added.length + 1;
    const res = await axios.post(`${BASE_URL}/users`, {
        name: data.name,
        username: data.name.toLowerCase().replace(/\s+/g, "."),
        email: data.email,
        phone: data.phone,
        website: "",
        address: { street: data.street, suite: "", city: data.city, zipcode: data.zipcode, geo: { lat: "", lng: "" } },
        company: { name: data.company, catchPhrase: "", bs: "" },
    });
    return { ...res.data, id: newId };
};

