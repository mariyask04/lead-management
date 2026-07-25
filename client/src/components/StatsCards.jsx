"use client";

import { getStatusStyle } from "@/lib/statusConfig";

export default function StatsCards({ stats }) {
    if (!stats) {
        return (
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-[92px] animate-pulse rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
                    />
                ))}
            </div>
        );
    }

    const cards = [
        { title: "Total", value: stats.totalLeads, accent: "var(--color-navy)" },
        { title: "New", value: stats.newLeads, accent: getStatusStyle("New").accent },
        { title: "Contacted", value: stats.contacted, accent: getStatusStyle("Contacted").accent },
        { title: "Qualified", value: stats.qualified, accent: getStatusStyle("Qualified").accent },
        { title: "Proposal", value: stats.proposalSent, accent: getStatusStyle("Proposal Sent").accent },
        { title: "Won", value: stats.won, accent: getStatusStyle("Won").accent },
        { title: "Lost", value: stats.lost, accent: getStatusStyle("Lost").accent },
    ];

    return (
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm"
                    style={{ borderTop: `3px solid ${card.accent}` }}
                >
                    <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-faint)]">
                        {card.title}
                    </p>
                    <p className="mt-1.5 font-mono text-2xl font-semibold text-[var(--color-ink)]">
                        {card.value ?? 0}
                    </p>
                </div>
            ))}
        </div>
    );
}
