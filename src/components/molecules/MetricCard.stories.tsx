import type { Meta, StoryObj } from "@storybook/react";
import MetricCard from "./MetricCard";

/**
 * MetricCard component used to display key performance indicators (KPIs) with optional trend indicators.
 */
const meta = {
  title: "Molecules/MetricCard",
  component: MetricCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "number",
    },
    isPercent: {
      control: "boolean",
    },
    showChangeIndicator: {
      control: "boolean",
    },
    isNegative: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Total Revenue",
    value: 12500,
    currency: "USD",
  },
};

export const WithPositiveTrend: Story = {
  args: {
    title: "Active Subscriptions",
    value: 1540,
    showChangeIndicator: true,
    isNegative: false,
  },
};

export const WithNegativeTrend: Story = {
  args: {
    title: "Churn Rate",
    value: 2.4,
    isPercent: true,
    showChangeIndicator: true,
    isNegative: true,
  },
};

export const Percentage: Story = {
  args: {
    title: "Usage Growth",
    value: 15.5,
    isPercent: true,
  },
};
