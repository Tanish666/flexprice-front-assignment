import type { Meta, StoryObj } from "@storybook/react";
import SidebarNav from "./SidebarNav";
import { BrowserRouter } from "react-router";
import { Home, Layers2, Landmark, BarChart3, Settings } from "lucide-react";

/**
 * The main navigation component for the sidebar, supporting nested items,
 * active state highlighting, and collapsible groups.
 */
const meta = {
  title: "Organisms/SidebarNav",
  component: SidebarNav,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="w-[280px] h-[600px] bg-white border-r border-slate-200">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockItems = [
  { title: "Home", url: "/", icon: Home },
  {
    title: "Product Catalog",
    url: "/product-catalog",
    icon: Layers2,
    items: [
      { title: "Features", url: "/product-catalog/features" },
      { title: "Plans", url: "/product-catalog/plans" },
    ],
  },
  {
    title: "Billing",
    url: "/billing",
    icon: Landmark,
    items: [
      { title: "Customers", url: "/billing/customers" },
      { title: "Invoices", url: "/billing/invoices" },
    ],
  },
  { title: "Revenue", url: "/revenue", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export const Default: Story = {
  args: {
    items: mockItems,
    isCollapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    items: mockItems,
    isCollapsed: true,
  },
};
