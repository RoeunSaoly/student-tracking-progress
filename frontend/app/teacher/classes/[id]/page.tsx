"use client";

import { useState, use } from "react";
import { 
    Home, 
    Layout, 
    FileText, 
    MessageSquare, 
    ArrowLeft, 
    AlertCircle,
    Plus,
    Calendar,
    Users
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

export default function TeacherClassDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [activeTab, setActiveTab] = useState("Assignments");

    return (
        <div style={s.page}>
            <main style={s.main}>
                <header style={s.header}>
                    <Link href="/teacher/classes" style={s.backLink}>
                        <ArrowLeft size={16} />
                        <span>Back</span>
                    </Link>
                    <h1 style={s.className}>Algebra II</h1>
                </header>

                {/* Navigation and Actions */}
                <div style={s.navRow}>
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
                    <button style={s.createBtn}>
                        <Plus size={16} />
                        <span>Create Assignment</span>
                    </button>
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
                                        <span style={{ fontWeight: 700, color: "#111827" }}>{assignment.submitted}</span> /28 submitted
                                    </span>
                                </div>
                                <p style={s.assignmentClass}>{assignment.class}</p>
                                <div style={s.dueDateRow}>
                                    <Calendar size={14} color="#6B7280" />
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
        fontFamily: "'Segoe UI', sans-serif", 
        minHeight: "100vh", 
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
    },
    main: { 
        flex: 1, 
        padding: "24px 40px" 
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
        fontSize: 22,
        fontWeight: 700,
        color: "#111827",
        margin: 0,
    },
    navRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #E5E7EB",
        marginBottom: 32,
    },
    tabContainer: {
        display: "flex",
        gap: 32,
    },
    tab: {
        padding: "16px 4px",
        fontSize: 14,
        fontWeight: 500,
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s",
    },
    createBtn: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#2563EB",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "10px 20px",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        marginBottom: 16,
    },
    assignmentList: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
    },
    assignmentCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: "24px 28px",
        border: "1px solid #F3F4F6",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
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
        fontSize: 13,
        color: "#6B7280",
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
        height: 8,
        backgroundColor: "#F3F4F6",
        borderRadius: 4,
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#2563EB",
        borderRadius: 4,
    },
};
