import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "@storybook/test";
import Input from "./Input";

/**
 * A flexible input component supporting text, numbers, and formatted variants.
 * Includes support for labels, error states, prefixes, and suffixes.
 */
const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "number", "formatted-number", "integer"],
      description: "The type of input formatting and validation",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "xs"],
      description: "The size of the input",
    },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "text",
    },
    label: {
      control: "text",
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text here",
    label: "Standard Input",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "email@example.com",
    type: "email",
  },
};

export const WithError: Story = {
  args: {
    label: "Password",
    type: "password",
    error: "Password must be at least 8 characters",
    placeholder: "Enter your password",
  },
};

export const NumberInput: Story = {
  args: {
    label: "Age",
    type: "number",
    variant: "number",
    placeholder: "Enter your age",
  },
};

export const CurrencyInput: Story = {
  args: {
    label: "Amount",
    variant: "formatted-number",
    inputPrefix: <span className="text-muted-foreground">$</span>,
    placeholder: "0.00",
  },
};

export const Disabled: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    disabled: true,
  },
};

export const InteractionTest: Story = {
  args: {
    label: "Search",
    placeholder: "Type something...",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Type something...");
    await userEvent.type(input, "Hello World");
    await expect(input).toHaveValue("Hello World");
    await expect(args.onChange).toHaveBeenCalled();
  },
};
