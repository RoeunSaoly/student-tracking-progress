"use client";

import { useState } from "react";
import { Users, Clock, Calendar, Plus, X } from "lucide-react";
import Link from "next/link";

const colorMap: Record<string, { bg: string; text: string; label: string }> = {
    blue:   { bg: "#DBEAFE", text: "#2563EB", label: "Blue" },
    green:  { bg: "#DCFCE7", text: "#16A34A", label: "Green" },
    purple: { bg: "#F3E8FF", text: "#9333EA", label: "Purple" },
    yellow: { bg: "#FEF9C3", text: "#CA8A04", label: "Yellow" },
    red:    { bg: "#FFE4E6", text: "#E11D48", label: "Red" },
    violet: { bg: "#EDE9FE", text: "#7C3AED", label: "Violet" },
};

const initialClasses = [
    { id: 1, period: "Period 1", color: "blue",   name: "Algebra II",   students: 28, time: "8:00 AM - 9:30 AM",   nextClass: "Today" },
    { id: 2, period: "Period 2", color: "green",  name: "Geometry",      students: 25, time: "9:45 AM - 11:15 AM",  nextClass: "Today" },
    { id: 3, period: "Period 3", color: "purple", name: "Pre-Calculus",  students: 22, time: "12:00 PM - 1:30 PM",  nextClass: "Today" },
    { id: 4, period: "Period 4", color: "yellow", name: "Statistics",    students: 30, time: "1:45 PM - 3:15 PM",   nextClass: "Tomorrow" },
    { id: 5, period: "Period 5", color: "red",    name: "Advanced Math", students: 18, time: "8:00 AM - 9:30 AM",   nextClass: "Tomorrow" },
    { id: 6, period: "Period 6", color: "violet", name: "Calculus AP",   students: 20, time: "10:00 AM - 11:30 AM", nextClass: "Monday" },
];

const emptyForm = { name: "", period: "", time: "", color: "blue" };

export default function MyClassesPage() {
    const [classes, setClasses] = useState(initialClasses);
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const openModal = () => {
        setForm(emptyForm);
        setErrors({});
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setForm(emptyForm);
        setErrors({});
    };

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim())   e.name   = "Class name is required";
        if (!form.period.trim()) e.period = "Period is required";
        if (!form.time.trim())   e.time   = "Class time is required";
        return e;
    };

    const handleCreate = () => {
        const e = validate();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        setClasses(prev => [
            ...prev,
            { id: Date.now(), period: form.period.trim(), color: form.color, name: form.name.trim(), students: 0, time: form.time.trim(), nextClass: "TBD" },
        ]);
        closeModal();
    };

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    };

    return (
        <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", backgroundColor: "#f8fafc" }}>

            <main style={{ padding: 24 }}>
                <div style={s.contentBox}>
                    {/* Header */}
                    <div style={s.contentHeader}>
                        <h1 style={s.h1}>My Classes</h1>
                        <button style={s.btnCreate} onClick={openModal}>
                            <Plus size={16} />
                            Create Class
                        </button>
                    </div>

                    {/* Grid */}
                    <div style={s.grid}>
                        {classes.map((cls) => {
                            const c = colorMap[cls.color];
                            return (
                                <Link key={cls.id} href={`/teacher/classes/${cls.id}`} style={{ textDecoration: "none" }}>
                                    <div style={s.card}>
                                        <div style={s.cardTopRow}>
                                            <span style={{ ...s.periodBadge, backgroundColor: c.bg, color: c.text }}>
                                                {cls.period}
                                            </span>
                                            <div style={s.studentCount}>
                                                <Users size={15} style={{ flexShrink: 0 }} />
                                                <span>{cls.students}</span>
                                            </div>
                                        </div>
                                        <div style={s.className}>{cls.name}</div>
                                        <div style={s.divider} />
                                        <div style={s.metaRow}>
                                            <Clock size={15} style={{ flexShrink: 0 }} />
                                            <span>{cls.time}</span>
                                        </div>
                                        <div style={{ ...s.metaRow, marginTop: 6 }}>
                                            <Calendar size={15} style={{ flexShrink: 0 }} />
                                            <span>Next class: {cls.nextClass}</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>

            {/* Modal Overlay */}
            {modalOpen && (
                <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && closeModal()}>
                    <div style={s.modal}>
                        {/* Modal Header */}
                        <div style={s.modalHeader}>
                            <h2 style={s.modalTitle}>Create New Class</h2>
                            <button style={s.closeBtn} onClick={closeModal}>
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div style={s.modalBody}>
                            {/* Class Name */}
                            <div style={s.field}>
                                <label style={s.label}>
                                    Class Name <span style={s.required}>*</span>
                                </label>
                                <input
                                    style={{ ...s.input, ...(errors.name ? s.inputError : {}) }}
                                    placeholder="e.g., Biology"
                                    value={form.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                />
                                {errors.name && <span style={s.errorText}>{errors.name}</span>}
                            </div>

                            {/* Period */}
                            <div style={s.field}>
                                <label style={s.label}>
                                    Period <span style={s.required}>*</span>
                                </label>
                                <input
                                    style={{ ...s.input, ...(errors.period ? s.inputError : {}) }}
                                    placeholder="e.g., Period 7"
                                    value={form.period}
                                    onChange={(e) => handleChange("period", e.target.value)}
                                />
                                {errors.period && <span style={s.errorText}>{errors.period}</span>}
                            </div>

                            {/* Class Time */}
                            <div style={s.field}>
                                <label style={s.label}>
                                    Class Time <span style={s.required}>*</span>
                                </label>
                                <input
                                    style={{ ...s.input, ...(errors.time ? s.inputError : {}) }}
                                    placeholder="e.g., 2:00 PM - 3:30 PM"
                                    value={form.time}
                                    onChange={(e) => handleChange("time", e.target.value)}
                                />
                                {errors.time && <span style={s.errorText}>{errors.time}</span>}
                            </div>

                            {/* Card Color */}
                            <div style={s.field}>
                                <label style={s.label}>Card Color</label>
                                <div style={s.colorSelectWrap}>
                                    <div style={s.colorPreview}>
                                        <span style={{ ...s.colorDot, backgroundColor: colorMap[form.color].text }} />
                                        <span style={{ fontSize: 14, color: "#111827" }}>{colorMap[form.color].label}</span>
                                    </div>
                                    <select
                                        style={s.hiddenSelect}
                                        value={form.color}
                                        onChange={(e) => handleChange("color", e.target.value)}
                                    >
                                        {Object.entries(colorMap).map(([key, val]) => (
                                            <option key={key} value={key}>{val.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div style={s.modalFooter}>
                            <button style={s.btnCancel} onClick={closeModal}>Cancel</button>
                            <button style={s.btnSubmit} onClick={handleCreate}>Create Class</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const s: Record<string, React.CSSProperties> = {
    contentBox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        border: "2px solid #3B82F6",
        padding: 24,
        minHeight: "100%",
    },
    contentHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    h1: {
        margin: 0,
        fontSize: 20,
        fontWeight: 700,
        color: "#111827",
    },
    btnCreate: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "#3B82F6",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "9px 16px",
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
        borderRadius: 10,
        border: "1px solid #E5E7EB",
        padding: 16,
        cursor: "pointer",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
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

    // Overlay & Modal
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modal: {
        background: "#fff",
        borderRadius: 12,
        width: 420,
        maxWidth: "95vw",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        overflow: "hidden",
    },
    modalHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 20px 14px",
        borderBottom: "1px solid #E5E7EB",
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 700,
        color: "#111827",
        margin: 0,
    },
    closeBtn: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#9CA3AF",
        display: "flex",
        alignItems: "center",
        padding: "2px 4px",
        borderRadius: 4,
    },
    modalBody: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 14,
    },
    field: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
    label: {
        fontSize: 13,
        fontWeight: 600,
        color: "#374151",
    },
    required: {
        color: "#EF4444",
    },
    input: {
        width: "100%",
        border: "1.5px solid #D1D5DB",
        borderRadius: 7,
        padding: "8px 12px",
        fontSize: 14,
        color: "#111827",
        outline: "none",
    },
    inputError: {
        borderColor: "#EF4444",
    },
    errorText: {
        fontSize: 12,
        color: "#EF4444",
    },
    colorSelectWrap: {
        position: "relative",
    },
    colorPreview: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        border: "1.5px solid #D1D5DB",
        borderRadius: 7,
        padding: "8px 12px",
        background: "#fff",
        cursor: "pointer",
    },
    colorDot: {
        width: 14,
        height: 14,
        borderRadius: "50%",
        flexShrink: 0,
    },
    hiddenSelect: {
        position: "absolute",
        inset: 0,
        opacity: 0,
        cursor: "pointer",
        width: "100%",
    },
    modalFooter: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 10,
        padding: "14px 20px",
        borderTop: "1px solid #E5E7EB",
        background: "#F9FAFB",
    },
    btnCancel: {
        background: "none",
        border: "1px solid #D1D5DB",
        borderRadius: 7,
        padding: "8px 18px",
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        color: "#374151",
    },
    btnSubmit: {
        background: "#3B82F6",
        color: "#fff",
        border: "none",
        borderRadius: 7,
        padding: "8px 20px",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
    },
};