"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { initials } from "@/lib/statusConfig";

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const isDashboard = pathname === "/dashboard";

    return (
        <nav className="sticky top-0 z-20 bg-[var(--color-navy)]">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-signal)] text-sm font-bold text-[var(--color-navy)]">
                            L
                        </span>
                        <span className="text-sm font-semibold tracking-wide text-white">
                            Lead Management
                        </span>
                    </Link>

                    <Link
                        href="/dashboard"
                        className={`text-sm font-medium transition-colors ${
                            isDashboard
                                ? "text-white"
                                : "text-white/60 hover:text-white"
                        }`}
                    >
                        Dashboard
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-2 rounded-full bg-white/10 py-1 pl-1 pr-3 sm:flex">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-signal)] text-[10px] font-bold text-[var(--color-navy)]">
                            {initials(user?.name)}
                        </span>
                        <span className="text-xs font-medium text-white/90">
                            {user?.name}
                        </span>
                        {user?.role && (
                            <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-white/60">
                                {user.role}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleLogout}
                        className="rounded-md border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
