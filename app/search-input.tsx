"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchInput = () => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : ""
  );
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (typeof searchQuery !== "string") {
      return;
    }

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <div className="flex justify-center w-full mt-4 mb-3">
      <form onSubmit={onSearch} className="flex justify-center w-2/3">
        <input
          value={searchQuery || ""}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="px-5 py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-400 focus:bg-zinc-800 rounded-full focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-200"
          placeholder="Cari buku, kategori atau penerbit.."
        />
      </form>
    </div>
  );
};

export default SearchInput;
