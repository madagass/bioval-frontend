"use client";

import { useRole } from "@/lib/hooks/use-role";
import { useDeleteGroup } from "@/lib/hooks/use-groups";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { type Group } from "@/lib/types";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface GroupsTableProps {
  data: Group[];
  isLoading: boolean;
}

export function GroupsTable({ data, isLoading }: GroupsTableProps) {
  const { isAdminGlobal, isAdminExterne } = useRole();
  const { mutate: deleteGroup } = useDeleteGroup();

  const columns = [
    { key: "nom", label: "Name" },
    {
      key: "membres",
      label: "Members",
      render: (row: Group) => (
        <Badge variant="secondary">{row.membres.length} members</Badge>
      ),
    },
    {
      key: "abonnement",
      label: "Subscription",
      render: (row: Group) => (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          row.abonnement?.statut === "active"
            ? "text-green-600 bg-green-50"
            : "text-gray-600 bg-gray-50"
        }`}>
          {row.abonnement?.statut ?? "none"}
        </span>
      ),
    },
    {
      key: "data_creation",
      label: "Created",
      render: (row: Group) => formatDate(row.data_creation),
    },
    {
      key: "actions",
      label: "",
      render: (row: Group) =>
        isAdminGlobal || isAdminExterne ? (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-red-600 hover:text-red-700"
            onClick={() => {
              deleteGroup(row.id);
              toast.success("Group deleted");
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        ) : null,
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      searchKey="nom"
      searchPlaceholder="Search groups..."
      isLoading={isLoading}
    />
  );
}