"use client";

import { UserButton } from "@clerk/nextjs";
import { useRole } from "@/lib/hooks/use-role";
import { getRoleLabel } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const { role } = useRole();

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-10">
      <MobileNav />

      <div className="flex items-center gap-3 ml-auto">
        {role && (
          <Badge variant="secondary" className="text-xs hidden sm:flex">
            {getRoleLabel(role)}
          </Badge>
        )}
        <UserButton />
      </div>
    </header>
  );
}