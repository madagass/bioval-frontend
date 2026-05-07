"use client";

import { useRole } from "@/lib/hooks/use-role";
import { type Role } from "@/lib/types";

interface RoleGuardProps {
  allowedRoles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children, fallback = null }: RoleGuardProps) {
  const { role, isLoaded } = useRole();

  if (!isLoaded) return null;
  if (!role || !allowedRoles.includes(role)) return <>{fallback}</>;

  return <>{children}</>;
}