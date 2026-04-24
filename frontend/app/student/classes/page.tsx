"use client";

import { useState } from "react";
import { User, Clock, MapPin, X, ChevronDown } from "lucide-react";
import Link from "next/link";

const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Green", value: "#22C55E" },
    { name: "Purple", value: "#A855F7" },
    { name: "Orange", value: "#F59E0B" },
    { name: "Red", value: "#EF4444" },
];

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
    const [classCode, setClassCode] = useState("");
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    return (
        <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" }}>

            {/* Main Content */}
            <main style={{ flex: 1, padding: "24px", overflow: "auto" }}>
                <div style={s.pageHeader}>
                    <div>
                        <h1 style={s.h1}>My Classes</h1>
                        <p style={s.subtitle}>Spring Semester 2025</p>
                    </div>
                    <button style={s.addBtn} onClick={() => setIsModalOpen(true)}>+ Add Class</button>
                </div>

                <div style={s.grid}>
                    {classes.map((cls) => (
                        <Link key={cls.id} href={`/student/classes/${cls.id}`} style={{ textDecoration: "none" }}>
                            <div style={s.card}>
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
                        </Link>
                    ))}
                </div>
            </main>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div style={s.overlay}>
                    <div style={s.modal}>
                        <div style={s.modalHeader}>
                            <h2 style={s.modalTitle}>Join class</h2>
                            <button style={s.closeBtn} onClick={() => setIsModalOpen(false)}>
                                <X size={20} color="#6B7280" />
                            </button>
                        </div>

                        <div style={s.modalBody}>
                            <div style={s.inputGroup}>
                                <label style={s.label}>Join class with code</label>
                                <input
                                    type="text"
                                    placeholder="Enter code"
                                    style={s.input}
                                    value={classCode}
                                    onChange={(e) => setClassCode(e.target.value)}
                                />
                            </div>

                            <div style={s.inputGroup}>
                                <label style={s.label}>Card Color</label>
                                <div style={s.selectWrapper}>
                                    <div style={s.select} onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: selectedColor.value }} />
                                            <span style={{ fontSize: 14, color: "#111827" }}>{selectedColor.name}</span>
                                        </div>
                                        <ChevronDown size={16} color="#9CA3AF" style={{ transform: isColorDropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                                    </div>
                                    
                                    {isColorDropdownOpen && (
                                        <div style={s.dropdown}>
                                            {colors.map((color) => (
                                                <div
                                                    key={color.name}
                                                    style={{
                                                        ...s.dropdownItem,
                                                        backgroundColor: selectedColor.name === color.name ? "#F3F4F6" : "transparent"
                                                    }}
                                                    onClick={() => {
                                                        setSelectedColor(color);
                                                        setIsColorDropdownOpen(false);
                                                    }}
                                                >
                                                    <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: color.value }} />
                                                    {color.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div style={s.modalFooter}>
                            <button style={s.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button style={s.submitBtn} onClick={() => setIsModalOpen(false)}>Add Class</button>
                        </div>
                    </div>
                </div>
            )}
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
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 20,
    },
    modal: {
        backgroundColor: "#fff",
        borderRadius: 16,
        width: "100%",
        maxWidth: 480,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
    },
    modalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 24px",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 700,
        color: "#111827",
        margin: 0,
    },
    closeBtn: {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        transition: "background-color 0.2s",
    },
    modalBody: {
        padding: "0 24px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: 500,
        color: "#374151",
    },
    input: {
        width: "100%",
        padding: "12px 16px",
        backgroundColor: "#F3F4F6",
        border: "1px solid transparent",
        borderRadius: 10,
        fontSize: 14,
        color: "#111827",
        outline: "none",
    },
    selectWrapper: {
        position: "relative",
    },
    select: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "12px 16px",
        backgroundColor: "#F3F4F6",
        borderRadius: 10,
        cursor: "pointer",
    },
    dropdown: {
        position: "absolute",
        top: "calc(100% + 4px)",
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderRadius: 10,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        border: "1px solid #E5E7EB",
        zIndex: 10,
        padding: 4,
    },
    dropdownItem: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 12px",
        borderRadius: 8,
        fontSize: 14,
        color: "#374151",
        cursor: "pointer",
        transition: "background-color 0.2s",
    },
    modalFooter: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 12,
        padding: "0 24px 24px",
    },
    cancelBtn: {
        padding: "10px 24px",
        borderRadius: 10,
        border: "1px solid #E5E7EB",
        backgroundColor: "#fff",
        fontSize: 14,
        fontWeight: 600,
        color: "#374151",
        cursor: "pointer",
    },
    submitBtn: {
        padding: "10px 24px",
        borderRadius: 10,
        border: "none",
        backgroundColor: "#2563EB",
        fontSize: 14,
        fontWeight: 600,
        color: "#fff",
        cursor: "pointer",
    },
};