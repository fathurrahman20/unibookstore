import React from "react";
import { prisma } from "./application/database";
import Books from "./Books";
import SearchInput from "./search-input";

const Home = async () => {
  const books = await prisma.book.findMany({
    include: { publisher: true },
  });
  return (
    <div>
      <SearchInput />
      <Books books={books} />
    </div>
  );
};

export default Home;
