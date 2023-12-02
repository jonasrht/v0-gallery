"use client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";

interface SearchBarProps {
  searchQuery: string;
}

const SearchBar: FC<SearchBarProps> = ({ searchQuery }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(searchQuery ?? "");
  const [query, setQuery] = useQueryParam(
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
    <Input
      onChange={handleChange}
      value={searchValue}
      onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : null)}
    />
  );
};

export default SearchBar;
