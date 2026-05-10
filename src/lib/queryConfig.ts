import { QueryClient, UseQueryOptions } from "@tanstack/react-query";

export const queryPresets = {
  REALTIME: { staleTime: 0, gcTime: 5 * 60 * 1000 },
  DEFAULT: { staleTime: 5 * 60 * 1000, gcTime: 10 * 60 * 1000 },
  STATIC: { staleTime: 30 * 60 * 1000, gcTime: 60 * 60 * 1000 },
} as const;

export type QueryPreset = keyof typeof queryPresets;

/**
 * createQueryConfig builds an optimized configuration object for TanStack Query (v5).
 * By default it uses the DEFAULT preset (5min stale time) preventing over-fetching.
 *
 * @param preset The preset level (REALTIME, DEFAULT, STATIC)
 * @param overrides Declarative overrides for specific edge cases (e.g. { enabled: false })
 */
export const createQueryConfig = <
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
>(
  preset: QueryPreset = "DEFAULT",
  overrides?: Partial<UseQueryOptions<TQueryFnData, TError, TData>>,
): Partial<UseQueryOptions<TQueryFnData, TError, TData>> => {
  return {
    ...queryPresets[preset],
    ...overrides,
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...queryPresets.DEFAULT,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
