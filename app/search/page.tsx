"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import Books from "../Books";
import Spinner from "./spinner";

const fetchBooks = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

const SearchPage = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const router = useRouter();

  const encodedSearchQuery = encodeURI(searchQuery || "");

  const { data, isLoading } = useSWR(
    `/api/?q=${encodedSearchQuery}`,
    fetchBooks,
    { revalidateOnFocus: false }
  );

  if (!encodedSearchQuery) {
    router.push("/");
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center justify-items-center">
        <Spinner />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div>
        No books found for: <strong>{searchQuery}</strong>
      </div>
    );
  }
  console.log("DAtaa: ", data);
  return (
    <>
      <div className="mt-7">
        <div className="mb-5 ml-3">
          <span className="text-xl">
            Showing results for:{" "}
            <span className="font-semibold">{searchQuery}</span>
          </span>
        </div>
        <Books books={data} />
      </div>
    </>
  );
};

export default SearchPage;
