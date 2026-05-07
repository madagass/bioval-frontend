"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { type Role } from "@/lib/types";
import { isAdmin, isAdminGlobal, isAdminMetier, isAdminExterne, isUserInterne, isUserExterne } from "@/lib/utils";

export function useRole() {
  const { getToken, isLoaded } = useAuth();

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) return null;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return null;
      return res.json();
    },
    enabled: isLoaded,
    retry: 3,
  });

  const role = user?.role as Role | undefined;

  return {
    role,
    isLoaded: !!user,
    isAdmin: role ? isAdmin(role) : false,
    isAdminGlobal: role ? isAdminGlobal(role) : false,
    isAdminMetier: role ? isAdminMetier(role) : false,
    isAdminExterne: role ? isAdminExterne(role) : false,
    isUserInterne: role ? isUserInterne(role) : false,
    isUserExterne: role ? isUserExterne(role) : false,
  };
}