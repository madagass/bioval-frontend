"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import {
  getRequests, getRequest, createRequest, acceptRequest, rejectRequest,
} from "@/lib/api/requests";

export function useRequests() {
  const { getToken, isLoaded } = useAuth();
  return useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) return null;
      return getRequests(token);
    },
    enabled: isLoaded,
  });
}

export function useRequest(id: string) {
  const { getToken, isLoaded } = useAuth();
  return useQuery({
    queryKey: ["requests", id],
    queryFn: async () => {
      const token = await getToken();
      if (!token) return null;
      return getRequest(id, token);
    },
    enabled: isLoaded && !!id,
  });
}

export function useCreateRequest() {
  return useMutation({
    mutationFn: createRequest,
  });
}

export function useAcceptRequest() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      return acceptRequest(id, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["requests"] }),
  });
}

export function useRejectRequest() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      return rejectRequest(id, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["requests"] }),
  });
}