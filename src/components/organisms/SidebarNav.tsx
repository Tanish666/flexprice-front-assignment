import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router";
import { LucideIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: { title: string; url: string }[];
}

export interface SidebarNavProps {
  items: NavItem[];
  isCollapsed?: boolean;
}

/**
 * Collapsible sidebar navigation organism with active-route highlighting
 * and nested accordion items.
 */
const SidebarNav: React.FC<SidebarNavProps> = ({
  items,
  isCollapsed = false,
}) => {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Open groups containing the active route automatically
    const newOpenGroups = { ...openGroups };
    let hasChanges = false;

    items.forEach((item) => {
      if (item.items) {
        const isActive = item.items.some((sub) =>
          location.pathname.startsWith(sub.url),
        );
        if (isActive && !newOpenGroups[item.title]) {
          newOpenGroups[item.title] = true;
          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      setOpenGroups(newOpenGroups);
    }
  }, [location.pathname, items]);

  const toggleGroup = (title: string) => {
    if (isCollapsed) return; // Prevent toggle when collapsed
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <nav className="flex flex-col gap-1 w-full p-2">
      {items.map((item) => {
        const hasChildren = item.items && item.items.length > 0;
        const isMainActive =
          location.pathname === item.url ||
          (item.url !== "/" &&
            location.pathname.startsWith(item.url) &&
            !hasChildren);
        const isChildActive = item.items?.some((sub) =>
          location.pathname.startsWith(sub.url),
        );
        const isActive = isMainActive || isChildActive;
        const isOpen = openGroups[item.title];

        return (
          <div key={item.title} className="w-full">
            {hasChildren ? (
              <button
                onClick={() => toggleGroup(item.title)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group text-sm font-medium",
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon && (
                    <item.icon
                      className={cn(
                        "w-5 h-5 transition-colors",
                        isActive
                          ? "text-blue-600"
                          : "text-slate-400 group-hover:text-slate-600",
                      )}
                    />
                  )}
                  {!isCollapsed && <span>{item.title}</span>}
                </div>
                {!isCollapsed && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200 text-slate-400",
                      isOpen ? "rotate-180" : "",
                    )}
                  />
                )}
              </button>
            ) : (
              <Link
                to={item.url}
                className={cn(
                  "w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group text-sm font-medium",
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )}
                title={isCollapsed ? item.title : undefined}
              >
                {item.icon && (
                  <item.icon
                    className={cn(
                      "w-5 h-5 mr-3 transition-colors shrink-0",
                      isActive
                        ? "text-blue-600"
                        : "text-slate-400 group-hover:text-slate-600",
                      isCollapsed && "mr-0",
                    )}
                  />
                )}
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            )}

            {!isCollapsed && hasChildren && (
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-1 pl-10 pr-2 py-1 mt-1">
                      {item.items!.map((subItem) => {
                        const isSubActive = location.pathname.startsWith(
                          subItem.url,
                        );
                        return (
                          <Link
                            key={subItem.title}
                            to={subItem.url}
                            className={cn(
                              "relative px-3 py-2 text-sm rounded-md transition-colors duration-200 font-medium",
                              isSubActive
                                ? "text-blue-700 bg-blue-50/50"
                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
                            )}
                          >
                            {isSubActive && (
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-600 -ml-3" />
                            )}
                            {subItem.title}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default SidebarNav;
