import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "@storybook/test";
import SearchBar from "./SearchBar";

/**
 * A search bar molecule that debounces user input and provides a clear button.
 */
const meta = {
  title: "Molecules/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onSearch: fn(),
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Search customers...",
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "Flexprice",
  },
};

export const InteractionTest: Story = {
  args: {
    placeholder: "Type to search",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Type to search");

    await userEvent.type(input, "test");
    await expect(input).toHaveValue("test");

    // Wait for debounce
    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(args.onSearch).toHaveBeenCalledWith("test");

    const clearButton = canvas.getByLabelText("Clear search");
    await userEvent.click(clearButton);
    await expect(input).toHaveValue("");
    await expect(args.onSearch).toHaveBeenCalledWith("");
  },
};
