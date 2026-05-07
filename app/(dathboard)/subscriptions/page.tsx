"use client";

import { useSubscriptions } from "@/lib/hooks/use-subscriptions";
import { useGroups } from "@/lib/hooks/use-groups";
import { PageHeader } from "@/components/shared/page-header";
import { SubscriptionCard } from "@/components/subscriptions/subscription-card";
import { RoleGuard } from "@/components/shared/role-guard";

export default function SubscriptionsPage() {
  const { data: subscriptions, isLoading } = useSubscriptions();
  const { data: groups } = useGroups();

  return (
    <RoleGuard
      allowedRoles={["admin_global", "admin_externe"]}
      fallback={
        <div className="text-muted-foreground text-sm">
          You don't have access to this page.
        </div>
      }
    >
      <PageHeader
        title="Subscriptions"
        description="Manage group subscriptions"
      />

      {isLoading ? (
        <div className="text-muted-foreground text-sm">Loading...</div>
      ) : subscriptions?.results.length === 0 ? (
        <div className="text-muted-foreground text-sm">No subscriptions found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subscriptions?.results.map((sub) => {
            const group = groups?.results.find((g) => g.id === sub.group_id);
            return (
              <SubscriptionCard
                key={sub.id}
                subscription={sub}
                groupName={group?.nom ?? "Unknown group"}
              />
            );
          })}
        </div>
      )}
    </RoleGuard>
  );
}