"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutGrid,
  CalendarDays,
  ClipboardList,
  MessageSquare,
  Users,
  BarChart2,
  Clock,
  GraduationCap,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
};

const mainNavItems: NavItem[] = [
  { label: "Home", href: "/teacher", icon: LayoutGrid },
  { label: "Classes", href: "/teacher/classes", icon: CalendarDays },
  { label: "Assignments", href: "/teacher/assignments", icon: ClipboardList },
  { label: "Students", href: "/teacher/students", icon: Users },
  { label: "Messages", href: "/teacher/messages", icon: MessageSquare, badge: 3 },
];

const reportNavItems: NavItem[] = [
  { label: "Analytics", href: "/analytics", icon: BarChart2 },
  { label: "Attendance", href: "/attendance", icon: Clock },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col overflow-hidden w-50 h-screen bg-white border-r border-gray-100 py-5 sticky top-0">
      <nav className="flex flex-col">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            isActive={pathname === item.href}
          />
        ))}
      </nav>
    </aside>
  );
}

function NavLink({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`relative flex items-center gap-2.5 w-full px-5 py-2.5 text-sm transition-colors text-left
        ${isActive
          ? "bg-blue-50 text-blue-600 font-medium"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
        }`}
    >
      {isActive && (
        <span className="absolute left-0 top-1.5 bottom-1.5 w-0.75 bg-blue-600 rounded-r-sm" />
      )}
      <Icon
        size={16}
        className={`shrink-0 ${isActive ? "opacity-100" : "opacity-60"}`}
      />
      <span>{item.label}</span>
      {item.badge !== undefined && (
        <span className="ml-auto bg-blue-600 text-white text-[11px] font-medium px-1.5 py-px rounded-full">
          {item.badge}
        </span>
      )}
    </Link>
  );
}