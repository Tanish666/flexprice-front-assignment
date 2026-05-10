import type { Meta, StoryObj } from "@storybook/react";
import PricingTierTable from "./PricingTierTable";

/**
 * An organism that presents a detailed breakdown of tiered or graduated pricing.
 */
const meta: Meta<typeof PricingTierTable> = {
  title: "Organisms/PricingTierTable",
  component: PricingTierTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PricingTierTable>;

const mockTiers = [
  { range: "0 - 1,000", quantity: "1,000", rate: "0.10", cost: "100.00" },
  { range: "1,001 - 5,000", quantity: "4,000", rate: "0.08", cost: "320.00" },
  { range: "5,001+", quantity: "500", rate: "0.05", cost: "25.00" },
];

export const SlabMode: Story = {
  args: {
    tiers: mockTiers,
    totalCost: "445.00",
    effectiveRate: "0.08",
    tierMode: "SLAB" as any,
    currency: "USD",
    usageQuantity: "5,500",
    title: "Monthly API Usage (Graduated)",
  },
};

export const VolumeMode: Story = {
  args: {
    tiers: mockTiers,
    totalCost: "275.00",
    effectiveRate: "0.05",
    tierMode: "VOLUME" as any,
    currency: "USD",
    usageQuantity: "5,500",
    title: "Storage Usage (Volume)",
  },
};
