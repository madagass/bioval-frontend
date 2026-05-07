"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import {
  getDatasets, getDataset, uploadDataset, updateDataset,
  deleteDataset, validateDataset, rejectDataset, getFamilles,
} from "@/lib/api/datasets";

export function useDatasets() {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["datasets"],
    queryFn: async () => {
      const token = await getToken();
      return getDatasets(token);
    },
  });
}

export function useDataset(id: string) {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["datasets", id],
    queryFn: async () => {
      const token = await getToken();
      return getDataset(id, token);
    },
    enabled: !!id,
  });
}

export function useFamilles() {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["familles"],
    queryFn: async () => {
      const token = await getToken();
      return getFamilles(token);
    },
  });
}

export function useUploadDataset() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const token = await getToken();
      return uploadDataset(formData, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["datasets"] }),
  });
}

export function useUpdateDataset() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const token = await getToken();
      return updateDataset(id, data, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["datasets"] }),
  });
}

export function useDeleteDataset() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      return deleteDataset(id, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["datasets"] }),
  });
}

export function useValidateDataset() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      return validateDataset(id, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["datasets"] }),
  });
}

export function useRejectDataset() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      return rejectDataset(id, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["datasets"] }),
  });
}