"use client";

import Link from "next/link";
import { getStatusStyle, initials } from "@/lib/statusConfig";

export default function LeadTable({ leads }) {
    if (!leads || leads.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)] px-6 py-16 text-center">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-surface-muted)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-faint)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                </div>
                <p className="text-sm font-medium text-[var(--color-ink)]">No leads found</p>
                <p className="mt-1 text-xs text-[var(--color-ink-faint)]">
                    Try adjusting your search or status filter.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-sm">
                    <thead>
                        <tr className="bg-[var(--color-surface-muted)] text-left">
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">Name</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">Company</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">Email</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">Status</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">Assigned To</th>
                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {leads.map((lead) => {
                            const style = getStatusStyle(lead.status);
                            return (
                                <tr
                                    key={lead._id}
                                    className="border-t border-[var(--color-border)] transition-colors hover:bg-[var(--color-surface-muted)]"
                                >
                                    <td className="px-5 py-3.5 font-medium text-[var(--color-ink)]">{lead.name}</td>
                                    <td className="px-5 py-3.5 text-[var(--color-ink-soft)]">{lead.company || "—"}</td>
                                    <td className="px-5 py-3.5 text-[var(--color-ink-soft)]">{lead.email}</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.bg} ${style.text}`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        {lead.assignedTo?.name ? (
                                            <span className="inline-flex items-center gap-2 text-[var(--color-ink-soft)]">
                                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-navy)] text-[10px] font-bold text-white">
                                                    {initials(lead.assignedTo.name)}
                                                </span>
                                                {lead.assignedTo.name}
                                            </span>
                                        ) : (
                                            <span className="text-[var(--color-ink-faint)]">Unassigned</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3.5 text-right">
                                        <Link
                                            href={`/dashboard/leads/${lead._id}`}
                                            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-navy)] hover:text-[var(--color-signal-dark)]"
                                        >
                                            View
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m9 18 6-6-6-6" />
                                            </svg>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
