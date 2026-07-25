"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import StatsCards from "@/components/StatsCards";
import LeadTable from "@/components/LeadTable";

import { getLeadStats, getLeads } from "@/services/lead.service";

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [leads, setLeads] = useState([]);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const fetchDashboard = async () => {
        try {
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
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, [page, search, status]);

    return (
        <ProtectedRoute>
            <Navbar />

            <main style={{ padding: "30px" }}>
                <h1>Dashboard</h1>

                <StatsCards stats={stats} />

                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        marginBottom: "20px",
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search leads..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />

                    <select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setPage(1);
                        }}
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

                <LeadTable leads={leads} />

                <div
                    style={{
                        marginTop: "20px",
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                    }}
                >
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        Previous
                    </button>

                    <span>
                        Page {page} of {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </div>
            </main>
        </ProtectedRoute>
    );
}