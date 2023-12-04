"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useState } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";

interface SearchBarProps {
  searchQuery: string;
}

const SearchBar: FC<SearchBarProps> = ({ searchQuery }) => {
  const router = useRouter();
  // const utils = api.useUtils();
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
      <Input
        onChange={handleChange}
        value={searchValue}
        placeholder="Search..."
        className="shadow-none"
        onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : null)}
      />
      <Button className="ml-2 px-4" variant="default" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
