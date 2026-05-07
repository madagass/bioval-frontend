"use client";

import { useState } from "react";
import { useCreateRequest } from "@/lib/hooks/use-requests";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function RequestForm() {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const { mutate: createRequest, isPending } = useCreateRequest();

  function handleSubmit() {
    if (!email || !companyName) {
      toast.error("Please fill in all fields");
      return;
    }
    createRequest(
      { email, company_name: companyName },
      {
        onSuccess: () => {
          toast.success("Request submitted successfully");
          setEmail("");
          setCompanyName("");
        },
        onError: (err) => toast.error(err.message),
      }
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Request Platform Access</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Company Name</Label>
          <Input
            placeholder="Acme Corp"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit Request"}
        </Button>
      </CardContent>
    </Card>
  );
}