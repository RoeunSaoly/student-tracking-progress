"use client";

import { useState, useRef } from "react";
import { Filter, Plus, Calendar, AlertCircle, X, Paperclip } from "lucide-react";

const initialAssignments = [
    { id: 1, title: "Chapter 5 Quiz",      class: "Algebra II",   due: "Due Today",    urgent: true,  submitted: 18, total: 28 },
    { id: 2, title: "Geometry Homework",   class: "Geometry",     due: "Due Tomorrow", urgent: false, submitted: 22, total: 25 },
    { id: 3, title: "Integration Practice",class: "Calculus AP",  due: "Due Dec 15",   urgent: false, submitted: 15, total: 33 },
    { id: 4, title: "Probability Test",    class: "Statistics",   due: "Due Dec 16",   urgent: false, submitted: 8,  total: 30 },
    { id: 5, title: "Final Project",       class: "Pre-Calculus", due: "Due Dec 18",   urgent: false, submitted: 5,  total: 22 },
];

const classFilters = ["All Classes", "Algebra II", "Geometry", "Calculus AP", "Statistics", "Pre-Calculus"];

const emptyForm = { title: "", instruction: "", file: null as File | null, totalPoints: "28", urgent: false, class: "Algebra II", due: "" };

export default function UpcomingAssignmentsPage() {
    const [assignments, setAssignments] = useState(initialAssignments);
    const [activeClass, setActiveClass] = useState("All Classes");
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const fileRef = useRef<HTMLInputElement>(null);

    const filtered = activeClass === "All Classes"
        ? assignments
        : assignments.filter((a) => a.class === activeClass);

    const openModal = () => { setForm(emptyForm); setErrors({}); setModalOpen(true); };
    const closeModal = () => { setModalOpen(false); setForm(emptyForm); setErrors({}); };

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.title.trim()) e.title = "Assignment title is required";
        if (!form.due.trim()) e.due = "Due date is required";
        if (!form.totalPoints || isNaN(Number(form.totalPoints)) || Number(form.totalPoints) <= 0)
            e.totalPoints = "Enter a valid point value";
        return e;
    };

    const handleCreate = () => {
        const e = validate();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        const dueLabel = new Date(form.due).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        setAssignments(prev => [...prev, {
            id: Date.now(),
            title: form.title.trim(),
            class: form.class,
            due: `Due ${dueLabel}`,
            urgent: form.urgent,
            submitted: 0,
            total: Number(form.totalPoints),
        }]);
        closeModal();
    };

    const set = (field: string, value: unknown) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    };

    return (
        <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
            <main style={{ padding: 24 }}>
                <div style={s.contentBox}>
                    {/* Header */}
                    <div style={s.pageHeader}>
                        <h1 style={s.h1}>Upcoming Assignments</h1>
                        <div style={{ display: "flex", gap: 10 }}>
                            <button style={s.filterBtn}><Filter size={15} /> Filter</button>
                            <button style={s.createBtn} onClick={openModal}><Plus size={15} /> Create Assignment</button>
                        </div>
                    </div>

                    {/* Class filter pills */}
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
                                    }}>{cf}</button>
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
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                        <span style={s.assignmentTitle}>{a.title}</span>
                                        {a.urgent && <AlertCircle size={15} color="#EF4444" />}
                                    </div>
                                    <div style={s.assignmentClass}>{a.class}</div>
                                    <div style={s.dueLine}>
                                        <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#6B7280", fontSize: 13 }}>
                                            <Calendar size={13} />{a.due}
                                        </span>
                                        <span style={s.submittedText}>
                                            <span style={{ color: "#111827", fontWeight: 700 }}>{a.submitted}</span>
                                            <span style={{ color: "#6B7280" }}>/{a.total} submitted</span>
                                        </span>
                                    </div>
                                    <div style={s.progressTrack}>
                                        <div style={{ ...s.progressFill, width: `${pct}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            {/* Modal */}
            {modalOpen && (
                <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && closeModal()}>
                    <div style={s.modal}>
                        {/* Modal header */}
                        <div style={s.modalHeader}>
                            <h2 style={s.modalTitle}>Create New Assignment</h2>
                            <button style={s.closeBtn} onClick={closeModal}><X size={18} /></button>
                        </div>

                        {/* Modal body */}
                        <div style={s.modalBody}>
                            {/* Assignment Title */}
                            <div style={s.field}>
                                <label style={s.label}>Assignment Title <span style={s.req}>*</span></label>
                                <input
                                    style={{ ...s.input, ...(errors.title ? s.inputErr : {}) }}
                                    placeholder="e.g., Chapter 6 Quiz"
                                    value={form.title}
                                    onChange={(e) => set("title", e.target.value)}
                                />
                                {errors.title && <span style={s.errText}>{errors.title}</span>}
                            </div>

                            {/* Class */}
                            <div style={s.field}>
                                <label style={s.label}>Class <span style={s.req}>*</span></label>
                                <select style={s.input} value={form.class} onChange={(e) => set("class", e.target.value)}>
                                    {classFilters.filter(c => c !== "All Classes").map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Instruction */}
                            <div style={s.field}>
                                <label style={s.label}>Instruction</label>
                                <input
                                    style={s.input}
                                    placeholder="instruction"
                                    value={form.instruction}
                                    onChange={(e) => set("instruction", e.target.value)}
                                />
                            </div>

                            {/* Attach File */}
                            <div style={s.field}>
                                <label style={s.label}>Attach File</label>
                                <div
                                    style={s.fileBox}
                                    onClick={() => fileRef.current?.click()}
                                >
                                    {form.file ? (
                                        <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#2563EB", fontSize: 13 }}>
                                            <Paperclip size={13} />{form.file.name}
                                        </span>
                                    ) : (
                                        <span style={{ color: "#9CA3AF", fontSize: 13 }}>Click to attach a file</span>
                                    )}
                                </div>
                                <input
                                    ref={fileRef}
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => set("file", e.target.files?.[0] ?? null)}
                                />
                            </div>

                            {/* Due Date */}
                            <div style={s.field}>
                                <label style={s.label}>Due Date <span style={s.req}>*</span></label>
                                <input
                                    type="date"
                                    style={{ ...s.input, ...(errors.due ? s.inputErr : {}) }}
                                    value={form.due}
                                    onChange={(e) => set("due", e.target.value)}
                                />
                                {errors.due && <span style={s.errText}>{errors.due}</span>}
                            </div>

                            {/* Total Points */}
                            <div style={s.field}>
                                <label style={s.label}>Total Points</label>
                                <input
                                    type="number"
                                    style={{ ...s.input, ...(errors.totalPoints ? s.inputErr : {}) }}
                                    value={form.totalPoints}
                                    onChange={(e) => set("totalPoints", e.target.value)}
                                    min={1}
                                />
                                {errors.totalPoints && <span style={s.errText}>{errors.totalPoints}</span>}
                            </div>

                            {/* Mark as urgent */}
                            <label style={s.checkRow}>
                                <input
                                    type="checkbox"
                                    checked={form.urgent}
                                    onChange={(e) => set("urgent", e.target.checked)}
                                    style={{ accentColor: "#2563EB", width: 15, height: 15, cursor: "pointer" }}
                                />
                                <span style={{ fontSize: 14, color: "#374151" }}>Mark as urgent</span>
                            </label>
                        </div>

                        {/* Modal footer */}
                        <div style={s.modalFooter}>
                            <button style={s.btnCancel} onClick={closeModal}>Cancel</button>
                            <button style={s.btnSubmit} onClick={handleCreate}>Create Assignment</button>
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
        borderRadius: 10,
        border: "1px solid #E5E7EB",
        padding: "24px 28px",
    },
    pageHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    h1: { margin: 0, fontSize: 20, fontWeight: 700, color: "#111827" },
    filterBtn: {
        display: "flex", alignItems: "center", gap: 6,
        backgroundColor: "#fff", border: "1px solid #D1D5DB",
        borderRadius: 8, padding: "8px 16px", fontSize: 14, color: "#374151", cursor: "pointer", fontWeight: 500,
    },
    createBtn: {
        display: "flex", alignItems: "center", gap: 6,
        backgroundColor: "#2563EB", border: "none",
        borderRadius: 8, padding: "8px 18px", fontSize: 14, color: "#fff", cursor: "pointer", fontWeight: 600,
    },
    filterLabel: { margin: "0 0 10px", fontSize: 13, color: "#6B7280", fontWeight: 500 },
    classFilters: { display: "flex", flexWrap: "wrap", gap: 8 },
    classFilterBtn: { borderRadius: 20, padding: "5px 16px", fontSize: 13, cursor: "pointer" },
    list: { display: "flex", flexDirection: "column", gap: 0 },
    assignmentCard: { padding: "20px 0", borderBottom: "1px solid #F3F4F6" },
    assignmentTitle: { fontSize: 16, fontWeight: 700, color: "#111827" },
    assignmentClass: { fontSize: 13, color: "#6B7280", margin: "3px 0 12px" },
    dueLine: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    submittedText: { fontSize: 13 },
    progressTrack: { height: 8, backgroundColor: "#E5E7EB", borderRadius: 99, overflow: "hidden" },
    progressFill: { height: "100%", backgroundColor: "#2563EB", borderRadius: 99, transition: "width 0.3s" },

    // Modal
    overlay: {
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
        zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center",
    },
    modal: {
        background: "#fff", borderRadius: 12, width: 440, maxWidth: "95vw",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)", overflow: "hidden",
    },
    modalHeader: {
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "18px 20px 14px", borderBottom: "1px solid #E5E7EB",
    },
    modalTitle: { fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 },
    closeBtn: {
        background: "none", border: "none", cursor: "pointer",
        color: "#9CA3AF", display: "flex", alignItems: "center", padding: "2px 4px", borderRadius: 4,
    },
    modalBody: { padding: 20, display: "flex", flexDirection: "column", gap: 14 },
    field: { display: "flex", flexDirection: "column", gap: 5 },
    label: { fontSize: 13, fontWeight: 600, color: "#374151" },
    req: { color: "#EF4444" },
    input: {
        width: "100%",
        borderWidth: "1.5px", borderStyle: "solid", borderColor: "#D1D5DB", borderRadius: 7,
        padding: "8px 12px", fontSize: 14, color: "#111827", outline: "none", background: "#fff",
    },
    inputErr: { borderColor: "#EF4444" },
    errText: { fontSize: 12, color: "#EF4444" },
    fileBox: {
        border: "1.5px solid #D1D5DB", borderRadius: 7, padding: "8px 12px",
        minHeight: 38, cursor: "pointer", display: "flex", alignItems: "center",
    },
    checkRow: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" },
    modalFooter: {
        display: "flex", justifyContent: "flex-end", gap: 10,
        padding: "14px 20px", borderTop: "1px solid #E5E7EB", background: "#F9FAFB",
    },
    btnCancel: {
        background: "none", border: "1px solid #D1D5DB", borderRadius: 7,
        padding: "8px 18px", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "#374151",
    },
    btnSubmit: {
        background: "#2563EB", color: "#fff", border: "none", borderRadius: 7,
        padding: "8px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer",
    },
};