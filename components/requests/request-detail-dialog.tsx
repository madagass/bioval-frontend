"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateTime, getStatusColor } from "@/lib/utils";
import { type AccessRequest } from "@/lib/types";

interface RequestDetailDialogProps {
  request: AccessRequest;
  open: boolean;
  onClose: () => void;
}

export function RequestDetailDialog({
  request,
  open,
  onClose,
}: RequestDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{request.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Company</p>
              <p className="font-medium">{request.company_name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Submitted</p>
              <p className="font-medium">{formatDateTime(request.created_at)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
            </div>
            {request.reviewed_by && (
              <div>
                <p className="text-muted-foreground">Reviewed by</p>
                <p className="font-medium">{request.reviewed_by}</p>
              </div>
            )}
            {request.reviewed_at && (
              <div>
                <p className="text-muted-foreground">Reviewed at</p>
                <p className="font-medium">{formatDateTime(request.reviewed_at)}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}