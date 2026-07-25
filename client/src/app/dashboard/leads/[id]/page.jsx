"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

import { getUsers } from "@/services/user.service";
import {
    getLeadById,
    updateLeadStatus,
    assignLead,
    updateLead,
    deleteLead,
} from "@/services/lead.service";
import { addNote, getNotes } from "@/services/note.service";
import { useAuth } from "@/context/AuthContext";
import { getActivities } from "@/services/activity.service";
import NoteList from "@/components/NoteList";
import ActivityTimeline from "@/components/ActivityTimeline";
import Footer from "@/components/Footer";
import { STATUSES, getStatusStyle, initials } from "@/lib/statusConfig";

export default function LeadDetailsPage() {
    const { id } = useParams();

    const [lead, setLead] = useState(null);
    const [notes, setNotes] = useState([]);
    const [activities, setActivities] = useState([]);
    const [users, setUsers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
    });

    const { user } = useAuth();

    const fetchData = async () => {
        try {
            setLoading(true);

            const leadData = await getLeadById(id);
            const noteData = await getNotes(id);
            const activityData = await getActivities(id);

            setLead(leadData);
            setFormData({
                name: leadData.name || "",
                email: leadData.email || "",
                phone: leadData.phone || "",
                company: leadData.company || "",
                message: leadData.message || "",
            });
            setNotes(noteData);
            setActivities(activityData);
            if (user?.role === "admin") {
                const usersData = await getUsers();
                setUsers(usersData);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id && user) {
            fetchData();
        }
    }, [id, user]);

    const handleStatusChange = async (e) => {
        try {
            await updateLeadStatus(id, e.target.value);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAssign = async (e) => {
        try {
            await assignLead(id, e.target.value);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddNote = async (text) => {
        try {
            await addNote(id, text);

            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            await updateLead(id, formData);

            setEditMode(false);

            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this lead?"
        );

        if (!confirmDelete) return;

        try {
            await deleteLead(id);

            window.location.href = "/dashboard";
        } catch (error) {
            console.log(error);
        }
    };

    const fieldClass =
        "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-signal)] focus:outline-none";

    const statusStyle = lead ? getStatusStyle(lead.status) : null;
    const pipeline = STATUSES.filter((s) => s !== "Lost");
    const currentIndex = lead ? pipeline.indexOf(lead.status) : -1;

    return (
        <ProtectedRoute>
            <Navbar />

            <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
                <Link
                    href="/dashboard"
                    className="mb-5 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-ink-faint)] hover:text-[var(--color-navy)]"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to dashboard
                </Link>

                {loading && !lead ? (
                    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3">
                        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border-strong)] border-t-[var(--color-navy)]" />
                        <p className="text-sm text-[var(--color-ink-faint)]">Loading lead...</p>
                    </div>
                ) : !lead ? null : (
                    <>
                        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <div className="mb-2 flex items-center gap-3">
                                    <h1 className="text-xl font-semibold text-[var(--color-ink)]">{lead.name}</h1>
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                                        {lead.status}
                                    </span>
                                </div>
                                <p className="text-sm text-[var(--color-ink-faint)]">{lead.company || "No company on file"}</p>
                            </div>

                            {user?.role === "admin" && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditMode(!editMode)}
                                        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2 text-xs font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-muted)] cursor-pointer"
                                    >
                                        {editMode ? "Cancel" : "Edit Lead"}
                                    </button>

                                    <button
                                        onClick={handleDelete}
                                        className="rounded-lg border border-[var(--color-lost-bg)] bg-[var(--color-lost-bg)] px-3.5 py-2 text-xs font-semibold text-[var(--color-lost)] transition-colors hover:brightness-95 cursor-pointer"
                                    >
                                        Delete Lead
                                    </button>
                                </div>
                            )}
                        </div>

                        {lead.status !== "Lost" && (
                            <div className="mb-6 flex items-center overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
                                {pipeline.map((stage, i) => {
                                    const reached = i <= currentIndex;
                                    const stageStyle = getStatusStyle(stage);
                                    return (
                                        <div key={stage} className="flex flex-1 items-center last:flex-none">
                                            <div className="flex flex-shrink-0 flex-col items-center gap-1.5">
                                                <span
                                                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                                                        reached ? `${stageStyle.bg} ${stageStyle.text}` : "bg-[var(--color-surface-muted)] text-[var(--color-ink-faint)]"
                                                    }`}
                                                    style={reached ? { boxShadow: `inset 0 0 0 1.5px ${stageStyle.accent}` } : undefined}
                                                >
                                                    {i + 1}
                                                </span>
                                                <span className={`whitespace-nowrap text-[11px] font-medium ${reached ? "text-[var(--color-ink)]" : "text-[var(--color-ink-faint)]"}`}>
                                                    {stage}
                                                </span>
                                            </div>
                                            {i < pipeline.length - 1 && (
                                                <span
                                                    className="mx-2 h-[2px] flex-1"
                                                    style={{ background: i < currentIndex ? "var(--color-navy)" : "var(--color-border)" }}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="space-y-6 lg:col-span-2">
                                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
                                    {editMode ? (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-faint)]">Name</label>
                                                <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className={fieldClass} />
                                            </div>
                                            <div>
                                                <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-faint)]">Email</label>
                                                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={fieldClass} />
                                            </div>
                                            <div>
                                                <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-faint)]">Phone</label>
                                                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className={fieldClass} />
                                            </div>
                                            <div>
                                                <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-faint)]">Company</label>
                                                <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" className={fieldClass} />
                                            </div>
                                            <div>
                                                <label className="mb-1.5 block text-xs font-medium text-[var(--color-ink-faint)]">Message</label>
                                                <textarea name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="Message" className={fieldClass} />
                                            </div>

                                            <button
                                                onClick={handleUpdate}
                                                className="rounded-lg bg-[var(--color-navy)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--color-navy-soft)] cursor-pointer"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    ) : (
                                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <dt className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">Email</dt>
                                                <dd className="mt-1 text-sm text-[var(--color-ink)]">{lead.email}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">Phone</dt>
                                                <dd className="mt-1 text-sm text-[var(--color-ink)]">{lead.phone}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">Company</dt>
                                                <dd className="mt-1 text-sm text-[var(--color-ink)]">{lead.company || "—"}</dd>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <dt className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">Message</dt>
                                                <dd className="mt-1 text-sm leading-relaxed text-[var(--color-ink)]">{lead.message || "—"}</dd>
                                            </div>
                                        </dl>
                                    )}
                                </div>

                                <NoteList notes={notes} onAddNote={handleAddNote} />
                                <ActivityTimeline activities={activities} />
                            </div>

                            <div className="space-y-6">
                                <div className="sticky top-20 space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
                                    <div>
                                        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">Status</label>
                                        <select
                                            value={lead.status}
                                            onChange={handleStatusChange}
                                            className={fieldClass}
                                        >
                                            {STATUSES.map((s) => (
                                                <option key={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {user?.role === "admin" && (
                                        <div>
                                            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">Assign Lead</label>
                                            <select
                                                value={lead.assignedTo?._id || ""}
                                                onChange={handleAssign}
                                                className={fieldClass}
                                            >
                                                <option value="">Select Member</option>
                                                {users.map((member) => (
                                                    <option key={member._id} value={member._id}>
                                                        {member.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <div className="border-t border-[var(--color-border)] pt-4">
                                        <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">Assigned To</p>
                                        {lead.assignedTo?.name ? (
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-navy)] text-[11px] font-bold text-white">
                                                    {initials(lead.assignedTo.name)}
                                                </span>
                                                <span className="text-sm text-[var(--color-ink)]">{lead.assignedTo.name}</span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-[var(--color-ink-faint)]">Not Assigned</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </ProtectedRoute>
    );
}
