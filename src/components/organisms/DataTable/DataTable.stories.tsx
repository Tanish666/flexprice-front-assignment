import type { Meta, StoryObj } from "@storybook/react";
import { useMemo } from "react";
import { DataTable } from "./DataTable";
import { createFilterStore } from "@/hooks/useFilterStore";

const meta = {
  title: "Organisms/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;

// Mock 10,000 Rows for Virtualisation Challenge
const generateMockData = (count: number) => {
  const statuses = ["Active", "Pending", "Cancelled"];
  const plans = ["Pro", "Starter", "Enterprise"];
  return Array.from({ length: count }).map((_, i) => ({
    id: `INV-${10000 + i}`,
    customer: `Customer ${Math.floor(Math.random() * 1000) + 1}`,
    amount: `$${(Math.random() * 500).toFixed(2)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    plan: plans[Math.floor(Math.random() * plans.length)],
    date: new Date(
      Date.now() - Math.floor(Math.random() * 10000000000),
    ).toLocaleDateString(),
  }));
};

const mockData10k = generateMockData(10000);

const columns = [
  { key: "id", header: "Invoice ID", width: "15%" },
  { key: "customer", header: "Customer", width: "25%" },
  { key: "plan", header: "Plan", width: "15%" },
  { key: "amount", header: "Amount", width: "15%" },
  {
    key: "status",
    header: "Status",
    width: "15%",
    render: (row: any) => (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
          row.status === "Active"
            ? "bg-emerald-100 text-emerald-700"
            : row.status === "Pending"
              ? "bg-amber-100 text-amber-700"
              : "bg-slate-100 text-slate-700"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  { key: "date", header: "Date", width: "15%" },
];

export const Virtualised10kRows: StoryObj<typeof DataTable> = {
  render: () => {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Virtualised Data Table
          </h2>
          <p className="text-slate-500">
            Rendering 10,000 mock rows smoothly using @tanstack/react-virtual.
          </p>
        </div>
        <DataTable
          data={mockData10k}
          columns={columns}
          containerHeight="600px"
        />
      </div>
    );
  },
};

// Filter Store Demo
const useInvoiceFilterStore = createFilterStore("invoices");

const FilterStorePersistenceComponent = () => {
  const { filters, setFilter, resetFilters } = useInvoiceFilterStore();

  // Filter the 10k rows based on store state
  const filteredData = useMemo(() => {
    return mockData10k.filter((row) => {
      if (
        filters.status &&
        filters.status !== "All" &&
        row.status !== filters.status
      )
        return false;
      if (filters.plan && filters.plan !== "All" && row.plan !== filters.plan)
        return false;
      if (
        filters.search &&
        !(row.customer as string)
          .toLowerCase()
          .includes((filters.search as string).toLowerCase())
      )
        return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Filter Persistence via Zustand & SessionStorage
        </h2>
        <p className="text-slate-500">
          Select filters below. Notice the URL updates with a shallow `?f=hash`
          fingerprint. Reload the page to see filters persist from
          sessionStorage without bloating the URL.
        </p>
      </div>

      <div className="flex gap-4 items-end bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Search Customer
          </label>
          <input
            type="text"
            placeholder="e.g. Customer 42"
            value={(filters.search as string) || ""}
            onChange={(e) => setFilter("search", e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm text-sm"
          />
        </div>
        <div className="w-48">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Status
          </label>
          <select
            value={(filters.status as string) || "All"}
            onChange={(e) => setFilter("status", e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm text-sm bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="w-48">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Plan
          </label>
          <select
            value={(filters.plan as string) || "All"}
            onChange={(e) => setFilter("plan", e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm text-sm bg-white"
          >
            <option value="All">All Plans</option>
            <option value="Pro">Pro</option>
            <option value="Starter">Starter</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md text-sm font-medium transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="text-sm text-slate-600 font-medium">
        Showing {filteredData.length.toLocaleString()} results
      </div>

      <DataTable
        data={filteredData}
        columns={columns}
        containerHeight="500px"
      />
    </div>
  );
};

export const FilterStorePersistence: StoryObj<typeof DataTable> = {
  render: () => <FilterStorePersistenceComponent />,
};
