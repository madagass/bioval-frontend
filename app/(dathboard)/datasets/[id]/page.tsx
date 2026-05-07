"use client";

import { useDataset } from "@/lib/hooks/use-datasets";
import { useRole } from "@/lib/hooks/use-role";
import { PageHeader } from "@/components/shared/page-header";
import { DatasetCard } from "@/components/datasets/dataset-card";
import { useParams } from "next/navigation";

export default function DatasetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useDataset(id);
  const { isAdminMetier } = useRole();

  if (isLoading) {
    return <div className="text-muted-foreground text-sm">Loading...</div>;
  }

  if (!data) {
    return <div className="text-muted-foreground text-sm">Dataset not found.</div>;
  }

  return (
    <div>
      <PageHeader
        title={data.nom}
        description={`Imported on ${data.date_import}`}
      />
      <DatasetCard dataset={data} isAdminMetier={isAdminMetier} />
    </div>
  );
}