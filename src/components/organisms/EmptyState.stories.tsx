import type { Meta, StoryObj } from "@storybook/react";
import EmptyState from "./EmptyState";
import { PackageOpen, Users, Receipt } from "lucide-react";
import { BrowserRouter } from "react-router";

/**
 * A full-page empty state organism used when a section has no data to display.
 * Includes an icon, headline, subtext, and clear call-to-action.
 */
const meta = {
  title: "Organisms/EmptyState",
  component: EmptyState,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="p-8 bg-slate-50 min-h-screen">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Customers: Story = {
  args: {
    icon: <Users className="w-full h-full" />,
    headline: "No customers found",
    subtext:
      "Get started by creating your first customer manually or importing via API.",
    buttonLabel: "Add Customer",
    onButtonClick: () => alert("Add customer clicked"),
  },
};

export const Invoices: Story = {
  args: {
    icon: <Receipt className="w-full h-full" />,
    headline: "No invoices yet",
    subtext:
      "Invoices will appear here once your customers have active subscriptions and usage.",
    buttonLabel: "Learn about Invoicing",
    onButtonClick: () => {},
  },
};

export const Plans: Story = {
  args: {
    icon: <PackageOpen className="w-full h-full" />,
    headline: "Create your first plan",
    subtext:
      "Plans define the billing structure and features for your products.",
    buttonLabel: "Create Plan",
    onButtonClick: () => {},
  },
};
