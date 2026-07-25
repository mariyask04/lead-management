"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Footer from "@/components/Footer";

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
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await register(formData);
            router.push("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message || "Registration failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <main className="flex flex-1 items-center justify-center bg-[var(--color-bg)] px-6 py-12">
                <div className="w-full max-w-sm">
                    <div className="mb-6 text-center">
                        <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-navy)] text-sm font-bold text-[var(--color-signal)]">
                            L
                        </span>
                        <h1 className="text-xl font-semibold text-[var(--color-ink)]">Create an account</h1>
                        <p className="mt-1 text-sm text-[var(--color-ink-faint)]">Join the team to start managing leads.</p>
                    </div>

                    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-faint)]">Name</label>
                                <input
                                    name="name"
                                    placeholder="Full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-signal)] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-faint)]">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@company.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-signal)] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-faint)]">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-signal)] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-faint)]">Role</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] focus:border-[var(--color-signal)] focus:outline-none"
                                >
                                    <option value="member">Member</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            {error && (
                                <p className="rounded-lg bg-[var(--color-lost-bg)] px-3 py-2 text-xs font-medium text-[var(--color-lost)]">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-[var(--color-navy)] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-navy-soft)] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                            >
                                {loading ? "Creating account..." : "Register"}
                            </button>
                        </form>
                    </div>

                    <p className="mt-5 text-center text-sm text-[var(--color-ink-faint)]">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-[var(--color-navy)] hover:text-[var(--color-signal-dark)]">
                            Log in
                        </Link>
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
}
