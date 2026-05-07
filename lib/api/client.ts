const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

function getHeaders(token?: string | null): HeadersInit {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function apiGet<T>(endpoint: string, token?: string | null): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    headers: getHeaders(token),
    cache: "no-store",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail ?? "Request failed");
  }
  return res.json();
}

export async function apiPost<T>(endpoint: string, body: unknown, token?: string | null): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail ?? "Request failed");
  }
  return res.json();
}

export async function apiPatch<T>(endpoint: string, body: unknown, token?: string | null): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "PATCH",
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail ?? "Request failed");
  }
  return res.json();
}

export async function apiDelete<T>(endpoint: string, token?: string | null): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    headers: getHeaders(token),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail ?? "Request failed");
  }
  return res.json();
}

export async function apiUpload<T>(endpoint: string, formData: FormData, token?: string | null): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail ?? "Request failed");
  }
  return res.json();
}