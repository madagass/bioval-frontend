"use client";

import { useState } from "react";
import { useCreateGroup } from "@/lib/hooks/use-groups";
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
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function GroupDialog() {
  const [open, setOpen] = useState(false);
  const [nom, setNom] = useState("");
  const { mutate: createGroup, isPending } = useCreateGroup();

  function handleSubmit() {
    if (!nom) {
      toast.error("Please enter a group name");
      return;
    }
    createGroup(
      { nom },
      {
        onSuccess: () => {
          toast.success("Group created");
          setOpen(false);
          setNom("");
        },
        onError: (err) => toast.error(err.message),
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label>Group Name</Label>
            <Input
              placeholder="e.g. Acme Team"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Group"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}