"use client";

import { useState, use } from "react";
import { 
    ArrowLeft, 
    FileText, 
    Upload, 
    Send,
    Calendar,
    BookOpen
} from "lucide-react";
import Link from "next/link";

export default function AssignmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [answer, setAnswer] = useState("");

    return (
        <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1, padding: "24px", overflow: "auto" }}>
                {/* Back Link */}
                <Link href="/student/assignments" style={s.backLink}>
                    <ArrowLeft size={16} />
                    <span>Back</span>
                </Link>

                {/* Assignment Header Card */}
                <div style={s.card}>
                    <div style={s.headerTop}>
                        <div style={s.titleSection}>
                            <div style={s.iconWrapper}>
                                <FileText size={24} color="#6B7280" />
                            </div>
                            <div>
                                <h1 style={s.title}>Chapter 5 Quiz</h1>
                                <div style={s.metaRow}>
                                    <div style={s.metaItem}>
                                        <BookOpen size={14} color="#6B7280" />
                                        <span>Algebra II</span>
                                    </div>
                                    <div style={s.metaItem}>
                                        <Calendar size={14} color="#6B7280" />
                                        <span>Due: Dec 18, 2026</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={s.statusBadge}>In Progress</div>
                    </div>

                    <div style={s.descriptionSection}>
                        <h3 style={s.sectionLabel}>Description</h3>
                        <p style={s.sectionContent}>None</p>
                    </div>

                    <div style={s.descriptionSection}>
                        <h3 style={s.sectionLabel}>Instructions</h3>
                        <p style={s.sectionContent}>None</p>
                    </div>
                </div>

                {/* Upload Card */}
                <div style={s.card}>
                    <h2 style={s.cardTitle}>Upload Your Work</h2>
                    <div style={s.uploadArea}>
                        <Upload size={32} color="#6B7280" />
                        <p style={s.uploadText}>Click to upload or drag and drop</p>
                        <p style={s.uploadSubtext}>PDF, DOC, DOCX, JPG, or PNG (MAX. 10MB)</p>
                    </div>
                </div>

                {/* Type Answer Card */}
                <div style={s.card}>
                    <h2 style={s.cardTitle}>Or Type Your Answer</h2>
                    <textarea
                        style={s.textarea}
                        placeholder="Type your answer here..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <div style={s.footer}>
                    <button style={s.submitBtn}>
                        <Send size={16} />
                        <span>Submit Assignment</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

const s: Record<string, React.CSSProperties> = {
    page: {
        fontFamily: "'Segoe UI', sans-serif",
        minHeight: "100vh",
        backgroundColor: "#E8EDFF", // Light blue-ish background as seen in image
        padding: "32px 24px",
    },
    container: {
        maxWidth: 1000,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 20,
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
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: "24px 32px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    },
    headerTop: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 24,
    },
    titleSection: {
        display: "flex",
        gap: 16,
        alignItems: "center",
    },
    iconWrapper: {
        width: 48,
        height: 48,
        backgroundColor: "#F3F4F6",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
        color: "#111827",
        margin: "0 0 6px 0",
    },
    metaRow: {
        display: "flex",
        gap: 24,
    },
    metaItem: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 14,
        color: "#6B7280",
    },
    statusBadge: {
        backgroundColor: "#F3F4F6",
        color: "#374151",
        padding: "6px 16px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
    },
    descriptionSection: {
        marginTop: 20,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: 600,
        color: "#374151",
        margin: "0 0 8px 0",
    },
    sectionContent: {
        fontSize: 14,
        color: "#6B7280",
        margin: 0,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 600,
        color: "#374151",
        margin: "0 0 20px 0",
    },
    uploadArea: {
        border: "1px solid #E5E7EB",
        borderRadius: 12,
        padding: "48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        cursor: "pointer",
    },
    uploadText: {
        fontSize: 14,
        fontWeight: 500,
        color: "#374151",
        margin: 0,
    },
    uploadSubtext: {
        fontSize: 12,
        color: "#9CA3AF",
        margin: 0,
    },
    textarea: {
        width: "100%",
        minHeight: 200,
        padding: "20px",
        backgroundColor: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 12,
        fontSize: 14,
        color: "#111827",
        outline: "none",
        resize: "vertical",
    },
    footer: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 12,
    },
    submitBtn: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#7C9CFF", // Blueish color from image
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "12px 24px",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
    },
};
