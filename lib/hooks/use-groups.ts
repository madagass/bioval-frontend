"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import {
  getGroups, getGroup, createGroup, updateGroup,
  deleteGroup, addMemberToGroup, removeMemberFromGroup,
} from "@/lib/api/groups";

export function useGroups() {
  const { getToken, isLoaded } = useAuth();
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) return null;
      return getGroups(token);
    },
    enabled: isLoaded,
  });
}

export function useGroup(id: string) {
  const { getToken, isLoaded } = useAuth();
  return useQuery({
    queryKey: ["groups", id],
    queryFn: async () => {
      const token = await getToken();
      if (!token) return null;
      return getGroup(id, token);
    },
    enabled: isLoaded && !!id,
  });
}

export function useCreateGroup() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const token = await getToken();
      return createGroup(data, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groups"] }),
  });
}

export function useUpdateGroup() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const token = await getToken();
      return updateGroup(id, data, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groups"] }),
  });
}

export function useDeleteGroup() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      return deleteGroup(id, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groups"] }),
  });
}

export function useAddMember() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ groupId, userId }: { groupId: string; userId: string }) => {
      const token = await getToken();
      return addMemberToGroup(groupId, userId, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groups"] }),
  });
}

export function useRemoveMember() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ groupId, userId }: { groupId: string; userId: string }) => {
      const token = await getToken();
      return removeMemberFromGroup(groupId, userId, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groups"] }),
  });
}