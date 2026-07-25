"use client";

import { useState } from "react";
import Link from "next/link";
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
            const data = await login(formData);

            if (data.user?.role === "admin" || data.user?.role === "member") {
                router.push("/dashboard");
            }
        } catch (error) {
            setError(
                error.response?.data?.message || "Login failed."
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
                        <h1 className="text-xl font-semibold text-[var(--color-ink)]">Welcome back</h1>
                        <p className="mt-1 text-sm text-[var(--color-ink-faint)]">Log in to manage your leads.</p>
                    </div>

                    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                {loading ? "Logging in..." : "Log In"}
                            </button>
                        </form>
                    </div>

                    <p className="mt-5 text-center text-sm text-[var(--color-ink-faint)]">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="font-semibold text-[var(--color-navy)] hover:text-[var(--color-signal-dark)]">
                            Register
                        </Link>
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
}
