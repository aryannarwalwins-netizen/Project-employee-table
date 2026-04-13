import { useState } from "react";
import { createEmployee } from "../services/api";
import type { NewEmployee, Employee } from "../services/api";

type FormData = NewEmployee;

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
}

interface Props {
    onSuccess?: (employee: Employee) => void;
}

const EMPTY: FormData = { name: "", email: "", phone: "", company: "", street: "", city: "", zipcode: "" };

const EmployeeForm = ({ onSuccess }: Props) => {
    const [form, setForm] = useState<FormData>(EMPTY);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = (): boolean => {
        const errs: FormErrors = {};
        if (!form.name.trim()) errs.name = "Name is required.";
        if (!form.company.trim()) errs.company = "company is required";
        if (!form.phone.trim()) errs.phone = "phone is required";
        if (!form.email.trim()) {
            errs.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            errs.email = "Enter a valid email address.";
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const created = await createEmployee(form);
            setSubmitted(true);
            onSuccess?.(created);
            setForm(EMPTY);
            setErrors({});
            setTimeout(() => setSubmitted(false), 4000);
        } catch {
            setErrors({ email: "Failed to add employee. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            {submitted && (
                <div className="alert alert-success">
                    ✅ &nbsp; Employee added successfully!
                </div>
            )}

            <div className="form-grid">
                {/* Name */}
                <div className={`form-group ${errors.name ? "error" : ""}`}>
                    <label>Full Name <span className="required">*</span></label>
                    <input
                        id="emp-name"
                        type="text"
                        placeholder="e.g. John Smith"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className={`form-group ${errors.email ? "error" : ""}`}>
                    <label>Email Address <span className="required">*</span></label>
                    <input
                        id="emp-email"
                        type="email"
                        placeholder="e.g. john@company.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>

                {/* Phone */}
                <div className={`form-group ${errors.phone ? "error" : ""}`}>
                    <label>Phone Number</label>
                    <input
                        id="emp-phone"
                        type="tel"
                        placeholder="e.g. +1 555-000-1234"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                    />
                    {errors.phone && <span className="error-msg">{errors.phone}</span>}
                </div>

                {/* Company */}
                <div className={`form-group ${errors.company ? "error" : ""}`}>
                    <label>Company</label>
                    <input
                        id="emp-company"
                        type="text"
                        placeholder="e.g. Acme Corp"
                        value={form.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                    />
                    {errors.company && <span className="error-msg">{errors.company}</span>}
                </div>
            </div>

            {/* Company Address */}
            <div className="form-grid" style={{ marginTop: 16 }}>
                <div style={{ gridColumn: "1 / -1", fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1 }}>
                    Company Address
                </div>

                {/* Street */}
                <div className="form-group">
                    <label>Street</label>
                    <input
                        id="emp-street"
                        type="text"
                        placeholder="e.g. 123 Main St"
                        value={form.street}
                        onChange={(e) => handleChange("street", e.target.value)}
                    />
                </div>

                {/* City */}
                <div className="form-group">
                    <label>City</label>
                    <input
                        id="emp-city"
                        type="text"
                        placeholder="e.g. New York"
                        value={form.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                    />
                </div>

                {/* Zipcode */}
                <div className="form-group">
                    <label>Zipcode</label>
                    <input
                        id="emp-zipcode"
                        type="text"
                        placeholder="e.g. 10001"
                        value={form.zipcode}
                        onChange={(e) => handleChange("zipcode", e.target.value)}
                    />
                </div>
            </div>

            <div className="form-actions">
                <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => { setForm(EMPTY); setErrors({}); }}
                >
                    Reset
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Adding…" : "➕  Add Employee"}
                </button>
            </div>
        </form>
    );
};

export default EmployeeForm;
