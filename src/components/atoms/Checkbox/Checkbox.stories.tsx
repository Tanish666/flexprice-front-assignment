import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "@storybook/test";
import Checkbox from "./Checkbox";

/**
 * A checkbox component with support for labels and descriptions.
 * Built on top of Radix UI Checkbox.
 */
const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
    id: "terms",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Marketing emails",
    description: "Receive emails about new features and updates.",
    id: "marketing",
  },
};

export const Checked: Story = {
  args: {
    label: "Already checked",
    checked: true,
    id: "checked",
  },
};

export const InteractionTest: Story = {
  args: {
    label: "Click me",
    id: "test",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await userEvent.click(checkbox);
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true);
  },
};
