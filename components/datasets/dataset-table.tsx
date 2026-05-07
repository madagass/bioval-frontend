"use client";

import { useRole } from "@/lib/hooks/use-role";
import { useDeleteDataset, useValidateDataset, useRejectDataset } from "@/lib/hooks/use-datasets";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatFileSize, getStatusColor } from "@/lib/utils";
import { type Dataset } from "@/lib/types";
import { Trash2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface DatasetTableProps {
  data: Dataset[];
  isLoading: boolean;
}

export function DatasetTable({ data, isLoading }: DatasetTableProps) {
  const { isAdminMetier, isAdminGlobal } = useRole();
  const { mutate: deleteDataset } = useDeleteDataset();
  const { mutate: validateDataset } = useValidateDataset();
  const { mutate: rejectDataset } = useRejectDataset();

  const columns = [
    {
      key: "nom",
      label: "Name",
      render: (row: Dataset) => (
        <Link
          href={`/datasets/${row.id}`}
          className="text-primary hover:underline font-medium"
        >
          {row.nom}
        </Link>
      ),
    },
    { key: "famille", label: "Famille" },
    { key: "format", label: "Format" },
    {
      key: "taille",
      label: "Size",
      render: (row: Dataset) => formatFileSize(row.taille),
    },
    {
      key: "date_import",
      label: "Imported",
      render: (row: Dataset) => formatDate(row.date_import),
    },
    {
      key: "status",
      label: "Status",
      render: (row: Dataset) => (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (row: Dataset) => (
        <div className="flex items-center gap-2 justify-end">
          {isAdminMetier && row.status === "pending" && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-green-600 hover:text-green-700"
                onClick={() => {
                  validateDataset(row.id);
                  toast.success("Dataset validated");
                }}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-red-600 hover:text-red-700"
                onClick={() => {
                  rejectDataset(row.id);
                  toast.error("Dataset rejected");
                }}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </>
          )}
          {isAdminGlobal && (
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-red-600 hover:text-red-700"
              onClick={() => {
                deleteDataset(row.id);
                toast.success("Dataset deleted");
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
    <DataTable
      data={data}
      columns={columns}
      searchKey="nom"
      searchPlaceholder="Search datasets..."
      isLoading={isLoading}
    />
  );
}