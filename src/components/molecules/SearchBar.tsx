import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/atoms";
import { useDebounce } from "use-debounce";

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  defaultValue?: string;
  debounceMs?: number;
  className?: string;
}

/**
 * SearchBar molecule with built-in debounce and clear functionality.
 */
const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
  defaultValue = "",
  debounceMs = 300,
  className,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [debouncedValue] = useDebounce(inputValue, debounceMs);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div className={`relative w-full max-w-sm ${className}`}>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={setInputValue}
        inputPrefix={<Search className="size-4 text-muted-foreground" />}
        suffix={
          inputValue && (
            <button
              onClick={handleClear}
              className="hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )
        }
      />
    </div>
  );
};

export default SearchBar;
