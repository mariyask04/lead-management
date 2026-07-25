"use client";

import { useState } from "react";
import { initials } from "@/lib/statusConfig";

export default function NoteList({
    notes,
    onAddNote,
}) {
    const [text, setText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text.trim()) return;

        setSubmitting(true);
        await onAddNote(text);
        setText("");
        setSubmitting(false);
    };

    return (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-faint)]">
                Notes
            </h2>

            <form onSubmit={handleSubmit} className="mb-6">
                <textarea
                    rows="3"
                    placeholder="Add a note for the team..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-signal)] focus:outline-none"
                />

                <div className="mt-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={submitting || !text.trim()}
                        className="rounded-lg bg-[var(--color-navy)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--color-navy-soft)] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                    >
                        {submitting ? "Adding..." : "Add Note"}
                    </button>
                </div>
            </form>

            {notes.length === 0 ? (
                <p className="text-sm text-[var(--color-ink-faint)]">No notes yet — be the first to leave one.</p>
            ) : (
                <div className="space-y-5">
                    {notes.map((note) => (
                        <div key={note._id} className="flex gap-3">
                            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-[11px] font-bold text-white">
                                {initials(note.author?.name)}
                            </span>
                            <div className="flex-1 rounded-lg bg-[var(--color-surface-muted)] px-3.5 py-2.5">
                                <p className="text-sm text-[var(--color-ink)]">{note.content}</p>
                                <p className="mt-1 text-xs text-[var(--color-ink-faint)]">
                                    {note.author?.name || "System"}
                                    {" · "}
                                    {new Date(note.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
