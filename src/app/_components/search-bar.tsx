"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useState } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";

interface SearchBarProps {
  searchQuery: string;
}

const SearchBar: FC<SearchBarProps> = ({ searchQuery }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(searchQuery ?? "");
  const [, setQuery] = useQueryParam(
    "search",
    withDefault(StringParam, searchQuery),
  );

  function handleSearch() {
    setQuery(searchValue);
    router.refresh();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <div className="mb-8 flex items-center gap-4">
      <div className="relative flex w-full">
        <Input
          onChange={handleChange}
          value={searchValue}
          placeholder="Search..."
          className="shadow-none"
          onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : null)}
        />
        {searchValue.length > 0 && (
          <X
            onClick={() => {
              setSearchValue("");
              setQuery("");
              router.refresh();
            }}
            className="absolute right-1 top-1 text-slate-400"
          />
        )}
      </div>
      <Button className="ml-2 px-4" variant="default" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
