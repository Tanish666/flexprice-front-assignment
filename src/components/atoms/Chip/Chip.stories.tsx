import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "@storybook/test";
import Chip from "./Chip";
import { CheckCircle2, Clock, XCircle, Info } from "lucide-react";

/**
 * Chip component (also known as Badge or StatusChip) used to display statuses, categories, or labels.
 * Supports various color variants and optional icons.
 */
const meta = {
  title: "Atoms/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "failed", "info"],
      description: "The visual style variant of the chip",
    },
    label: {
      control: "text",
      description: "The text label to display",
    },
    disabled: {
      control: "boolean",
      description: "Whether the chip is disabled",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default Chip",
    variant: "default",
  },
};

export const Success: Story = {
  args: {
    label: "Active",
    variant: "success",
    icon: <CheckCircle2 className="size-3" />,
  },
};

export const Warning: Story = {
  args: {
    label: "Draft",
    variant: "warning",
    icon: <Clock className="size-3" />,
  },
};

export const Failed: Story = {
  args: {
    label: "Void",
    variant: "failed",
    icon: <XCircle className="size-3" />,
  },
};

export const InfoVariant: Story = {
  args: {
    label: "Archived",
    variant: "info",
    icon: <Info className="size-3" />,
  },
};

export const PaidStatus: Story = {
  args: {
    label: "Paid",
    variant: "success",
    icon: <CheckCircle2 className="size-3" />,
  },
};

export const InteractionTest: Story = {
  args: {
    label: "Click Me",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByText("Click Me");
    await userEvent.click(chip);
    await expect(args.onClick).toHaveBeenCalled();
  },
};
