import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "@storybook/test";
import Combobox from "./Combobox";

/**
 * A combobox component with search functionality.
 * Ideal for long lists where users need to filter options.
 */
const meta = {
  title: "Atoms/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onChange: fn(),
    options: [
      { value: "nextjs", label: "Next.js" },
      { value: "sveltekit", label: "SvelteKit" },
      { value: "remix", label: "Remix" },
      { value: "astro", label: "Astro" },
      { value: "gatsby", label: "Gatsby" },
    ],
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Select framework",
  },
};

export const WithSearch: Story = {
  args: {
    placeholder: "Search frameworks...",
    searchPlaceholder: "Type a framework name...",
  },
};

export const InteractionTest: Story = {
  args: {
    placeholder: "Search and select",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");
    await userEvent.click(trigger);

    // In Storybook, we need to find the search input which might be in a popover
    // Search for the input in the body since it's portaled
    const body = within(document.body);
    const input = body.getByPlaceholderText("Search...");
    await userEvent.type(input, "Next");

    const option = body.getByText("Next.js");
    await userEvent.click(option);

    await expect(args.onChange).toHaveBeenCalledWith("nextjs");
  },
};
