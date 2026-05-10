import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FilterValue = string | number | boolean | string[] | null;

interface FilterState {
  filters: Record<string, FilterValue>;
  setFilter: (key: string, value: FilterValue) => void;
  resetFilters: () => void;
  getFilters: () => Record<string, FilterValue>;
}

// Generate a simple hash for URL sync without bloat
const generateFingerprint = (obj: Record<string, FilterValue>) => {
  const str = JSON.stringify(obj);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

/**
 * createFilterStore acts as a factory to create persisted filter stores per route.
 * @param storeKey usually corresponds to the route or page name (e.g., 'invoices', 'customers')
 */
export const createFilterStore = (storeKey: string) => {
  return create<FilterState>()(
    persist(
      (set, get) => ({
        filters: {},
        setFilter: (key, value) => {
          set((state) => {
            const newFilters = { ...state.filters, [key]: value };

            // Sync shallow fingerprint to URL to keep it clean but bookmarkable
            if (typeof window !== "undefined") {
              const url = new URL(window.location.href);
              const fingerprint = generateFingerprint(newFilters);
              if (Object.keys(newFilters).length > 0) {
                url.searchParams.set("f", fingerprint);
              } else {
                url.searchParams.delete("f");
              }
              window.history.replaceState({}, "", url.toString());
            }

            return { filters: newFilters };
          });
        },
        resetFilters: () => {
          set({ filters: {} });
          if (typeof window !== "undefined") {
            const url = new URL(window.location.href);
            url.searchParams.delete("f");
            window.history.replaceState({}, "", url.toString());
          }
        },
        getFilters: () => get().filters,
      }),
      {
        name: `filters:${storeKey}`,
        storage: createJSONStorage(() => sessionStorage), // persist using sessionStorage
      },
    ),
  );
};
