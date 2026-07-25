"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Footer from "@/components/Footer";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
            const data = await login(formData);

            if (data.user?.role === "admin" || data.user?.role === "member") {
                router.push("/dashboard");
            }
        } catch (error) {
            setError(
                error.response?.data?.message || "Login failed."
            );
        }
    };

    return (
        <>
            <main className="container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
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

                    <button type="submit">
                        Login
                    </button>
                </form>

                {error && <p>{error}</p>}
            </main>
            <Footer />
        </>
    );
}