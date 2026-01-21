"use client";

import { useState } from "react";
import { SearchIcon } from "../icons";
import { cn } from "@/lib/utils";

type SearchInputProps = {
  onSearch: (value: string) => void;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
};

export function SearchInput({
  onSearch,
  label,
  placeholder = "Search",
  defaultValue = "",
  className,
}: SearchInputProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <form
      role="search"
      aria-label={label}
      className={cn(
        "flex items-center gap-3 border border-gray-200 bg-white px-4 py-3 focus-within:border-mansion-gold",
        className,
      )}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(value.trim());
      }}
    >
      <SearchIcon className="h-5 w-5 text-mansion-gold" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => {
          const next = event.target.value;
          setValue(next);
          if (next === "") {
            onSearch("");
          }
        }}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-mansion-charcoal placeholder:text-mansion-charcoal/40 focus:outline-none"
      />
      {value && (
        <button
          type="button"
          className="px-2 text-xs font-semibold text-mansion-gold hover:text-mansion-gold-dark"
          onClick={() => {
            setValue("");
            onSearch("");
          }}
        >
          Clear
        </button>
      )}
      <button
        type="submit"
        className="hidden bg-mansion-gold px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-mansion-gold-dark sm:inline-flex"
      >
        Search
      </button>
    </form>
  );
}

