"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { getLogs } from "@/lib/api/logs";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { RoleGuard } from "@/components/shared/role-guard";
import { formatDateTime } from "@/lib/utils";
import { type Log } from "@/lib/types";

const columns = [
  { key: "id", label: "ID" },
  { key: "user_email", label: "User" },
  { key: "action", label: "Action" },
  {
    key: "created_at",
    label: "Date",
    render: (row: Log) => formatDateTime(row.created_at),
  },
];

export default function LogsPage() {
  const { getToken, isLoaded } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) return null;
      return getLogs(token);
    },
    enabled: isLoaded,
  });

  return (
    <RoleGuard
      allowedRoles={["admin_global"]}
      fallback={
        <div className="text-muted-foreground text-sm">
          You don't have access to this page.
        </div>
      }
    >
      <PageHeader
        title="Activity Logs"
        description="Monitor all platform activity"
      />
      <DataTable
        data={data?.results ?? []}
        columns={columns}
        searchKey="user_email"
        searchPlaceholder="Search by email..."
        isLoading={isLoading}
      />
    </RoleGuard>
  );
}