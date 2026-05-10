import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from "./Tooltip";
import { Button } from "@/components/ui/button";

/**
 * A tooltip component that displays informational text when hovering over an element.
 * Supports custom delays and positioning.
 */
const meta = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
    delayDuration: {
      control: "number",
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Button variant="outline">Hover me</Button>,
    content: "This is a helpful tooltip",
  },
};

export const WithDelay: Story = {
  args: {
    children: <Button variant="outline">Slow tooltip</Button>,
    content: "I appeared after 1 second",
    delayDuration: 1000,
  },
};

export const DifferentSides: Story = {
  args: { children: <span>Dummy</span>, content: "dummy" },
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Tooltip on top" side="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Tooltip on right" side="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" side="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Tooltip on left" side="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
    </div>
  ),
};
