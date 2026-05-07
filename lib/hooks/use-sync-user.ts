"use client";

import { useEffect } from "react";
import { useUser, useAuth } from "@clerk/nextjs";

export function useSyncUser() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const sync = async () => {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/sync/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          clerk_id: user.id,
          email: user.primaryEmailAddress?.emailAddress ?? "",
          prenom: user.firstName ?? "Unknown",
          nom: user.lastName ?? "Unknown",
        }),
      });
      const data = await res.json();
      console.log("sync result:", data);
    };

    sync();
  }, [isLoaded, user, getToken]);
}