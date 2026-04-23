"use client";

import { useState } from "react";
import { User, Clock, MapPin } from "lucide-react";

const classes = [
    {
        id: 1,
        name: "Algebra II",
        period: "Period 1",
        grade: 94,
        teacher: "Ms. Johnson",
        time: "8:00 AM – 9:30 AM",
        room: "Room 204",
        assignments: 18,
        nextClass: "Monday, 8:00 AM",
        color: "#3B82F6",
    },
    {
        id: 2,
        name: "English Literature",
        period: "Period 2",
        grade: 91,
        teacher: "Mr. Thompson",
        time: "9:45 AM – 11:15 AM",
        room: "Room 310",
        assignments: 15,
        nextClass: "Monday, 9:45 AM",
        color: "#22C55E",
    },
    {
        id: 3,
        name: "Chemistry",
        period: "Period 3",
        grade: 88,
        teacher: "Dr. Martinez",
        time: "11:30 AM – 1:00 PM",
        room: "Lab 102",
        assignments: 20,
        nextClass: "Tuesday, 11:30 AM",
        color: "#A855F7",
    },
    {
        id: 4,
        name: "World History",
        period: "Period 4",
        grade: 92,
        teacher: "Ms. Davis",
        time: "1:45 PM – 3:15 PM",
        room: "Room 215",
        assignments: 16,
        nextClass: "Monday, 1:45 PM",
        color: "#F59E0B",
    },
    {
        id: 5,
        name: "Spanish III",
        period: "Period 5",
        grade: 96,
        teacher: "Señora Lopez",
        time: "8:00 AM – 9:30 AM",
        room: "Room 118",
        assignments: 14,
        nextClass: "Tuesday, 8:00 AM",
        color: "#EF4444",
    },
    {
        id: 6,
        name: "Physical Education",
        period: "Period 6",
        grade: 98,
        teacher: "Coach Williams",
        time: "10:00 AM – 11:30 AM",
        room: "Gymnasium",
        assignments: 5,
        nextClass: "Wednesday, 10:00 AM",
        color: "#8B5CF6",
    },
];


export default function MyClassesPage() {
    const [activeNav, setActiveNav] = useState("My Classes");
    const [activeTop, setActiveTop] = useState("Home");

    return (
        <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" }}>

            {/* Main Content */}
            <main style={{ flex: 1, padding: "24px", overflow: "auto" }}>
                <div style={s.pageHeader}>
                    <div>
                        <h1 style={s.h1}>My Classes</h1>
                        <p style={s.subtitle}>Spring Semester 2025</p>
                    </div>
                    <button style={s.addBtn}>+ Add Class</button>
                </div>

                <div style={s.grid}>
                    {classes.map((cls) => (
                        <div key={cls.id} style={s.card}>
                            {/* Color top bar */}
                            <div style={{ height: 6, backgroundColor: cls.color }} />

                            <div style={s.cardInner}>
                                {/* Title + Grade */}
                                <div style={s.cardTop}>
                                    <div>
                                        <div style={s.cardName}>{cls.name}</div>
                                        <div style={s.cardPeriod}>{cls.period}</div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={s.grade}>{cls.grade}</div>
                                        <div style={s.gradeLabel}>Grade%</div>
                                    </div>
                                </div>

                                {/* Meta rows */}
                                <div style={s.meta}>
                                    <div style={s.metaRow}><User size={13} style={{ flexShrink: 0 }} />{cls.teacher}</div>
                                    <div style={s.metaRow}><Clock size={13} style={{ flexShrink: 0 }} />{cls.time}</div>
                                    <div style={s.metaRow}><MapPin size={13} style={{ flexShrink: 0 }} />{cls.room}</div>
                                </div>

                                {/* Footer */}
                                <div style={s.footer}>
                                    <div style={s.footerRow}>
                                        <span style={{ color: "#9CA3AF" }}>Assignments</span>
                                        <span style={{ color: "#111827", fontWeight: 600 }}>{cls.assignments} total</span>
                                    </div>
                                    <div style={s.footerRow}>
                                        <span style={{ color: "#9CA3AF" }}>Next class</span>
                                        <span style={{ color: "#111827", fontWeight: 600 }}>{cls.nextClass}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

const s: Record<string, React.CSSProperties> = {
    main: {
        flex: 1,
        overflowY: "auto",
        padding: 24,
    },
    pageHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 24,
    },
    h1: {
        margin: 0,
        fontSize: 22,
        fontWeight: 700,
        color: "#111827",
    },
    subtitle: {
        margin: "4px 0 0",
        fontSize: 13,
        color: "#6B7280",
    },
    addBtn: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#2563EB",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "9px 20px",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        border: "1px solid #E5E7EB",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        cursor: "pointer",
    },
    cardInner: {
        padding: 16,
    },
    cardTop: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    cardName: {
        fontSize: 15,
        fontWeight: 700,
        color: "#111827",
    },
    cardPeriod: {
        fontSize: 12,
        color: "#9CA3AF",
        marginTop: 2,
    },
    grade: {
        fontSize: 24,
        fontWeight: 700,
        color: "#111827",
        lineHeight: 1,
    },
    gradeLabel: {
        fontSize: 11,
        color: "#9CA3AF",
        textAlign: "right" as const,
        marginTop: 2,
    },
    meta: {
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        gap: 7,
    },
    metaRow: {
        display: "flex",
        alignItems: "center",
        gap: 7,
        fontSize: 12,
        color: "#6B7280",
    },
    footer: {
        marginTop: 16,
        paddingTop: 12,
        borderTop: "1px solid #F3F4F6",
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
    footerRow: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
    },
};