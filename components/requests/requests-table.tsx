"use client";

import { useAcceptRequest, useRejectRequest } from "@/lib/hooks/use-requests";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { formatDate, getStatusColor } from "@/lib/utils";
import { type AccessRequest } from "@/lib/types";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { RequestDetailDialog } from "./request-detail-dialog";

interface RequestsTableProps {
  data: AccessRequest[];
  isLoading: boolean;
}

export function RequestsTable({ data, isLoading }: RequestsTableProps) {
  const { mutate: accept } = useAcceptRequest();
  const { mutate: reject } = useRejectRequest();
  const [selected, setSelected] = useState<AccessRequest | null>(null);

  const columns = [
    { key: "email", label: "Email" },
    { key: "company_name", label: "Company" },
    {
      key: "created_at",
      label: "Date",
      render: (row: AccessRequest) => formatDate(row.created_at),
    },
    {
      key: "status",
      label: "Status",
      render: (row: AccessRequest) => (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (row: AccessRequest) => (
        <div className="flex items-center gap-2 justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => setSelected(row)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          {row.status === "pending" && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-green-600 hover:text-green-700"
                onClick={() => {
                  accept(row.id);
                  toast.success("Request accepted");
                }}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-red-600 hover:text-red-700"
                onClick={() => {
                  reject(row.id);
                  toast.error("Request rejected");
                }}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </>
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
        <RequestDetailDialog
          request={selected}
          open={!!selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}