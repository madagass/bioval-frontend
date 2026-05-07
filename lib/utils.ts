import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Role } from "@/lib/types";

// ─── shadcn default ───────────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Role Helpers ─────────────────────────────────────────────────────────────
export function isAdmin(role: Role) {
  return role === "admin_global" || role === "admin_metier" || role === "admin_externe";
}

export function isAdminGlobal(role: Role) {
  return role === "admin_global";
}

export function isAdminMetier(role: Role) {
  return role === "admin_metier";
}

export function isAdminExterne(role: Role) {
  return role === "admin_externe";
}

export function isUserInterne(role: Role) {
  return role === "user_interne";
}

export function isUserExterne(role: Role) {
  return role === "user_externe";
}

// ─── Format Helpers ───────────────────────────────────────────────────────────
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

// ─── Status Helpers ───────────────────────────────────────────────────────────
export function getStatusColor(status: string) {
  switch (status) {
    case "active":
    case "accepted":
    case "validated":
      return "text-green-600 bg-green-50";
    case "pending":
      return "text-yellow-600 bg-yellow-50";
    case "inactive":
    case "rejected":
    case "expired":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
}

export function getRoleLabel(role: Role) {
  switch (role) {
    case "admin_global":
      return "Admin Global";
    case "admin_metier":
      return "Admin Métier";
    case "admin_externe":
      return "Admin Externe";
    case "user_interne":
      return "Utilisateur Interne";
    case "user_externe":
      return "Utilisateur Externe";
  }
}