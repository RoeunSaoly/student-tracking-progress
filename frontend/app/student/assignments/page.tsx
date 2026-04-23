"use client";

import { useState } from "react";

type FilterType = "All" | "Pending" | "In Progress" | "Submitted";

const assignments = [
    {
        id: 1,
        title: "Calculus Problem Set 5",
        subject: "Mathematics 101",
        due: "Dec 15",
        status: "Pending" as const,
        submitted: false,
    },
    {
        id: 2,
        title: "Quantum Mechanics Essay",
        subject: "Physics Advanced",
        due: "Dec 18",
        status: "In Progress" as const,
        submitted: false,
    },
    {
        id: 3,
        title: "Lab Report: Chemical Reactions",
        subject: "Chemistry Basics",
        due: "Dec 20",
        status: "Pending" as const,
        submitted: false,
    },
    {
        id: 4,
        title: "Algorithm Design Project",
        subject: "Computer Science",
        due: "Dec 12",
        status: "Submitted" as const,
        submitted: true,
    },
];

const feedback = [
    {
        id: 1,
        title: "Problem Set 4",
        teacher: "Dr. Sarah Johnson",
        comment: '"Excellent work! Your understanding of integration is very strong."',
        grade: "A",
        score: "95/100",
        gradeColor: "#7C3AED",
    },
    {
        id: 2,
        title: "Quiz 7",
        teacher: "Dr. Sarah Johnson",
        comment: '"Good effort. Review the chain rule applications."',
        grade: "B+",
        score: "87/100",
        gradeColor: "#2563EB",
    },
];

const navItems = ["Home", "My Classes", "Assignments", "Messages"];
const topNavItems = ["Home", "Student", "Teacher", "about"];

function HomeIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}
function GridIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    );
}
function ClipboardIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
        </svg>
    );
}
function MessageIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
    );
}
function DocIcon({ submitted }: { submitted: boolean }) {
    return submitted ? (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <polyline points="9 12 11 14 15 10" />
        </svg>
    ) : (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
        </svg>
    );
}

const navIcons: Record<string, React.ReactNode> = {
    Home: <HomeIcon />,
    "My Classes": <GridIcon />,
    Assignments: <ClipboardIcon />,
    Messages: <MessageIcon />,
};

const statusStyle: Record<string, React.CSSProperties> = {
    Pending: { backgroundColor: "#F3F4F6", color: "#374151" },
    "In Progress": { backgroundColor: "#DBEAFE", color: "#1D4ED8" },
    Submitted: { backgroundColor: "#111827", color: "#fff" },
};

export default function AssignmentsPage() {
    const [activeNav, setActiveNav] = useState("Assignments");
    const [activeTop, setActiveTop] = useState("Home");
    const [filter, setFilter] = useState<FilterType>("All");

    const filters: FilterType[] = ["All", "Pending", "In Progress", "Submitted"];

    const filtered = filter === "All" ? assignments : assignments.filter((a) => a.status === filter);

    return (
        <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" }}>

            {/* Main Content */}
            <main style={{ flex: 1, padding: "24px", overflow: "auto" }}>
                {/* Assignments Section */}
                <section style={s.section}>
                    <h2 style={s.sectionTitle}>Assignments & Deadlines</h2>

                    {/* Filter tabs */}
                    <div style={s.filterRow}>
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                style={{
                                    ...s.filterBtn,
                                    backgroundColor: filter === f ? "#fff" : "transparent",
                                    color: filter === f ? "#111827" : "#6B7280",
                                    border: filter === f ? "1px solid #E5E7EB" : "1px solid transparent",
                                    fontWeight: filter === f ? 600 : 400,
                                    boxShadow: filter === f ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Assignment list */}
                    <div style={s.assignmentList}>
                        {filtered.map((a, i) => (
                            <div
                                key={a.id}
                                style={{
                                    ...s.assignmentRow,
                                    borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none",
                                }}
                            >
                                <div style={s.assignmentLeft}>
                                    <DocIcon submitted={a.submitted} />
                                    <div>
                                        <div style={s.assignmentTitle}>{a.title}</div>
                                        <div style={s.assignmentSubject}>{a.subject}</div>
                                    </div>
                                </div>
                                <div style={s.assignmentRight}>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={s.dueDate}>Due: {a.due}</div>
                                        <span style={{ ...s.statusBadge, ...statusStyle[a.status] }}>{a.status}</span>
                                    </div>
                                    <button
                                        style={{
                                            ...s.actionBtn,
                                            backgroundColor: a.submitted ? "#374151" : "#2563EB",
                                        }}
                                    >
                                        {a.submitted ? "View" : "Start"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Teacher Feedback Section */}
                <section style={{ ...s.section, marginTop: 20 }}>
                    <h2 style={s.sectionTitle}>Teacher Feedback</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        {feedback.map((fb, i) => (
                            <div
                                key={fb.id}
                                style={{
                                    ...s.feedbackRow,
                                    borderBottom: i < feedback.length - 1 ? "1px solid #F3F4F6" : "none",
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <div style={s.feedbackTitle}>{fb.title}</div>
                                    <div style={s.feedbackTeacher}>by {fb.teacher}</div>
                                    <div style={s.feedbackComment}>{fb.comment}</div>
                                </div>
                                <div style={{ textAlign: "right", flexShrink: 0 }}>
                                    <div style={{ ...s.feedbackGrade, color: fb.gradeColor }}>{fb.grade}</div>
                                    <div style={s.feedbackScore}>{fb.score}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
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
        backgroundColor: "#1F2937",
        padding: "8px 20px",
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
        display: "flex",
        flexDirection: "column",
        gap: 0,
    },
    section: {
        backgroundColor: "#fff",
        borderRadius: 10,
        border: "1.5px dashed #93C5FD",
        padding: "18px 20px",
    },
    sectionTitle: {
        margin: "0 0 14px",
        fontSize: 15,
        fontWeight: 700,
        color: "#111827",
    },
    filterRow: {
        display: "flex",
        gap: 4,
        marginBottom: 16,
        backgroundColor: "#F9FAFB",
        padding: "4px",
        borderRadius: 8,
        width: "fit-content",
    },
    filterBtn: {
        background: "none",
        border: "none",
        borderRadius: 6,
        padding: "5px 14px",
        fontSize: 13,
        cursor: "pointer",
        transition: "all 0.15s",
    },
    assignmentList: {
        display: "flex",
        flexDirection: "column",
    },
    assignmentRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 0",
        gap: 12,
    },
    assignmentLeft: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        flex: 1,
    },
    assignmentTitle: {
        fontSize: 14,
        fontWeight: 600,
        color: "#111827",
    },
    assignmentSubject: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
    },
    assignmentRight: {
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexShrink: 0,
    },
    dueDate: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 4,
        textAlign: "right",
    },
    statusBadge: {
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 5,
        fontSize: 12,
        fontWeight: 500,
    },
    actionBtn: {
        border: "none",
        borderRadius: 7,
        padding: "7px 18px",
        color: "#fff",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        minWidth: 60,
    },
    feedbackRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "16px 0",
        gap: 16,
    },
    feedbackTitle: {
        fontSize: 14,
        fontWeight: 700,
        color: "#111827",
    },
    feedbackTeacher: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2,
    },
    feedbackComment: {
        fontSize: 12,
        color: "#6B7280",
        fontStyle: "italic",
        marginTop: 6,
    },
    feedbackGrade: {
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 1,
    },
    feedbackScore: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 4,
        textAlign: "right",
    },
};