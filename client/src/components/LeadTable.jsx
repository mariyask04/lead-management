"use client";

import Link from "next/link";

export default function LeadTable({ leads }) {
    return (
        <>
            <table
                border="1"
                cellPadding="10"
                width="100%"
            >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead._id}>
                            <td>{lead.name}</td>
                            <td>{lead.company || "-"}</td>
                            <td>{lead.email}</td>
                            <td>{lead.status}</td>
                            <td>{lead.assignedTo?.name || "-"}</td>
                            <td>
                                <Link href={`/dashboard/leads/${lead._id}`}>
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}