import React from "react";
import { Card } from "@/components/atoms";
import { TIER_MODE } from "@/models";
import { getCurrencySymbol } from "@/utils/common/helper_functions";
import { motion } from "framer-motion";

export interface PricingTier {
  range: string;
  quantity: string;
  rate: string;
  cost: string;
}

export interface PricingTierTableProps {
  tiers: PricingTier[];
  totalCost: string;
  effectiveRate: string;
  tierMode: TIER_MODE;
  currency: string;
  usageQuantity: string;
  title?: string;
}

/**
 * An organism that displays tiered pricing breakdown for a plan or usage.
 */
const PricingTierTable: React.FC<PricingTierTableProps> = ({
  tiers,
  totalCost,
  effectiveRate,
  tierMode,
  currency,
  usageQuantity,
  title = "Pricing Tier Analysis",
}) => {
  const currencySymbol = getCurrencySymbol(currency);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Visual breakdown of how costs are calculated based on your usage
            tiers.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-sm font-medium text-slate-600">Total Cost</span>
          <span className="text-xl font-bold text-blue-600">
            {currencySymbol}
            {totalCost}
          </span>
        </div>
      </div>

      <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-xl bg-white p-0">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-8">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Tier Mode
            </span>
            <span className="text-sm font-medium text-slate-800 bg-white px-2.5 py-1 rounded-md border border-slate-200 inline-block w-fit">
              {tierMode === TIER_MODE.VOLUME
                ? "Volume Pricing"
                : "Slab Pricing"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Total Usage
            </span>
            <span className="text-sm font-medium text-slate-800">
              {usageQuantity} units
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Effective Rate
            </span>
            <span className="text-sm font-medium text-slate-800">
              {currencySymbol}
              {effectiveRate} / unit
            </span>
          </div>
        </div>

        {tierMode === TIER_MODE.VOLUME && (
          <div className="px-5 py-4 bg-blue-50/50 border-b border-blue-100 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
            <p className="text-sm text-blue-800">
              <strong>Volume Mode:</strong> All{" "}
              <span className="font-semibold">{usageQuantity}</span> units are
              charged at the highest tier rate of{" "}
              <span className="font-semibold">
                {currencySymbol}
                {effectiveRate}
              </span>{" "}
              per unit.
            </p>
          </div>
        )}
        {tierMode === TIER_MODE.SLAB && (
          <div className="px-5 py-4 bg-emerald-50/50 border-b border-emerald-100 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
            <p className="text-sm text-emerald-800">
              <strong>Slab Mode:</strong> Usage is broken down across multiple
              tiers. Each tier's range is priced separately and summed up.
            </p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/4">
                  Range
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/4 text-right">
                  Quantity
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/4 text-right">
                  Rate
                </th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/4 text-right">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tiers.map((tier, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="py-4 px-6 text-sm font-medium text-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-400 transition-colors"></div>
                      {tier.range}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600 text-right">
                    {tier.quantity}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600 text-right font-medium">
                    {currencySymbol}
                    {tier.rate}
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-900 font-semibold text-right">
                    {currencySymbol}
                    {tier.cost}
                  </td>
                </motion.tr>
              ))}
            </tbody>
            {tiers.length > 0 && (
              <tfoot>
                <tr className="bg-slate-50/80 border-t border-slate-200">
                  <td
                    colSpan={3}
                    className="py-4 px-6 text-sm font-semibold text-slate-600 text-right"
                  >
                    Total Cost
                  </td>
                  <td className="py-4 px-6 text-base font-bold text-blue-600 text-right">
                    {currencySymbol}
                    {totalCost}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PricingTierTable;
