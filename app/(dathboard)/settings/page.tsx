"use client";

import { UserProfile } from "@clerk/nextjs";
import { PageHeader } from "@/components/shared/page-header";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your account and preferences"
      />
      <UserProfile />
    </div>
  );
}