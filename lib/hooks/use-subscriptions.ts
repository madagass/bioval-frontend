"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import {
  getSubscriptions, getSubscription, createCheckoutSession,
  cancelSubscription, getSubscriptionByGroup,
} from "@/lib/api/subscriptions";

export function useSubscriptions() {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const token = await getToken();
      return getSubscriptions(token);
    },
  });
}

export function useSubscription(id: string) {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["subscriptions", id],
    queryFn: async () => {
      const token = await getToken();
      return getSubscription(id, token);
    },
    enabled: !!id,
  });
}

export function useSubscriptionByGroup(groupId: string) {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ["subscriptions", "group", groupId],
    queryFn: async () => {
      const token = await getToken();
      return getSubscriptionByGroup(groupId, token);
    },
    enabled: !!groupId,
  });
}

export function useCreateCheckoutSession() {
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async (groupId: string) => {
      const token = await getToken();
      return createCheckoutSession(groupId, token);
    },
    onSuccess: ({ url }) => {
      window.location.href = url;
    },
  });
}

export function useCancelSubscription() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      return cancelSubscription(id, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subscriptions"] }),
  });
}