"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatFileSize, getStatusColor } from "@/lib/utils";
import { type Dataset } from "@/lib/types";
import { useValidateDataset, useRejectDataset } from "@/lib/hooks/use-datasets";
import { toast } from "sonner";

interface DatasetCardProps {
  dataset: Dataset;
  isAdminMetier: boolean;
}

export function DatasetCard({ dataset, isAdminMetier }: DatasetCardProps) {
  const { mutate: validate, isPending: validating } = useValidateDataset();
  const { mutate: reject, isPending: rejecting } = useRejectDataset();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{dataset.nom}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(dataset.status)}`}>
            {dataset.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Famille</p>
            <p className="font-medium">{dataset.famille}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Format</p>
            <Badge variant="secondary">{dataset.format.toUpperCase()}</Badge>
          </div>
          <div>
            <p className="text-muted-foreground">Size</p>
            <p className="font-medium">{formatFileSize(dataset.taille)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Imported</p>
            <p className="font-medium">{formatDate(dataset.date_import)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Imported by</p>
            <p className="font-medium">{dataset.importe_par}</p>
          </div>
        </div>

        {isAdminMetier && dataset.status === "pending" && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={() => {
                validate(dataset.id);
                toast.success("Dataset validated");
              }}
              disabled={validating}
            >
              Validate
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="flex-1"
              onClick={() => {
                reject(dataset.id);
                toast.error("Dataset rejected");
              }}
              disabled={rejecting}
            >
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}