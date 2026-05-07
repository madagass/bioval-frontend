"use client";

import { useUser } from "@clerk/nextjs";
import { type Role } from "@/lib/types";
import {
  isAdmin,
  isAdminGlobal,
  isAdminMetier,
  isAdminExterne,
  isUserInterne,
  isUserExterne,
} from "@/lib/utils";

export function useRole() {
  const { user, isLoaded } = useUser();

  const role = user?.publicMetadata?.role as Role | undefined;

  return {
    role,
    isLoaded,
    isAdmin: role ? isAdmin(role) : false,
    isAdminGlobal: role ? isAdminGlobal(role) : false,
    isAdminMetier: role ? isAdminMetier(role) : false,
    isAdminExterne: role ? isAdminExterne(role) : false,
    isUserInterne: role ? isUserInterne(role) : false,
    isUserExterne: role ? isUserExterne(role) : false,
  };
}