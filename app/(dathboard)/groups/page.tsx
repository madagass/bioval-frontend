"use client";

import { useGroups } from "@/lib/hooks/use-groups";
import { useRole } from "@/lib/hooks/use-role";
import { PageHeader } from "@/components/shared/page-header";
import { GroupsTable } from "@/components/groups/groups-table";
import { GroupDialog } from "@/components/groups/group-dialog";
import { RoleGuard } from "@/components/shared/role-guard";

export default function GroupsPage() {
  const { data, isLoading } = useGroups();
  const { isAdminExterne } = useRole();

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
        title="Groups"
        description="Manage organisation groups"
        action={isAdminExterne ? <GroupDialog /> : undefined}
      />
      <GroupsTable
        data={data?.results ?? []}
        isLoading={isLoading}
      />
    </RoleGuard>
  );
}