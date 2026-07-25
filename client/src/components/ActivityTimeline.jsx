"use client";

export default function ActivityTimeline({
    activities,
}) {
    return (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
                Activity Timeline
            </h2>

            {activities.length === 0 ? (
                <p className="text-sm text-[var(--color-ink-faint)]">No activity found.</p>
            ) : (
                <ul className="relative ml-1 space-y-5 border-l border-[var(--color-border)] pl-5">
                    {activities.map((activity) => (
                        <li key={activity._id} className="relative">
                            <span className="absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-navy)] ring-2 ring-[var(--color-surface)]" />
                            <p className="text-sm font-medium text-[var(--color-ink)]">
                                {activity.action}
                            </p>
                            <p className="mt-0.5 font-mono text-xs text-[var(--color-ink-faint)]">
                                {activity.user?.name || "System"}
                                {" · "}
                                {new Date(activity.createdAt).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
