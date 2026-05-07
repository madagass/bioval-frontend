"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "@/lib/hooks/use-role";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Database,
  FileText,
  Users,
  Group,
  CreditCard,
  ScrollText,
  Settings,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin_global", "admin_metier", "admin_externe", "user_interne", "user_externe"],
  },
  {
    label: "Datasets",
    href: "/datasets",
    icon: Database,
    roles: ["admin_global", "admin_metier", "admin_externe", "user_interne", "user_externe"],
  },
  {
    label: "Requests",
    href: "/requests",
    icon: FileText,
    roles: ["admin_metier"],
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
    roles: ["admin_global", "admin_metier"],
  },
  {
    label: "Groups",
    href: "/groups",
    icon: Group,
    roles: ["admin_global", "admin_externe"],
  },
  {
    label: "Subscriptions",
    href: "/subscriptions",
    icon: CreditCard,
    roles: ["admin_global", "admin_externe"],
  },
  {
    label: "Logs",
    href: "/logs",
    icon: ScrollText,
    roles: ["admin_global"],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["admin_global", "admin_metier", "admin_externe", "user_interne", "user_externe"],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { role } = useRole();

  const filtered = navItems.filter(
    (item) => role && item.roles.includes(role)
  );

  return (
    <aside className="hidden md:flex flex-col w-60 border-r bg-white h-screen sticky top-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b">
        <span className="text-xl font-semibold text-primary">Bioval</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {filtered.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}