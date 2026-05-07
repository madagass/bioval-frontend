import { apiGet, apiPatch, apiDelete, apiUpload } from "@/lib/api/client";
import { type Dataset, type Famille, type PaginatedResponse } from "@/lib/types";

export async function getDatasets(token?: string | null): Promise<PaginatedResponse<Dataset>> {
  return apiGet("/api/datasets/", token);
}

export async function getDataset(id: string, token?: string | null): Promise<Dataset> {
  return apiGet(`/api/datasets/${id}/`, token);
}

export async function uploadDataset(formData: FormData, token?: string | null): Promise<Dataset> {
  return apiUpload("/api/datasets/", formData, token);
}

export async function updateDataset(id: string, data: Partial<Dataset>, token?: string | null): Promise<Dataset> {
  return apiPatch(`/api/datasets/${id}/`, data, token);
}

export async function deleteDataset(id: string, token?: string | null): Promise<void> {
  return apiDelete(`/api/datasets/${id}/`, token);
}

export async function validateDataset(id: string, token?: string | null): Promise<Dataset> {
  return apiPatch(`/api/datasets/${id}/`, { status: "validated" }, token);
}

export async function rejectDataset(id: string, token?: string | null): Promise<Dataset> {
  return apiPatch(`/api/datasets/${id}/`, { status: "rejected" }, token);
}

export async function getFamilles(token?: string | null): Promise<PaginatedResponse<Famille>> {
  return apiGet("/api/familles/", token);
}

export async function getFamille(id: string, token?: string | null): Promise<Famille> {
  return apiGet(`/api/familles/${id}/`, token);
}