"use client";

import { useState } from "react";

const classes = [
    {
        id: 1,
        period: "Period 1",
        periodColor: { bg: "#DBEAFE", text: "#2563EB" },
        name: "Algebra II",
        students: 28,
        time: "8:00 AM - 9:30 AM",
        nextClass: "Today",
    },
    {
        id: 2,
        period: "Period 2",
        periodColor: { bg: "#DCFCE7", text: "#16A34A" },
        name: "Geometry",
        students: 25,
        time: "9:45 AM - 11:15 AM",
        nextClass: "Today",
    },
    {
        id: 3,
        period: "Period 3",
        periodColor: { bg: "#F3E8FF", text: "#9333EA" },
        name: "Pre-Calculus",
        students: 22,
        time: "12:00 PM - 1:30 PM",
        nextClass: "Today",
    },
    {
        id: 4,
        period: "Period 4",
        periodColor: { bg: "#FEF9C3", text: "#CA8A04" },
        name: "Statistics",
        students: 30,
        time: "1:45 PM - 3:15 PM",
        nextClass: "Tomorrow",
    },
    {
        id: 5,
        period: "Period 5",
        periodColor: { bg: "#FFE4E6", text: "#E11D48" },
        name: "Advanced Math",
        students: 18,
        time: "8:00 AM - 9:30 AM",
        nextClass: "Tomorrow",
    },
    {
        id: 6,
        period: "Period 6",
        periodColor: { bg: "#EDE9FE", text: "#7C3AED" },
        name: "Calculus AP",
        students: 20,
        time: "10:00 AM - 11:30 AM",
        nextClass: "Monday",
    },
];

const navItems = ["Home", "Classes", "Assignments", "Messages", "Students"];
const topNavItems = ["Home", "Student", "Teacher", "about"];

function UsersIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ flexShrink: 0 }}>
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87" />
            <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ flexShrink: 0 }}>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );
}

function HomeIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}

function BookIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
            <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
        </svg>
    );
}

function ClipboardIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
        </svg>
    );
}

function MessageIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
    );
}

function PersonIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

const navIcons: Record<string, React.ReactNode> = {
    Home: <HomeIcon />,
    Classes: <BookIcon />,
    Assignments: <ClipboardIcon />,
    Messages: <MessageIcon />,
    Students: <PersonIcon />,
};

export default function MyClassesPage() {
    const [activeNav, setActiveNav] = useState("Classes");
    const [activeTop, setActiveTop] = useState("Home");

    return (
        <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" }}>

            {/* Main Content */}
            <main style={{ flex: 1, padding: "24px", overflow: "auto" }}>
                <div style={s.contentBox}>
                    <h1 style={s.h1}>My Classes</h1>

                    <div style={s.grid}>
                        {classes.map((cls) => (
                            <div key={cls.id} style={s.card}>
                                {/* Top Row: Period badge + student count */}
                                <div style={s.cardTopRow}>
                                    <span
                                        style={{
                                            ...s.periodBadge,
                                            backgroundColor: cls.periodColor.bg,
                                            color: cls.periodColor.text,
                                        }}
                                    >
                                        {cls.period}
                                    </span>
                                    <div style={s.studentCount}>
                                        <UsersIcon />
                                        <span>{cls.students}</span>
                                    </div>
                                </div>

                                {/* Class Name */}
                                <div style={s.className}>{cls.name}</div>

                                {/* Divider */}
                                <div style={s.divider} />

                                {/* Time + Next Class */}
                                <div style={s.metaRow}>
                                    <ClockIcon />
                                    <span>{cls.time}</span>
                                </div>
                                <div style={{ ...s.metaRow, marginTop: 6 }}>
                                    <CalendarIcon />
                                    <span>Next class: {cls.nextClass}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

const s: Record<string, React.CSSProperties> = {
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#F1F5F9",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
        fontSize: 14,
        color: "#111827",
    },
    topNav: {
        display: "flex",
        alignItems: "center",
        gap: 28,
        height: 52,
        padding: "0 28px",
        backgroundColor: "#fff",
        borderBottom: "1px solid #E5E7EB",
        flexShrink: 0,
    },
    topNavBtn: {
        background: "none",
        border: "none",
        borderTop: "2px solid transparent",
        cursor: "pointer",
        fontSize: 14,
        height: "100%",
        padding: "0 2px",
        transition: "color 0.15s",
    },
    body: {
        display: "flex",
        flex: 1,
        overflow: "hidden",
    },
    sidebar: {
        width: 180,
        backgroundColor: "#fff",
        borderRight: "1px solid #E5E7EB",
        padding: "16px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        flexShrink: 0,
    },
    sidebarBtn: {
        width: "100%",
        background: "none",
        border: "none",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 12px",
        fontSize: 14,
        cursor: "pointer",
        textAlign: "left",
        transition: "background 0.15s",
    },
    main: {
        flex: 1,
        overflowY: "auto",
        padding: 24,
    },
    contentBox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        border: "2px solid #3B82F6",
        padding: 24,
        minHeight: "100%",
    },
    h1: {
        margin: "0 0 20px",
        fontSize: 20,
        fontWeight: 700,
        color: "#111827",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        border: "1px solid #E5E7EB",
        padding: 16,
        cursor: "pointer",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.2s",
    },
    cardTopRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },
    periodBadge: {
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: 6,
        fontSize: 13,
        fontWeight: 600,
    },
    studentCount: {
        display: "flex",
        alignItems: "center",
        gap: 5,
        fontSize: 13,
        color: "#6B7280",
    },
    className: {
        fontSize: 17,
        fontWeight: 700,
        color: "#111827",
        marginBottom: 14,
    },
    divider: {
        height: 1,
        backgroundColor: "#F3F4F6",
        marginBottom: 12,
    },
    metaRow: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        color: "#6B7280",
    },
};