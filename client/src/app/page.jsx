"use client";

import { useState } from "react";
import { createLead } from "@/services/lead.service";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await createLead(formData);

      setSuccess("Lead submitted successfully.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong."
      );
    }

    setLoading(false);
  };

  const fieldClass =
    "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-signal)] focus:outline-none";

  return (
    <>
      <main className="flex-1 bg-[var(--color-navy)]">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="text-white">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-[var(--color-signal)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-signal)]" />
              Talk to our team
            </span>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Lead Management System
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
              Fill out the form and a member of our team will reach out shortly.
              Every submission is tracked from first contact to close.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-6 shadow-xl sm:p-8">
            <h2 className="mb-1 text-lg font-semibold text-[var(--color-ink)]">Get in touch</h2>
            <p className="mb-6 text-sm text-[var(--color-ink-faint)]">Tell us a bit about what you need.</p>

            {success && (
              <p className="mb-4 rounded-lg bg-[var(--color-won-bg)] px-3 py-2 text-sm font-medium text-[var(--color-won)]">
                {success}
              </p>
            )}

            {error && (
              <p className="mb-4 rounded-lg bg-[var(--color-lost-bg)] px-3 py-2 text-sm font-medium text-[var(--color-lost)]">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={fieldClass}
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={fieldClass}
              />

              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={fieldClass}
              />

              <input
                name="company"
                placeholder="Company (optional)"
                value={formData.company}
                onChange={handleChange}
                className={fieldClass}
              />

              <textarea
                name="message"
                placeholder="Message (optional)"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className={fieldClass}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[var(--color-signal)] py-2.5 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-signal-dark)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Submitting..." : "Submit Lead"}
              </button>
            </form>
            <p className="mt-5 text-center text-sm text-[var(--color-ink-faint)]">
              Part of Lead Management System?{" "}
              <Link href="/login" className="font-semibold text-[var(--color-navy)] hover:text-[var(--color-signal-dark)]">
                Click here
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
