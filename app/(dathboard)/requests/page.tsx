"use client";

import { useRequests } from "@/lib/hooks/use-requests";
import { PageHeader } from "@/components/shared/page-header";
import { RequestsTable } from "@/components/requests/requests-table";
import { RoleGuard } from "@/components/shared/role-guard";

export default function RequestsPage() {
  const { data, isLoading } = useRequests();

  return (
    <RoleGuard
      allowedRoles={["admin_metier"]}
      fallback={
        <div className="text-muted-foreground text-sm">
          You don't have access to this page.
        </div>
      }
    >
      <PageHeader
        title="Access Requests"
        description="Review and manage platform access requests"
      />
      <RequestsTable
        data={data?.results ?? []}
        isLoading={isLoading}
      />
    </RoleGuard>
  );
}