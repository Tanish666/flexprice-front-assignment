import React from "react";
import { Chip } from "@/components/atoms";
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

export type InvoiceStatus =
  | "paid"
  | "draft"
  | "void"
  | "finalized"
  | "skipped"
  | "overdue";

export interface InvoiceStatusBadgeProps {
  status: string | InvoiceStatus;
  className?: string;
}

/**
 * InvoiceStatusBadge molecule that maps invoice status strings to colored chips with icons.
 */
const InvoiceStatusBadge: React.FC<InvoiceStatusBadgeProps> = ({
  status,
  className,
}) => {
  const normalizedStatus = status.toLowerCase();

  switch (normalizedStatus) {
    case "paid":
    case "succeeded":
    case "finalized":
      return (
        <Chip
          variant="success"
          label={status}
          icon={<CheckCircle2 className="size-3" />}
          className={className}
        />
      );
    case "draft":
    case "pending":
    case "initiated":
      return (
        <Chip
          variant="warning"
          label={status}
          icon={<Clock className="size-3" />}
          className={className}
        />
      );
    case "void":
    case "voided":
    case "failed":
      return (
        <Chip
          variant="failed"
          label={status}
          icon={<XCircle className="size-3" />}
          className={className}
        />
      );
    case "overdue":
      return (
        <Chip
          variant="failed"
          label={status}
          icon={<AlertCircle className="size-3" />}
          className={className}
        />
      );
    case "skipped":
      return (
        <Chip
          variant="default"
          label={status}
          icon={<FileText className="size-3" />}
          className={className}
        />
      );
    default:
      return <Chip variant="default" label={status} className={className} />;
  }
};

export default InvoiceStatusBadge;
