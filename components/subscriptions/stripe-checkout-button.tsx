"use client";

import { Button } from "@/components/ui/button";
import { useCreateCheckoutSession } from "@/lib/hooks/use-subscriptions";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

interface StripeCheckoutButtonProps {
  groupId: string;
}

export function StripeCheckoutButton({ groupId }: StripeCheckoutButtonProps) {
  const { mutate: checkout, isPending } = useCreateCheckoutSession();

  return (
    <Button
      onClick={() => {
        checkout(groupId, {
          onError: (err) => toast.error(err.message),
        });
      }}
      disabled={isPending}
    >
      <CreditCard className="h-4 w-4 mr-2" />
      {isPending ? "Redirecting..." : "Subscribe with Stripe"}
    </Button>
  );
}