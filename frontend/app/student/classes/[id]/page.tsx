"use client";

import { useState, use } from "react";
import { 
    Home, 
    Layout, 
    FileText, 
    MessageSquare, 
    ArrowLeft, 
    AlertCircle,
    GraduationCap
} from "lucide-react";
import Link from "next/link";

const tabs = ["Assignments", "Students", "Announcements", "Files"];

const assignments = [
    {
        id: 1,
        title: "Chapter 5 Quiz",
        class: "Algebra II",
        dueDate: "Due Today",
        submitted: 18,
        total: 28,
        hasAlert: true,
        progress: (18 / 28) * 100,
    },
    {
        id: 2,
        title: "Polynomial Functions",
        class: "Algebra II",
        dueDate: "Due Tomorrow",
        submitted: 25,
        total: 28,
        hasAlert: false,
        progress: (25 / 28) * 100,
    },
    {
        id: 3,
        title: "Systems of Equations",
        class: "Algebra II",
        dueDate: "Due in 3 days",
        submitted: 28,
        total: 28,
        hasAlert: false,
        progress: 100,
    },
];

export default function ClassDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [activeTab, setActiveTab] = useState("Assignments");
    const [activeNav, setActiveNav] = useState("My Classes");

    return (
        <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" }}>
            {/* Main Content */}
            <main style={{ flex: 1, padding: "24px", overflow: "auto" }}>
                <header style={s.header}>
                    <Link href="/student/classes" style={s.backLink}>
                        <ArrowLeft size={16} />
                        <span>Back</span>
                    </Link>
                    <h1 style={s.className}>Algebra II</h1>
                </header>

                {/* Tabs */}
                <div style={s.tabContainer}>
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                ...s.tab,
                                color: activeTab === tab ? "#2563EB" : "#6B7280",
                                borderBottom: activeTab === tab ? "2px solid #2563EB" : "2px solid transparent",
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Assignment List */}
                {activeTab === "Assignments" && (
                    <div style={s.assignmentList}>
                        {assignments.map((assignment) => (
                            <div key={assignment.id} style={s.assignmentCard}>
                                <div style={s.cardHeader}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <h3 style={s.assignmentTitle}>{assignment.title}</h3>
                                        {assignment.hasAlert && <AlertCircle size={16} color="#EF4444" />}
                                    </div>
                                    <span style={s.submissionStatus}>
                                        {assignment.submitted} / {assignment.total} submitted
                                    </span>
                                </div>
                                <p style={s.assignmentClass}>{assignment.class}</p>
                                <div style={s.dueDateRow}>
                                    <FileText size={14} color="#6B7280" />
                                    <span style={s.dueDateText}>{assignment.dueDate}</span>
                                </div>
                                <div style={s.progressContainer}>
                                    <div style={{ ...s.progressBar, width: `${assignment.progress}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

const s: Record<string, React.CSSProperties> = {
    page: { 
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif", 
        display: "flex", 
        minHeight: "100vh", 
        backgroundColor: "#f1f5f9" 
    },
    sidebar: { 
        width: 176, 
        minHeight: "100vh", 
        backgroundColor: "#fff", 
        padding: "24px 12px", 
        boxShadow: "1px 0 4px rgba(0,0,0,0.05)", 
        position: "fixed", 
        top: 0, 
        left: 0, 
        bottom: 0, 
        zIndex: 10, 
        display: "flex", 
        flexDirection: "column" 
    },
    logoBox: { 
        width: 32, 
        height: 32, 
        borderRadius: 8, 
        backgroundColor: "#4f46e5", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        marginBottom: 32, 
        marginLeft: 4 
    },
    nav: { display: "flex", flexDirection: "column", gap: 4 },
    navButton: {
        display: "flex", 
        alignItems: "center", 
        gap: 10, 
        padding: "10px 12px", 
        borderRadius: 12,
        fontSize: 13, 
        fontWeight: 500, 
        border: "none", 
        cursor: "pointer", 
        textAlign: "left"
    },
    avatar: { 
        width: 36, 
        height: 36, 
        borderRadius: "50%", 
        backgroundColor: "#374151", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        color: "#fff", 
        fontSize: 13, 
        fontWeight: 700 
    },
    main: { 
        marginLeft: 176, 
        flex: 1, 
        padding: "32px 48px" 
    },
    header: {
        marginBottom: 24,
    },
    backLink: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: "#2563EB",
        textDecoration: "none",
        fontSize: 14,
        fontWeight: 500,
        marginBottom: 8,
    },
    className: {
        fontSize: 24,
        fontWeight: 700,
        color: "#111827",
        margin: 0,
    },
    tabContainer: {
        display: "flex",
        gap: 32,
        borderBottom: "1px solid #E5E7EB",
        marginBottom: 32,
    },
    tab: {
        padding: "12px 4px",
        fontSize: 14,
        fontWeight: 500,
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s",
    },
    assignmentList: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
    },
    assignmentCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: "20px 24px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    assignmentTitle: {
        fontSize: 16,
        fontWeight: 600,
        color: "#111827",
        margin: 0,
    },
    submissionStatus: {
        fontSize: 12,
        color: "#6B7280",
        fontWeight: 500,
    },
    assignmentClass: {
        fontSize: 13,
        color: "#6B7280",
        margin: "0 0 12px 0",
    },
    dueDateRow: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 16,
    },
    dueDateText: {
        fontSize: 12,
        color: "#6B7280",
    },
    progressContainer: {
        width: "100%",
        height: 6,
        backgroundColor: "#F3F4F6",
        borderRadius: 3,
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#2563EB",
        borderRadius: 3,
    },
};
