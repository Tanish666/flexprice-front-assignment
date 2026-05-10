import { describe, it, expect } from "vitest";
import { formatCompactNumber } from "../format_number";
import { getBillingModelLabel } from "../price_helpers";
import { calculateCouponDiscount } from "../helper_functions";
import { BILLING_MODEL } from "@/models/Price";

describe("Utility Functions", () => {
  describe("formatCompactNumber", () => {
    it("formats thousands correctly", () => {
      expect(formatCompactNumber(1500)).toBe("1.5k");
      expect(formatCompactNumber(10000)).toBe("10k");
    });

    it("formats millions correctly", () => {
      expect(formatCompactNumber(1200000)).toBe("1.2M");
    });

    it("formats billions correctly", () => {
      expect(formatCompactNumber(2000000000)).toBe("2B");
    });

    it("does not compact numbers under 1000", () => {
      expect(formatCompactNumber(999)).toBe("999");
    });
  });

  describe("getBillingModelLabel", () => {
    it("maps enum values to human readable labels", () => {
      expect(getBillingModelLabel(BILLING_MODEL.FLAT_FEE as any)).toBe(
        "Flat Fee",
      );
      expect(getBillingModelLabel(BILLING_MODEL.PACKAGE as any)).toBe(
        "Package",
      );
      expect(getBillingModelLabel(BILLING_MODEL.TIERED as any)).toBe(
        "Volume Tiered",
      );
      expect(getBillingModelLabel("SLAB_TIERED")).toBe("Slab Tiered");
      expect(getBillingModelLabel("UNKNOWN_MODEL" as any)).toBe(
        "UNKNOWN_MODEL",
      );
    });
  });

  describe("calculateCouponDiscount", () => {
    it("calculates fixed discounts", () => {
      const coupon = { type: "fixed", amount_off: "50" };
      expect(calculateCouponDiscount(coupon, 200)).toBe(50);
    });

    it("caps fixed discount at the original amount", () => {
      const coupon = { type: "fixed", amount_off: "100" };
      expect(calculateCouponDiscount(coupon, 50)).toBe(50);
    });

    it("calculates percentage discounts", () => {
      const coupon = { type: "percentage", percentage_off: "20" };
      expect(calculateCouponDiscount(coupon, 200)).toBe(40);
    });

    it("returns 0 for invalid or empty coupons", () => {
      const coupon = { type: "fixed" };
      expect(calculateCouponDiscount(coupon, 200)).toBe(0);
    });
  });
});
