"use client";

import { useState } from "react";
import { createLead } from "@/services/lead.service";
import Footer from "@/components/Footer";

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

  return (
    <>
      <main style={{ maxWidth: "600px", margin: "40px auto" }}>
        <h1>Lead Management System</h1>

        <p>
          Fill out the form below and our team will contact you.
        </p>

        {success && (
          <p style={{ color: "green" }}>{success}</p>
        )}

        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <br />
          <br />

          <input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
          />

          <br />
          <br />

          <textarea
            name="message"
            placeholder="Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          />

          <br />
          <br />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Lead"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}