
// React Query adapter - abstracts query library specifics
import { useQuery as useReactQuery, useMutation as useReactMutation, QueryClient } from "@tanstack/react-query";
import type { UseQueryOptions, UseMutationOptions, QueryKey } from "@tanstack/react-query";

// Standardized query interface
export interface AppQueryOptions<TData = unknown, TError = Error> {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  retry?: number;
}

export interface AppMutationOptions<TData = unknown, TError = Error, TVariables = void> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void;
}

// Wrapped hooks with consistent interface
export function useQuery<TData = unknown, TError = Error>(
  options: AppQueryOptions<TData, TError>
) {
  return useReactQuery({
    queryKey: options.queryKey,
    queryFn: options.queryFn,
    enabled: options.enabled,
    staleTime: options.staleTime,
    gcTime: options.cacheTime, // Updated for v5 compatibility
    refetchOnWindowFocus: options.refetchOnWindowFocus,
    retry: options.retry,
  } as UseQueryOptions<TData, TError>);
}

export function useMutation<TData = unknown, TError = Error, TVariables = void>(
  options: AppMutationOptions<TData, TError, TVariables>
) {
  return useReactMutation({
    mutationFn: options.mutationFn,
    onSuccess: options.onSuccess,
    onError: options.onError,
    onSettled: options.onSettled,
  } as UseMutationOptions<TData, TError, TVariables>);
}

export { QueryClient };
