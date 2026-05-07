import { apiGet, apiPatch, apiPost } from "@/lib/api/client";
import { type AccessRequest, type PaginatedResponse } from "@/lib/types";

export async function getRequests(token?: string | null): Promise<PaginatedResponse<AccessRequest>> {
  return apiGet("/api/requests/", token);
}

export async function getRequest(id: string, token?: string | null): Promise<AccessRequest> {
  return apiGet(`/api/requests/${id}/`, token);
}

export async function createRequest(data: Pick<AccessRequest, "email" | "company_name">): Promise<AccessRequest> {
  return apiPost("/api/requests/", data);
}

export async function acceptRequest(id: string, token?: string | null): Promise<AccessRequest> {
  return apiPatch(`/api/requests/${id}/`, { status: "accepted" }, token);
}

export async function rejectRequest(id: string, token?: string | null): Promise<AccessRequest> {
  return apiPatch(`/api/requests/${id}/`, { status: "rejected" }, token);
}