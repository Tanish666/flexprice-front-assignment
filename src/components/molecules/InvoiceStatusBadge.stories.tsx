import type { Meta, StoryObj } from "@storybook/react";
import InvoiceStatusBadge from "./InvoiceStatusBadge";

/**
 * A molecule that displays the status of an invoice with appropriate colors and icons.
 */
const meta = {
  title: "Molecules/InvoiceStatusBadge",
  component: InvoiceStatusBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: [
        "paid",
        "draft",
        "void",
        "finalized",
        "skipped",
        "overdue",
        "failed",
      ],
    },
  },
} satisfies Meta<typeof InvoiceStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paid: Story = {
  args: {
    status: "paid",
  },
};

export const Draft: Story = {
  args: {
    status: "draft",
  },
};

export const Void: Story = {
  args: {
    status: "void",
  },
};

export const Overdue: Story = {
  args: {
    status: "overdue",
  },
};

export const Skipped: Story = {
  args: {
    status: "skipped",
  },
};
