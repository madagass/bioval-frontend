"use client";

import { useDatasets } from "@/lib/hooks/use-datasets";
import { useRole } from "@/lib/hooks/use-role";
import { PageHeader } from "@/components/shared/page-header";
import { DatasetTable } from "@/components/datasets/dataset-table";
import { DatasetUploadDialog } from "@/components/datasets/dataset-upload-dialog";

export default function DatasetsPage() {
  const { data, isLoading } = useDatasets();
  const { isAdminMetier, isUserInterne, isUserExterne } = useRole();

  const canUpload = isAdminMetier || isUserInterne || isUserExterne;

  return (
    <div>
      <PageHeader
        title="Datasets"
        description="Browse and manage biomass datasets"
        action={canUpload ? <DatasetUploadDialog /> : undefined}
      />
      <DatasetTable
        data={data?.results ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}