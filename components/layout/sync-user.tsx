"use client";
import { useSyncUser } from "@/lib/hooks/use-sync-user";

export function SyncUser() {
  useSyncUser();
  return null;
}