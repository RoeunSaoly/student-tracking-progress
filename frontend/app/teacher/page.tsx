"use client"

import { useState } from "react";
import {
  Home, BookOpen, CalendarCheck, MessageSquare, Users,
  Clock, Calendar, UserCheck, ClipboardList, CheckCircle, AlertCircle
} from "lucide-react";

const statCards = [
  { label: "Total Students", value: "156", sub: "+12 this semester", icon: UserCheck, iconBg: "#3b82f6", bg: "#fff" },
  { label: "Active Classes", value: "6", sub: "3 today", icon: BookOpen, iconBg: "#22c55e", bg: "#fff" },
  { label: "Pending Assignments", value: "24", sub: "8 due this week", icon: ClipboardList, iconBg: "#f59e0b", bg: "#fff" },
  { label: "Graded This Week", value: "89", sub: "+23 from last week", icon: CheckCircle, iconBg: "#a855f7", bg: "#fff" },
];

const classes = [
  { period: "Period 1", periodColor: "#e0e7ff", periodText: "#6366f1", name: "Algebra II", time: "8:00 AM - 9:30 AM", next: "Today", students: 28 },
  { period: "Period 2", periodColor: "#dcfce7", periodText: "#16a34a", name: "Geometry", time: "9:45 AM - 11:15 AM", next: "Today", students: 25 },
  { period: "Period 3", periodColor: "#fce7f3", periodText: "#db2777", name: "Pre-Calculus", time: "12:00 PM - 1:30 PM", next: "Today", students: 22 },
  { period: "Period 4", periodColor: "#fef9c3", periodText: "#ca8a04", name: "Statistics", time: "1:45 PM - 3:15 PM", next: "Tomorrow", students: 30 },
  { period: "Period 5", periodColor: "#ffe4e6", periodText: "#e11d48", name: "Advanced Math", time: "8:00 AM - 9:30 AM", next: "Tomorrow", students: 18 },
  { period: "Period 6", periodColor: "#ede9fe", periodText: "#7c3aed", name: "Calculus AP", time: "10:00 AM - 11:30 AM", next: "Monday", students: 33 },
];

const assignments = [
  { title: "Chapter 5 Quiz", subject: "Algebra II", due: "Due Today", urgent: true, submitted: 18, total: 28, color: "#3b82f6", pct: 18/28 },
  { title: "Geometry Homework", subject: "Geometry", due: "Due Tomorrow", urgent: false, submitted: 22, total: 25, color: "#3b82f6", pct: 22/25 },
  { title: "Integration Practice", subject: "Calculus AP", due: "Due Dec 15", urgent: false, submitted: 15, total: 33, color: "#3b82f6", pct: 15/33 },
  { title: "Probability Test", subject: "Statistics", due: "Due Dec 16", urgent: false, submitted: 8, total: 30, color: "#3b82f6", pct: 8/30 },
  { title: "Final Project", subject: "Pre-Calculus", due: "Due Dec 18", urgent: false, submitted: 5, total: 22, color: "#3b82f6", pct: 5/22, subjectColor: "#6366f1" },
];

export default function TeacherDashboard() {

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" }}>

      <div style={{ display: "flex", flex: 1 }}>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "24px", overflow: "auto" }}>
          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
            {statCards.map((card, idx) => (
              <div key={idx} style={{ backgroundColor: "#fff", borderRadius: 14, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 6px" }}>{card.label}</p>
                  <h3 style={{ fontSize: 28, fontWeight: 700, color: "#1f2937", margin: "0 0 4px" }}>{card.value}</h3>
                  <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>{card.sub}</p>
                </div>
                <div style={{ backgroundColor: card.iconBg, width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <card.icon size={22} color="#fff" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom: My Classes + Assignments */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
            {/* My Classes */}
            <div style={{ backgroundColor: "#fff", borderRadius: 14, padding: "22px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
              <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1f2937", margin: "0 0 20px" }}>My Classes</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {classes.map((cls, idx) => (
                  <div key={idx} style={{ border: "1px solid #f1f5f9", borderRadius: 12, padding: "14px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: cls.periodText, backgroundColor: cls.periodColor, padding: "3px 10px", borderRadius: 20 }}>{cls.period}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280" }}>
                        <Users size={13} color="#9ca3af" />{cls.students}
                      </span>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "#1f2937", margin: "0 0 8px" }}>{cls.name}</p>
                    <p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b7280", margin: "0 0 4px" }}>
                      <Clock size={13} color="#9ca3af" />{cls.time}
                    </p>
                    <p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b7280", margin: 0 }}>
                      <Calendar size={13} color="#9ca3af" />Next class: {cls.next}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments */}
            <div style={{ backgroundColor: "#fff", borderRadius: 14, padding: "22px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", overflowY: "auto", maxHeight: 640 }}>
              <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1f2937", margin: "0 0 16px" }}>Assignments</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {assignments.map((a, idx) => (
                  <div key={idx} style={{ padding: "16px 0", borderBottom: idx < assignments.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#1f2937" }}>{a.title}</span>
                      {a.urgent && <AlertCircle size={14} color="#ef4444" />}
                    </div>
                    <p style={{ fontSize: 12, color: a.subjectColor || "#6b7280", margin: "0 0 6px" }}>{a.subject}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6b7280" }}>
                        <Calendar size={12} color="#9ca3af" />{a.due}
                      </span>
                      <span style={{ fontSize: 12, color: "#6b7280" }}>
                        <b style={{ color: "#1f2937" }}>{a.submitted}</b>/{a.total} submitted
                      </span>
                    </div>
                    <div style={{ backgroundColor: "#e5e7eb", borderRadius: 99, height: 5, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${a.pct * 100}%`, backgroundColor: a.color, borderRadius: 99 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}