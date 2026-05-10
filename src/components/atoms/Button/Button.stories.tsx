import type { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, within, expect } from "@storybook/test";
import Button from "./Button";

/**
 * A highly customizable button component used for actions throughout the application.
 * Supports various sizes, variants, and states including loading and disabled.
 */
const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "black",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "xs"],
      description: "The size of the button",
    },
    isLoading: {
      control: "boolean",
      description: "Displays a loading spinner and disables the button",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click Me",
    variant: "default",
    size: "default",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Button",
    variant: "destructive",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

export const Loading: Story = {
  args: {
    children: "Loading...",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const InteractionTest: Story = {
  args: {
    children: "Click to test",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};
