import { apiGet, apiPatch, apiDelete, apiPost } from "@/lib/api/client";
import { type Group, type PaginatedResponse } from "@/lib/types";

export async function getGroups(token?: string | null): Promise<PaginatedResponse<Group>> {
  return apiGet("/api/groups/", token);
}

export async function getGroup(id: string, token?: string | null): Promise<Group> {
  return apiGet(`/api/groups/${id}/`, token);
}

export async function createGroup(data: Partial<Group>, token?: string | null): Promise<Group> {
  return apiPost("/api/groups/", data, token);
}

export async function updateGroup(id: string, data: Partial<Group>, token?: string | null): Promise<Group> {
  return apiPatch(`/api/groups/${id}/`, data, token);
}

export async function deleteGroup(id: string, token?: string | null): Promise<void> {
  return apiDelete(`/api/groups/${id}/`, token);
}

export async function addMemberToGroup(groupId: string, userId: string, token?: string | null): Promise<Group> {
  return apiPost(`/api/groups/${groupId}/members/`, { user_id: userId }, token);
}

export async function removeMemberFromGroup(groupId: string, userId: string, token?: string | null): Promise<void> {
  return apiDelete(`/api/groups/${groupId}/members/${userId}/`, token);
}