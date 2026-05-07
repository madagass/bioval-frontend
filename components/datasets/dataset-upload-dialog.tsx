"use client";

import { useState } from "react";
import { useUploadDataset, useFamilles } from "@/lib/hooks/use-datasets";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export function DatasetUploadDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [familleId, setFamilleId] = useState("");
  const { data: familles } = useFamilles();
  const { mutate: upload, isPending } = useUploadDataset();

  function handleSubmit() {
    if (!file || !familleId) {
      toast.error("Please select a file and a famille");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("famille_id", familleId);
    formData.append("nom", file.name);
    formData.append("taille", String(file.size));
    formData.append("format", file.name.split(".").pop() ?? "");

    upload(formData, {
      onSuccess: () => {
        toast.success("Dataset uploaded successfully");
        setOpen(false);
        setFile(null);
        setFamilleId("");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Upload Dataset
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Dataset</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label>File</Label>
            <Input
              type="file"
              accept=".csv,.xlsx,.json"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div className="space-y-1">
            <Label>Famille</Label>
            <Select value={familleId} onValueChange={setFamilleId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a famille" />
              </SelectTrigger>
              <SelectContent>
                {familles?.results.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}