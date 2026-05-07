"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatDate, getRoleLabel } from "@/lib/utils";
import { type User } from "@/lib/types";

interface UserDetailDialogProps {
  user: User;
  open: boolean;
  onClose: () => void;
}

export function UserDetailDialog({ user, open, onClose }: UserDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-muted-foreground">Full Name</p>
              <p className="font-medium">{user.prenom} {user.nom}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Role</p>
              <Badge variant="secondary">{getRoleLabel(user.role)}</Badge>
            </div>
            <div>
              <p className="text-muted-foreground">Organisation</p>
              <p className="font-medium">{user.organisation ?? "—"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <Badge variant={user.is_active ? "default" : "destructive"}>
                {user.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground">Free Access</p>
              <Badge variant={user.free_access ? "default" : "secondary"}>
                {user.free_access ? "Yes" : "No"}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground">Joined</p>
              <p className="font-medium">{formatDate(user.created_at)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}