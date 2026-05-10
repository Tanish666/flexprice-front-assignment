import { describe, it, expect } from "vitest";
import { createQueryConfig, queryPresets } from "../queryConfig";

describe("createQueryConfig - Caching Behaviour", () => {
  it("should return DEFAULT cache settings by default (5min stale time)", () => {
    const config = createQueryConfig();
    expect(config.staleTime).toBe(queryPresets.DEFAULT.staleTime); // 5 minutes (300,000 ms)
    expect(config.gcTime).toBe(queryPresets.DEFAULT.gcTime); // 10 minutes (600,000 ms)
  });

  it("should return REALTIME cache settings (0min stale time)", () => {
    const config = createQueryConfig("REALTIME");
    expect(config.staleTime).toBe(0); // 0ms - Fetches immediately on mount/focus
    expect(config.gcTime).toBe(queryPresets.REALTIME.gcTime);
  });

  it("should return STATIC cache settings (30min stale time)", () => {
    const config = createQueryConfig("STATIC");
    expect(config.staleTime).toBe(30 * 60 * 1000); // 30 minutes
    expect(config.gcTime).toBe(queryPresets.STATIC.gcTime);
  });

  it("should allow declarative overrides for specific queries", () => {
    const config = createQueryConfig("DEFAULT", {
      enabled: false,
      staleTime: 1000,
    });
    expect(config.enabled).toBe(false);
    expect(config.staleTime).toBe(1000); // Overridden from 5 minutes to 1 second
  });
});
