"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCancelSubscription } from "@/lib/hooks/use-subscriptions";
import { useRole } from "@/lib/hooks/use-role";
import { formatDate, getStatusColor } from "@/lib/utils";
import { type Subscription } from "@/lib/types";
import { toast } from "sonner";

interface SubscriptionCardProps {
  subscription: Subscription;
  groupName: string;
}

export function SubscriptionCard({ subscription, groupName }: SubscriptionCardProps) {
  const { isAdminGlobal, isAdminExterne } = useRole();
  const { mutate: cancel, isPending } = useCancelSubscription();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{groupName}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(subscription.statut)}`}>
            {subscription.statut}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-muted-foreground">Start</p>
            <p className="font-medium">{formatDate(subscription.date_debut)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">End</p>
            <p className="font-medium">{formatDate(subscription.date_fin)}</p>
          </div>
        </div>
        {(isAdminGlobal || isAdminExterne) && subscription.statut === "active" && (
          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            disabled={isPending}
            onClick={() => {
              cancel(subscription.id);
              toast.success("Subscription cancelled");
            }}
          >
            {isPending ? "Cancelling..." : "Cancel Subscription"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}