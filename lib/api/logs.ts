import { apiGet } from "@/lib/api/client";
import { type Log, type PaginatedResponse } from "@/lib/types";

export async function getLogs(token?: string | null): Promise<PaginatedResponse<Log>> {
  return apiGet("/api/logs/", token);
}

export async function getLog(id: string, token?: string | null): Promise<Log> {
  return apiGet(`/api/logs/${id}/`, token);
}