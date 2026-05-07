"use client";

import { useRole } from "@/lib/hooks/use-role";
import { useUsers } from "@/lib/hooks/use-users";
import { useDatasets } from "@/lib/hooks/use-datasets";
import { useRequests } from "@/lib/hooks/use-requests";
import { useSubscriptions } from "@/lib/hooks/use-subscriptions";
import { StatCard } from "@/components/shared/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import { Users, Database, FileText, CreditCard } from "lucide-react";

export default function DashboardPage() {
  const { role, isAdminGlobal, isAdminMetier } = useRole();
  const { data: users } = useUsers();
  const { data: datasets } = useDatasets();
  const { data: requests } = useRequests();
  const { data: subscriptions } = useSubscriptions();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome to your Bioval workspace"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isAdminGlobal && (
          <StatCard
            title="Total Users"
            value={users?.count ?? 0}
            icon={Users}
            description="All registered users"
          />
        )}

        <StatCard
          title="Datasets"
          value={datasets?.count ?? 0}
          icon={Database}
          description="Available datasets"
        />

        {isAdminMetier && (
          <StatCard
            title="Pending Requests"
            value={
              requests?.results.filter((r) => r.status === "pending").length ?? 0
            }
            icon={FileText}
            description="Awaiting review"
          />
        )}

        {isAdminGlobal && (
          <StatCard
            title="Active Subscriptions"
            value={
              subscriptions?.results.filter((s) => s.statut === "active").length ?? 0
            }
            icon={CreditCard}
            description="Currently active"
          />
        )}
      </div>
    </div>
  );
}