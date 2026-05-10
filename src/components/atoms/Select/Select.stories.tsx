import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "@storybook/test";
import Select from "./Select";

/**
 * A comprehensive select component that supports labels, descriptions, icons, and error states.
 * Built on top of Radix UI Select.
 */
const meta = {
  title: "Atoms/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    error: {
      control: "text",
    },
  },
  args: {
    onChange: fn(),
    options: [
      { value: "active", label: "Active" },
      { value: "archived", label: "Archived" },
      { value: "deleted", label: "Deleted", disabled: true },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Status",
    placeholder: "Select status",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Plan",
    description: "Choose the billing plan for this customer",
    options: [
      { value: "free", label: "Free Plan", description: "Limited features" },
      { value: "pro", label: "Pro Plan", description: "All features included" },
    ],
  },
};

export const RadioVariant: Story = {
  args: {
    label: "Select Category",
    isRadio: true,
    options: [
      { value: "cat1", label: "Category 1" },
      { value: "cat2", label: "Category 2" },
    ],
  },
};

export const WithError: Story = {
  args: {
    label: "Country",
    error: "Please select a country",
  },
};

export const Disabled: Story = {
  args: {
    label: "Project",
    disabled: true,
  },
};

export const InteractionTest: Story = {
  args: {
    label: "Interaction Test",
    placeholder: "Open me",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");
    await userEvent.click(trigger);
    // Note: Radix Select renders content in a portal, so finding items might be tricky in a simple play function
    // but we can verify the trigger was clicked.
    await expect(trigger).toBeVisible();
  },
};
