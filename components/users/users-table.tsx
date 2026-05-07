"use client";

import { useState } from "react";
import { useRole } from "@/lib/hooks/use-role";
import {
  useToggleFreeAccess,
  useToggleUserActive,
  useUpdateUserRole,
  useDeleteUser,
} from "@/lib/hooks/use-users";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UserDetailDialog } from "@/components/users/user-detail-dialog";
import { getRoleLabel, formatDate } from "@/lib/utils";
import { type User } from "@/lib/types";
import { Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

interface UsersTableProps {
  data: User[];
  isLoading: boolean;
}

export function UsersTable({ data, isLoading }: UsersTableProps) {
  const { isAdminGlobal } = useRole();
  const { mutate: toggleFree } = useToggleFreeAccess();
  const { mutate: toggleActive } = useToggleUserActive();
  const { mutate: updateRole } = useUpdateUserRole();
  const { mutate: deleteUser } = useDeleteUser();
  const [selected, setSelected] = useState<User | null>(null);

  const columns = [
    {
      key: "nom",
      label: "Name",
      render: (row: User) => (
        <span className="font-medium">
          {row.prenom} {row.nom}
        </span>
      ),
    },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (row: User) =>
        isAdminGlobal ? (
          <Select
            value={row.role}
            onValueChange={(value) => {
              updateRole({ id: row.id, role: value });
              toast.success("Role updated");
            }}
          >
            <SelectTrigger className="w-40 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="admin_global">Admin Global</SelectItem>
              <SelectItem value="admin_metier">Admin Métier</SelectItem>
              <SelectItem value="admin_externe">Admin Externe</SelectItem>
              <SelectItem value="user_interne">User Interne</SelectItem>
              <SelectItem value="user_externe">User Externe</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Badge variant="secondary">{getRoleLabel(row.role)}</Badge>
        ),
    },
    {
      key: "free_access",
      label: "Free Access",
      render: (row: User) =>
        isAdminGlobal && row.role === "user_interne" ? (
          <Switch
            checked={row.free_access}
            onCheckedChange={(val) => {
              toggleFree({ id: row.id, free_access: val });
              toast.success("Free access updated");
            }}
          />
        ) : (
          <span className="text-muted-foreground text-xs">—</span>
        ),
    },
    {
      key: "is_active",
      label: "Active",
      render: (row: User) => (
        <Switch
          checked={row.is_active}
          onCheckedChange={(val) => {
            toggleActive({ id: row.id, is_active: val });
            toast.success("User status updated");
          }}
        />
      ),
    },
    {
      key: "created_at",
      label: "Joined",
      render: (row: User) => formatDate(row.created_at),
    },
    {
      key: "actions",
      label: "",
      render: (row: User) => (
        <div className="flex items-center gap-2 justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => setSelected(row)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          {isAdminGlobal && (
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-red-600 hover:text-red-700"
              onClick={() => {
                deleteUser(row.id);
                toast.success("User deleted");
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        searchKey="email"
        searchPlaceholder="Search by email..."
        isLoading={isLoading}
      />
      {selected && (
        <UserDetailDialog
          user={selected}
          open={!!selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}