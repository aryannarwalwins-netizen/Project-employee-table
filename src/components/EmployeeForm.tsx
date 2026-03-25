import { useState } from "react";

interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
}

interface FormErrors {
    name?: string;
    email?: string;
}

interface Props {
    onSuccess?: (employee: FormData) => void;
}

const EmployeeForm = ({ onSuccess }: Props) => {
    const [form, setForm] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        company: "",

    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState(false);

    const validate = (): boolean => {
        const errs: FormErrors = {};
        if (!form.name.trim()) errs.name = "Name is required.";
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitted(true);
        onSuccess?.(form);
        setForm({ name: "", email: "", phone: "", company: "" });
        setErrors({});
        // setTimeout(() => setSubmitted(false), 4000);
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
                    <label>
                        Full Name <span className="required">*</span>
                    </label>
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
                    <label>
                        Email Address <span className="required">*</span>
                    </label>
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
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        id="emp-phone"
                        type="tel"
                        placeholder="e.g. +1 555-000-1234"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                    />
                </div>

                {/* Company */}
                <div className="form-group">
                    <label>Company</label>
                    <input
                        id="emp-company"
                        type="text"
                        placeholder="e.g. Acme Corp"
                        value={form.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                    />
                </div>
            </div>

            <div className="form-actions">
                <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                        setForm({ name: "", email: "", phone: "", company: "" });
                        setErrors({});
                    }}
                >
                    Reset
                </button>
                <button type="submit" className="btn btn-primary">
                    ➕ &nbsp;Add Employee
                </button>
            </div>
        </form>
    );
};

export default EmployeeForm;