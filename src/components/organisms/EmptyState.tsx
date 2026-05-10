import React from "react";
import { Button } from "@/components/atoms";
import { motion } from "framer-motion";

export interface EmptyStateProps {
  icon: React.ReactNode;
  headline: string;
  subtext: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

/**
 * A full-page empty state organism used when a section has no data to display.
 * Includes an icon, headline, subtext, and clear call-to-action.
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  headline,
  subtext,
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full px-4 text-center bg-white border border-slate-100 rounded-2xl shadow-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-24 h-24 mb-6 rounded-full bg-blue-50/50 flex items-center justify-center shadow-inner shadow-blue-100/50 border border-blue-50"
      >
        <div className="text-blue-500 w-12 h-12 flex items-center justify-center">
          {icon}
        </div>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl font-semibold text-slate-800 mb-3 tracking-tight"
      >
        {headline}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed"
      >
        {subtext}
      </motion.p>
      {buttonLabel && onButtonClick && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            onClick={onButtonClick}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all font-medium border-transparent"
          >
            {buttonLabel}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default EmptyState;
