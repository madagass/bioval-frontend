"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (userId) {
      router.replace("/dashboard");
    } else {
      router.replace("/sign-in");
    }
  }, [isLoaded, userId, router]);

  return null;
}