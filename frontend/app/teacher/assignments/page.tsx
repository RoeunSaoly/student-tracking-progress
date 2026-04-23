"use client";

import { useState } from "react";

const allAssignments = [
    {
        id: 1,
        title: "Chapter 5 Quiz",
        class: "Algebra II",
        due: "Due Today",
        urgent: true,
        submitted: 18,
        total: 28,
    },
    {
        id: 2,
        title: "Geometry Homework",
        class: "Geometry",
        due: "Due Tomorrow",
        urgent: false,
        submitted: 22,
        total: 25,
    },
    {
        id: 3,
        title: "Integration Practice",
        class: "Calculus AP",
        due: "Due Dec 15",
        urgent: false,
        submitted: 15,
        total: 33,
    },
    {
        id: 4,
        title: "Probability Test",
        class: "Statistics",
        due: "Due Dec 16",
        urgent: false,
        submitted: 8,
        total: 30,
    },
    {
        id: 5,
        title: "Final Project",
        class: "Pre-Calculus",
        due: "Due Dec 18",
        urgent: false,
        submitted: 5,
        total: 22,
    },
];

const classFilters = ["All Classes", "Algebra II", "Geometry", "Calculus AP", "Statistics", "Pre-Calculus"];

const navItems = [
    { label: "Home", icon: "home" },
    { label: "Classes", icon: "grid" },
    { label: "Assignments", icon: "clipboard" },
    { label: "Messages", icon: "message" },
    { label: "Students", icon: "person" },
];
const topNavItems = ["Home", "Student", "Teacher", "about"];

function Icon({ name }: { name: string }) {
    const props = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8" } as React.SVGProps<SVGSVGElement>;
    if (name === "home") return <svg {...props}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
    if (name === "grid") return <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
    if (name === "clipboard") return <svg {...props}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /></svg>;
    if (name === "message") return <svg {...props}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>;
    if (name === "person") return <svg {...props}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    if (name === "filter") return <svg {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>;
    if (name === "plus") return <svg {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
    if (name === "calendar") return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
    if (name === "alert") return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>;
    return null;
}

export default function UpcomingAssignmentsPage() {
    const [activeNav, setActiveNav] = useState("Assignments");
    const [activeTop, setActiveTop] = useState("Home");
    const [activeClass, setActiveClass] = useState("All Classes");

    const filtered = activeClass === "All Classes"
        ? allAssignments
        : allAssignments.filter((a) => a.class === activeClass);

    return (
        <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" }}>

            {/* Main Content */}
            <main style={{ flex: 1, padding: "24px", overflow: "auto" }}>
                <div style={s.contentBox}>
                    {/* Header */}
                    <div style={s.pageHeader}>
                        <h1 style={s.h1}>Upcoming Assignments</h1>
                        <div style={{ display: "flex", gap: 10 }}>
                            <button style={s.filterBtn}>
                                <Icon name="filter" /> Filter
                            </button>
                            <button style={s.createBtn}>
                                <Icon name="plus" /> Create Assignment
                            </button>
                        </div>
                    </div>

                    {/* Filter by class */}
                    <div style={{ marginBottom: 24 }}>
                        <p style={s.filterLabel}>Filter by Class</p>
                        <div style={s.classFilters}>
                            {classFilters.map((cf) => {
                                const isActive = activeClass === cf;
                                return (
                                    <button key={cf} onClick={() => setActiveClass(cf)} style={{
                                        ...s.classFilterBtn,
                                        backgroundColor: isActive ? "#2563EB" : "#fff",
                                        color: isActive ? "#fff" : "#374151",
                                        border: isActive ? "1px solid #2563EB" : "1px solid #E5E7EB",
                                        fontWeight: isActive ? 600 : 400,
                                    }}>
                                        {cf}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Assignment list */}
                    <div style={s.list}>
                        {filtered.map((a) => {
                            const pct = Math.round((a.submitted / a.total) * 100);
                            return (
                                <div key={a.id} style={s.assignmentCard}>
                                    {/* Title */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                        <span style={s.assignmentTitle}>{a.title}</span>
                                        {a.urgent && <Icon name="alert" />}
                                    </div>
                                    <div style={s.assignmentClass}>{a.class}</div>

                                    {/* Due + progress */}
                                    <div style={s.dueLine}>
                                        <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#6B7280", fontSize: 13 }}>
                                            <Icon name="calendar" />
                                            {a.due}
                                        </span>
                                        <span style={s.submittedText}>
                                            <span style={{ color: "#111827", fontWeight: 700 }}>{a.submitted}</span>
                                            <span style={{ color: "#6B7280" }}>/{a.total} submitted</span>
                                        </span>
                                    </div>

                                    {/* Progress bar */}
                                    <div style={s.progressTrack}>
                                        <div style={{ ...s.progressFill, width: `${pct}%` }} />
                                    </div>
                                </div>
                            );
                        })}
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
    appBar: {
        height: 10,
        backgroundColor: "#1F2937",
        flexShrink: 0,
    },
    topNav: {
        display: "flex",
        alignItems: "center",
        gap: 28,
        height: 48,
        padding: "0 24px",
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
    },
    body: {
        display: "flex",
        flex: 1,
        overflow: "hidden",
    },
    sidebar: {
        width: 175,
        backgroundColor: "#fff",
        borderRight: "1px solid #E5E7EB",
        padding: "14px 10px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flexShrink: 0,
    },
    sidebarBtn: {
        width: "100%",
        background: "none",
        border: "none",
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "9px 12px",
        fontSize: 14,
        cursor: "pointer",
        textAlign: "left",
        borderRadius: 7,
        transition: "background 0.15s",
    },
    main: {
        flex: 1,
        overflowY: "auto",
        padding: 20,
    },
    contentBox: {
        backgroundColor: "#fff",
        borderRadius: 10,
        border: "1px solid #E5E7EB",
        padding: "24px 28px",
        minHeight: "calc(100% - 0px)",
    },
    pageHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    h1: {
        margin: 0,
        fontSize: 20,
        fontWeight: 700,
        color: "#111827",
    },
    filterBtn: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#fff",
        border: "1px solid #D1D5DB",
        borderRadius: 8,
        padding: "8px 16px",
        fontSize: 14,
        color: "#374151",
        cursor: "pointer",
        fontWeight: 500,
    },
    createBtn: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#2563EB",
        border: "none",
        borderRadius: 8,
        padding: "8px 18px",
        fontSize: 14,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 600,
    },
    filterLabel: {
        margin: "0 0 10px",
        fontSize: 13,
        color: "#6B7280",
        fontWeight: 500,
    },
    classFilters: {
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
    },
    classFilterBtn: {
        borderRadius: 20,
        padding: "5px 16px",
        fontSize: 13,
        cursor: "pointer",
        transition: "all 0.15s",
    },
    list: {
        display: "flex",
        flexDirection: "column",
        gap: 0,
    },
    assignmentCard: {
        padding: "20px 0",
        borderBottom: "1px solid #F3F4F6",
    },
    assignmentTitle: {
        fontSize: 16,
        fontWeight: 700,
        color: "#111827",
    },
    assignmentClass: {
        fontSize: 13,
        color: "#6B7280",
        margin: "3px 0 12px",
    },
    dueLine: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    submittedText: {
        fontSize: 13,
    },
    progressTrack: {
        height: 8,
        backgroundColor: "#E5E7EB",
        borderRadius: 99,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#2563EB",
        borderRadius: 99,
        transition: "width 0.3s",
    },
};