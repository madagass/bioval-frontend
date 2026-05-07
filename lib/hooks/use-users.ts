"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import {
  getUsers, getUser, createUser, updateUser, deleteUser,
  toggleFreeAccess, toggleUserActive, updateUserRole,
} from "@/lib/api/users";

export function useUsers() {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const token = await getToken();
      return getUsers(token);
    },
  });
}

export function useUser(id: string) {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const token = await getToken();
      return getUser(id, token);
    },
    enabled: !!id,
  });
}

export function useCreateUser() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const token = await getToken();
      return createUser(data, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useUpdateUser() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const token = await getToken();
      return updateUser(id, data, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useDeleteUser() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      return deleteUser(id, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useToggleFreeAccess() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, free_access }: { id: string; free_access: boolean }) => {
      const token = await getToken();
      return toggleFreeAccess(id, free_access, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useToggleUserActive() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const token = await getToken();
      return toggleUserActive(id, is_active, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useUpdateUserRole() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      const token = await getToken();
      return updateUserRole(id, role, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}