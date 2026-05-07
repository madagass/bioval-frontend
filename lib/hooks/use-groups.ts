"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import {
  getGroups, getGroup, createGroup, updateGroup,
  deleteGroup, addMemberToGroup, removeMemberFromGroup,
} from "@/lib/api/groups";

export function useGroups() {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const token = await getToken();
      return getGroups(token);
    },
  });
}

export function useGroup(id: string) {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["groups", id],
    queryFn: async () => {
      const token = await getToken();
      return getGroup(id, token);
    },
    enabled: !!id,
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