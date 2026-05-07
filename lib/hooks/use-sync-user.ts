"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export function useSyncUser() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const sync = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/sync/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
  }, [isLoaded, user]);
}