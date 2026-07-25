"use client";

import { useState } from "react";

export default function NoteList({
    notes,
    onAddNote,
}) {
    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text.trim()) return;

        await onAddNote(text);

        setText("");
    };

    return (
        <div
            style={{
                marginTop: "40px",
                border: "1px solid #ddd",
                padding: "20px",
            }}
        >
            <h2>Notes</h2>

            <form onSubmit={handleSubmit}>
                <textarea
                    rows="4"
                    placeholder="Add a note..."
                    value={text}
                    onChange={(e) =>
                        setText(e.target.value)
                    }
                    style={{
                        width: "100%",
                        marginBottom: "10px",
                    }}
                />

                <button type="submit">
                    Add Note
                </button>
            </form>

            <hr
                style={{
                    margin: "20px 0",
                }}
            />

            {notes.length === 0 ? (
                <p>No notes yet.</p>
            ) : (
                notes.map((note) => (
                    <div
                        key={note._id}
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <p>{note.content}</p>

                        <small>
                            {note.author?.name || "System"}

                            {" • "}

                            {new Date(
                                note.createdAt
                            ).toLocaleString()}
                        </small>
                    </div>
                ))
            )}
        </div>
    );
}