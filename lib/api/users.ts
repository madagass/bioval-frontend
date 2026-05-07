import { apiGet, apiPatch, apiDelete, apiPost } from "@/lib/api/client";
import { type User, type PaginatedResponse } from "@/lib/types";

export async function getUsers(token?: string | null): Promise<PaginatedResponse<User>> {
  return apiGet("/api/users/", token);
}

export async function getUser(id: string, token?: string | null): Promise<User> {
  return apiGet(`/api/users/${id}/`, token);
}

export async function createUser(data: Partial<User>, token?: string | null): Promise<User> {
  return apiPost("/api/users/", data, token);
}

export async function updateUser(id: string, data: Partial<User>, token?: string | null): Promise<User> {
  return apiPatch(`/api/users/${id}/`, data, token);
}

export async function deleteUser(id: string, token?: string | null): Promise<void> {
  return apiDelete(`/api/users/${id}/`, token);
}

export async function toggleFreeAccess(id: string, free_access: boolean, token?: string | null): Promise<User> {
  return apiPatch(`/api/users/${id}/`, { free_access }, token);
}

export async function toggleUserActive(id: string, is_active: boolean, token?: string | null): Promise<User> {
  return apiPatch(`/api/users/${id}/`, { is_active }, token);
}

export async function updateUserRole(id: string, role: string, token?: string | null): Promise<User> {
  return apiPatch(`/api/users/${id}/`, { role }, token);
}