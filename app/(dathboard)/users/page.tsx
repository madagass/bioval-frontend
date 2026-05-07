"use client";

import { useUsers } from "@/lib/hooks/use-users";
import { PageHeader } from "@/components/shared/page-header";
import { UsersTable } from "@/components/users/users-table";
import { RoleGuard } from "@/components/shared/role-guard";

export default function UsersPage() {
  const { data, isLoading } = useUsers();

  return (
    <RoleGuard
      allowedRoles={["admin_global", "admin_metier"]}
      fallback={
        <div className="text-muted-foreground text-sm">
          You don&apos;t have access to this page.
        </div>
      }
    >
      <PageHeader
        title="Users"
        description="Manage platform users"
      />
      <UsersTable
        data={data?.results ?? []}
        isLoading={isLoading}
      />
    </RoleGuard>
  );
}