"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px 25px",
                borderBottom: "1px solid #ddd",
            }}
        >
            <h2>Lead Management</h2>

            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <Link href="/dashboard">Dashboard</Link>

                <span>{user?.name}</span>

                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}