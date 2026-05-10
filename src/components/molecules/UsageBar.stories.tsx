import type { Meta, StoryObj } from "@storybook/react";
import UsageBar from "./UsageBar";

/**
 * A molecule to display resource usage against a limit or entitlement.
 * Colors change based on usage thresholds.
 */
const meta = {
  title: "Molecules/UsageBar",
  component: UsageBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    used: { control: "number" },
    total: { control: "number" },
  },
} satisfies Meta<typeof UsageBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "API Requests",
    used: 4500,
    total: 10000,
    unit: "requests",
  },
};

export const Warning: Story = {
  args: {
    label: "Storage",
    used: 75,
    total: 100,
    unit: "GB",
  },
};

export const Danger: Story = {
  args: {
    label: "Monthly Emails",
    used: 950,
    total: 1000,
    unit: "emails",
  },
};

export const Full: Story = {
  args: {
    label: "Seats",
    used: 10,
    total: 10,
    unit: "seats",
  },
};
