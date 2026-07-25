"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "member",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            await register(formData);
            router.push("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message || "Registration failed."
            );
        }
    };

    return (
        <main className="container">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit">
                    Register
                </button>
            </form>

            {error && <p>{error}</p>}
        </main>
    );
}