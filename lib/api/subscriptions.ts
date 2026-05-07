import { apiGet, apiPatch, apiPost } from "@/lib/api/client";
import { type Subscription, type PaginatedResponse } from "@/lib/types";

export async function getSubscriptions(token?: string | null): Promise<PaginatedResponse<Subscription>> {
  return apiGet("/api/subscriptions/", token);
}

export async function getSubscription(id: string, token?: string | null): Promise<Subscription> {
  return apiGet(`/api/subscriptions/${id}/`, token);
}

export async function createCheckoutSession(groupId: string, token?: string | null): Promise<{ url: string }> {
  return apiPost("/api/subscriptions/checkout/", { group_id: groupId }, token);
}

export async function cancelSubscription(id: string, token?: string | null): Promise<Subscription> {
  return apiPatch(`/api/subscriptions/${id}/`, { statut: "inactive" }, token);
}

export async function getSubscriptionByGroup(groupId: string, token?: string | null): Promise<Subscription> {
  return apiGet(`/api/subscriptions/?group_id=${groupId}`, token);
}