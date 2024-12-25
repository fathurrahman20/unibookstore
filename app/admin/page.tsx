"use client";

import TabAdminMenu from "./tab-admin-menu";
import { useEffect, useState } from "react";

const Product = () => {
  const [books, setBooks] = useState([]);
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const booksResponse = await fetch("/api/books");
      const publishersResponse = await fetch("/api/publishers");

      setBooks(await booksResponse.json());
      setPublishers(await publishersResponse.json());
    };

    fetchData();
  }, []);
  return (
    <div>
      <TabAdminMenu books={books} publishers={publishers} />
    </div>
  );
};

export default Product;
