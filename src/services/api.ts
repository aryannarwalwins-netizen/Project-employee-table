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

export const fetchEmployees = async (): Promise<Employee[]> => {
    const res = await axios.get(`${BASE_URL}/users`);
    return res.data;
};

export const fetchEmployeeById = async (id: number): Promise<Employee> => {
    const res = await axios.get(`${BASE_URL}/users/${id}`);
    return res.data;
};
