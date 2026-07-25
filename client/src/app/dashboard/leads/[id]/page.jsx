"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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


export default function LeadDetailsPage() {
    const { id } = useParams();

    const [lead, setLead] = useState(null);
    const [notes, setNotes] = useState([]);
    const [activities, setActivities] = useState([]);
    const [users, setUsers] = useState([]);
    const [editMode, setEditMode] = useState(false);

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

    return (
        <ProtectedRoute>
            <Navbar />

            <main style={{ padding: "30px" }}>
                <h1>Lead Details</h1>

                {!lead ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div
                            style={{
                                border: "1px solid #ddd",
                                padding: "20px",
                                marginBottom: "30px",
                            }}
                        >
                            <h2>{lead.name}</h2>
                            {user?.role === "admin" && (
                                <div style={{ marginBottom: "20px" }}>
                                    <button onClick={() => setEditMode(!editMode)}>
                                        {editMode ? "Cancel" : "Edit Lead"}
                                    </button>

                                    <button
                                        onClick={handleDelete}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Delete Lead
                                    </button>
                                </div>
                            )}

                            {editMode ? (
                                <>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                    />

                                    <br /><br />

                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                    />

                                    <br /><br />

                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone"
                                    />

                                    <br /><br />

                                    <input
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Company"
                                    />

                                    <br /><br />

                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Message"
                                    />

                                    <br /><br />

                                    <button onClick={handleUpdate}>
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p>
                                        <strong>Email:</strong> {lead.email}
                                    </p>

                                    <p>
                                        <strong>Phone:</strong> {lead.phone}
                                    </p>

                                    <p>
                                        <strong>Company:</strong> {lead.company || "-"}
                                    </p>

                                    <p>
                                        <strong>Message:</strong> {lead.message || "-"}
                                    </p>
                                </>
                            )}

                            <p>
                                <strong>Status:</strong>
                            </p>


                            <select
                                value={lead.status}
                                onChange={handleStatusChange}
                            >
                                <option>New</option>
                                <option>Contacted</option>
                                <option>Qualified</option>
                                <option>Proposal Sent</option>
                                <option>Won</option>
                                <option>Lost</option>
                            </select>

                            {user?.role === "admin" && (
                                <>
                                    <p style={{ marginTop: "20px" }}>
                                        <strong>Assign Lead</strong>
                                    </p>

                                    <select
                                        value={lead.assignedTo?._id || ""}
                                        onChange={handleAssign}
                                    >
                                        <option value="">
                                            Select Member
                                        </option>

                                        {users.map((member) => (
                                            <option
                                                key={member._id}
                                                value={member._id}
                                            >
                                                {member.name}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )}

                            <p>
                                <strong>Assigned To:</strong>{" "}
                                {lead.assignedTo?.name || "Not Assigned"}
                            </p>
                        </div>
                    </>
                )}
            </main>

            <NoteList
                notes={notes}
                onAddNote={handleAddNote}
            />

            <ActivityTimeline
                activities={activities}
            />

            <Footer />
        </ProtectedRoute>
    );
}