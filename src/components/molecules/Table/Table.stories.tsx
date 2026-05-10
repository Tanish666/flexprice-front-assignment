import type { Meta, StoryObj } from "@storybook/react";
import Table from "./Table";
import Chip from "../../atoms/Chip/Chip";

/**
 * A versatile table component supporting custom columns, row clicks, and various visual variants.
 */
const meta = {
  title: "Molecules/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "no-bordered"],
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const columns = [
  { title: "Name", fieldName: "name", flex: 2 },
  {
    title: "Status",
    render: (row: any) => (
      <Chip
        label={row.status}
        variant={row.status === "Active" ? "success" : "warning"}
      />
    ),
    flex: 1,
  },
  { title: "Amount", fieldName: "amount", align: "right" as const, flex: 1 },
  { title: "Date", fieldName: "date", flex: 1 },
];

const data = [
  {
    id: 1,
    name: "Standard Subscription",
    status: "Active",
    amount: "$49.00",
    date: "2024-05-20",
  },
  {
    id: 2,
    name: "Pro Plan",
    status: "Active",
    amount: "$99.00",
    date: "2024-05-18",
  },
  {
    id: 3,
    name: "Basic Usage",
    status: "Warning",
    status_label: "Pending",
    amount: "$15.00",
    date: "2024-05-15",
  },
];

export const Default: Story = {
  args: {
    columns,
    data,
    variant: "default",
  },
};

export const NoBorder: Story = {
  args: {
    columns,
    data,
    variant: "no-bordered",
  },
};

export const EmptyState: Story = {
  args: {
    columns,
    data: [],
    showEmptyRow: true,
  },
};

/**
 * Demonstrating a table with many rows.
 * Note: Actual virtualization would require a library like react-window,
 * but this shows the table's performance with larger datasets.
 */
export const LargeDataset: Story = {
  args: {
    columns,
    data: Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      name: `Item ${i}`,
      status: i % 2 === 0 ? "Active" : "Warning",
      amount: `$${(Math.random() * 100).toFixed(2)}`,
      date: "2024-05-20",
    })),
  },
};
