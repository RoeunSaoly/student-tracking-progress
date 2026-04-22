"use client"

import { useState } from "react";
import {
  BookOpen,
  CalendarCheck,
  GraduationCap,
  CheckCircle2,
  MoreVertical,
  Bell,
  Plus,
  Target,
  Clock,
  AlertCircle,
} from "lucide-react";

const statCards = [
  { label: "Active Classes", value: "4", icon: BookOpen, labelColor: "#a855f7", iconBg: "#f3e8ff", iconColor: "#a855f7", bg: "#ffffff" },
  { label: "Assignments", value: "12", icon: CalendarCheck, labelColor: "#3b82f6", iconBg: "#dbeafe", iconColor: "#3b82f6", bg: "#ffffff" },
  { label: "Avg. Grade", value: "77.5%", icon: GraduationCap, labelColor: "#f97316", iconBg: "#ffedd5", iconColor: "#f97316", bg: "#fff7ed" },
  { label: "Completed", value: "28/35", icon: CheckCircle2, labelColor: "#22c55e", iconBg: "#dcfce7", iconColor: "#22c55e", bg: "#f0fdf4" },
];

const courseProgress = [
  { name: "Mathematics 101", instructor: "Dr. Sarah Johnson", progress: 75, color: "#3b82f6", key: "Mathematics" },
  { name: "Physics Advanced", instructor: "Prof. Michael Chen", progress: 60, color: "#a855f7", key: "Physics" },
  { name: "Chemistry Basics", instructor: "Dr. Emily Davis", progress: 85, color: "#22c55e", key: "Chemistry" },
  { name: "Computer Science", instructor: "Prof. James Wilson", progress: 90, color: "#f97316", key: "Computer" },
];

const announcements = [
  { title: "Midterm Exam Schedule", description: "The midterm exam will be held on December 18th.", time: "2 hours ago", iconBg: "#dbeafe", iconColor: "#3b82f6" },
  { title: "Lab Session Cancelled", description: "Tomorrow's lab is cancelled.", time: "2 days ago", iconBg: "#dcfce7", iconColor: "#22c55e" },
  { title: "New Study Materials", description: "Additional practice problems uploaded.", time: "1 day ago", iconBg: "#fee2e2", iconColor: "#ef4444" },
  { title: "Midterm Exam Schedule", description: "The midterm exam will be held on December 18th.", time: "2 hours ago", iconBg: "#dbeafe", iconColor: "#3b82f6" },
  { title: "Lab Session Cancelled", description: "Tomorrow's lab is cancelled.", time: "2 days ago", iconBg: "#dcfce7", iconColor: "#22c55e" },
  { title: "New Study Materials", description: "Additional practice problems uploaded.", time: "1 day ago", iconBg: "#fee2e2", iconColor: "#ef4444" },
];

const goals = [
  { title: "Achieve 90% in Mathematics", progress: 75, target: 90, icon: Target, iconBg: "#dbeafe", iconColor: "#3b82f6", barColor: "#3b82f6", trend: "+10%", display: "75% / 90%" },
  { title: "Complete all Physics assignments", progress: 8, target: 12, icon: BookOpen, iconBg: "#f3e8ff", iconColor: "#a855f7", barColor: "#a855f7", trend: "+10%", display: "8 / 12" },
  { title: "Study 20 hours this week", progress: 17, target: 20, icon: Clock, iconBg: "#ffedd5", iconColor: "#f97316", barColor: "#f97316", trend: "+10%", display: "17hrs / 20hrs" },
];

const legendItems = [
  { label: "Grade Goals", color: "#3b82f6" },
  { label: "Assignment Goals", color: "#a855f7" },
  { label: "Study Hours", color: "#f97316" },
  { label: "Completed", color: "#22c55e" },
];

const s = {
  page: { fontFamily: "'DM Sans','Segoe UI',sans-serif", display: "flex", minHeight: "100vh", backgroundColor: "#f1f5f9" },
  sidebar: { width: 176, minHeight: "100vh", backgroundColor: "#fff", padding: "24px 12px", boxShadow: "1px 0 4px rgba(0,0,0,0.05)", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 10, display: "flex", flexDirection: "column" },
  logoBox: { width: 32, height: 32, borderRadius: 8, backgroundColor: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32, marginLeft: 4 },
  nav: { display: "flex", flexDirection: "column", gap: 4 },
  main: { marginLeft: 176, flex: 1, padding: "24px 28px" },
  card: { backgroundColor: "#fff", borderRadius: 18, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6" },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { fontSize: 15, fontWeight: 600, color: "#1f2937", margin: 0 },
};

export default function StudentDashboard() {
  const maxBarH = 180;
  const goalMaxH = 110;

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" }}>

      {/* Main */}
      <main style={{ flex: 1, padding: "24px", overflow: "auto" }}>
        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
          {statCards.map((card, idx) => (
            <div key={idx} style={{ ...s.card, backgroundColor: card.bg, padding: "20px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: card.labelColor, margin: "0 0 6px 0" }}>{card.label}</p>
                <h3 style={{ fontSize: 28, fontWeight: 700, color: "#1f2937", margin: 0 }}>{card.value}</h3>
              </div>
              <div style={{ backgroundColor: card.iconBg, padding: 12, borderRadius: 14 }}>
                <card.icon size={22} color={card.iconColor} />
              </div>
            </div>
          ))}
        </div>

        {/* Bar Chart + Donut */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 20 }}>
          {/* Bar Chart */}
          <div style={{ ...s.card, padding: "22px 24px" }}>
            <div style={{ ...s.row, marginBottom: 20 }}>
              <h2 style={s.sectionTitle}>All Courses Progress</h2>
              <button style={{ fontSize: 12, fontWeight: 600, color: "#4f46e5", background: "none", border: "none", cursor: "pointer" }}>View All</button>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-around", height: maxBarH + 40, marginBottom: 16 }}>
              {courseProgress.map((course, idx) => {
                const barH = Math.round((course.progress / 100) * maxBarH);
                return (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 80 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", marginBottom: 6 }}>{course.progress}%</span>
                    <div style={{ width: 52, height: barH, borderRadius: "8px 8px 0 0", backgroundColor: course.color }} />
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#374151", textAlign: "center", marginTop: 8, lineHeight: 1.3, margin: "8px 0 2px" }}>{course.name}</p>
                    <p style={{ fontSize: 10, color: "#9ca3af", textAlign: "center", margin: 0 }}>{course.instructor}</p>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, paddingTop: 14, borderTop: "1px solid #f9fafb" }}>
              {courseProgress.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c.color }} />
                  <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 500 }}>{c.key}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donut */}
          <div style={{ ...s.card, padding: "22px 24px", display: "flex", flexDirection: "column" }}>
            <div style={{ ...s.row, marginBottom: 16 }}>
              <h2 style={s.sectionTitle}>Course Progress</h2>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}><MoreVertical size={18} /></button>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "relative", width: 160, height: 160 }}>
                <svg viewBox="0 0 100 100" width="160" height="160">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#6366f1" strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 38 * 0.775} ${2 * Math.PI * 38 * 0.225}`}
                    strokeLinecap="round" transform="rotate(-90 50 50)" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ fontSize: 10, color: "#9ca3af", margin: 0 }}>Total</p>
                  <p style={{ fontSize: 20, fontWeight: 700, color: "#1f2937", margin: 0 }}>77.5%</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
                {[["#7c3aed", "Completed"], ["#f97316", "In Progress"]].map(([color, label]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }} />
                    <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Announcements + Goals */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 16 }}>
          {/* Announcements */}
          <div style={{ ...s.card, padding: "22px 24px" }}>
            <div style={{ ...s.row, marginBottom: 18 }}>
              <h2 style={s.sectionTitle}>Announcements</h2>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}><MoreVertical size={18} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxHeight: 340, overflowY: "auto" }}>
              {announcements.map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: 12 }}>
                  <div style={{ backgroundColor: item.iconBg, padding: 8, borderRadius: 10, flexShrink: 0, maxHeight: 30, }}>
                    <Bell size={14} color={item.iconColor} />
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#1f2937", margin: 0 }}>{item.title}</p>
                    <p style={{ fontSize: 11, color: "#6b7280", margin: "2px 0" }}>{item.description}</p>
                    <span style={{ fontSize: 10, color: "#9ca3af" }}>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <button style={{ width: "100%", marginTop: 16, fontSize: 12, fontWeight: 600, color: "#4f46e5", background: "none", border: "none", cursor: "pointer" }}>View All</button>
          </div>

          {/* Study Goals */}
          <div style={{ ...s.card, padding: "22px 24px" }}>
            <div style={{ ...s.row, marginBottom: 16 }}>
              <h2 style={s.sectionTitle}>My Study Goals</h2>
              <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 14px", backgroundColor: "#4f46e5", color: "#fff", borderRadius: 10, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer" }}>
                <Plus size={13} /> Add Goal
              </button>
            </div>

            {/* Goal Bars */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-around", height: goalMaxH + 50, marginBottom: 0 }}>
              {goals.map((goal, idx) => {
                const pct = Math.round((goal.progress / goal.target) * 100);
                const barH = Math.round((pct / 100) * goalMaxH);
                return (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 110 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, color: "#6b7280", marginBottom: 6 }}>{pct}%</span>
                    <div style={{ width: 40, height: barH, borderRadius: "6px 6px 0 0", backgroundColor: goal.barColor }} />
                    <p style={{ fontSize: 10, fontWeight: 700, color: "#374151", textAlign: "center", marginTop: 8, lineHeight: 1.3, padding: "0 4px", margin: "8px 0 2px" }}>{goal.title}</p>
                    <p style={{ fontSize: 9, color: "#9ca3af", textAlign: "center", margin: 0 }}>{goal.display}</p>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ display: "flex", justifyContent: "center", gap: 16, padding: "12px 0", borderTop: "1px solid #f9fafb", marginTop: 12, marginBottom: 12 }}>
              {legendItems.map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: l.color }} />
                  <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 500 }}>{l.label}</span>
                </div>
              ))}
            </div>

            {/* Goal List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {goals.map((goal, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", backgroundColor: "#f9fafb", borderRadius: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ backgroundColor: goal.iconBg, padding: 7, borderRadius: 9 }}>
                      <goal.icon size={14} color={goal.iconColor} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{goal.title}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#1f2937" }}>{goal.trend}</span>
                    <AlertCircle size={14} color="#d1d5db" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
