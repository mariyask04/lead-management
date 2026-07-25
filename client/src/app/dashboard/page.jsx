"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import StatsCards from "@/components/StatsCards";
import LeadTable from "@/components/LeadTable";

import { getLeadStats, getLeads } from "@/services/lead.service";
import Footer from "@/components/Footer";

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [leads, setLeads] = useState([]);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {
        try {
            setLoading(true);

            const statsData = await getLeadStats();

            const leadData = await getLeads({
                page,
                search,
                status,
            });

            setStats(statsData);
            setLeads(leadData.leads);
            setTotalPages(leadData.totalPages);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, [page, search, status]);

    return (
        <ProtectedRoute>
            <Navbar />

            <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-[var(--color-ink)]">Dashboard</h1>
                    <p className="mt-1 text-sm text-[var(--color-ink-faint)]">
                        Track every lead through your pipeline, from first contact to close.
                    </p>
                </div>

                <StatsCards stats={stats} />

                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative flex-1 sm:max-w-xs">
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--color-ink-faint)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2 pl-9 pr-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-signal)] focus:outline-none"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] focus:border-[var(--color-signal)] focus:outline-none"
                    >
                        <option value="">All Status</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                    </select>
                </div>

                <div className={loading ? "opacity-60 transition-opacity" : "transition-opacity"}>
                    <LeadTable leads={leads} />
                </div>

                <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-muted)] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                    >
                        Previous
                    </button>

                    <span className="font-mono text-xs text-[var(--color-ink-faint)]">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-muted)] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </main>
            <Footer />
        </ProtectedRoute>
    );
}
