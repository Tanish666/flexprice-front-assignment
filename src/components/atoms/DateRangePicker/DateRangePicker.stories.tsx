import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "@storybook/test";
import DateRangePicker from "./DateRangePicker";

/**
 * A date range picker component that allows users to select a start and end date.
 * Supports timezone selection and custom placeholders.
 */
const meta = {
  title: "Atoms/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Select a range",
    title: "Date Range",
  },
};

export const WithSelectedRange: Story = {
  args: {
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-05-15"),
    title: "Billing Period",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    title: "Analytics Range (Disabled)",
  },
};

export const InteractionTest: Story = {
  args: {
    placeholder: "Click to pick dates",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);

    // The calendar is portaled, so we check for its presence in the body
    const body = within(document.body);
    // Check for one of the months shown (e.g. current month name)
    const calendar = body.getByRole("dialog");
    await expect(calendar).toBeVisible();
  },
};
