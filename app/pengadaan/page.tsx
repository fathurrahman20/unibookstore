import React from "react";
import { prisma } from "../application/database";

const getBooksByLowestStock = async () => {
  const lowestStockBook = await prisma.book.findFirst({
    orderBy: {
      stock: "asc",
    },
    select: {
      stock: true,
    },
  });

  if (!lowestStockBook) return null;

  const response = await prisma.book.findMany({
    where: {
      stock: lowestStockBook.stock,
    },
    select: {
      id: true,
      title: true,
      stock: true,
      publisher: { select: { name: true } },
    },
  });

  return response;
};

const Pengadaan = async () => {
  const books = await getBooksByLowestStock();
  return (
    <div>
      <h1>Laporan Kebutuhan Buku</h1>
      <p className="mt-1 mb-3">
        Buku yang perlu segera dibeli berdasarkan stok terkecil:
      </p>
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID Buku</th>
            <th>Nama Buku</th>
            <th>Stok</th>
            <th>Penerbit</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => (
            <tr key={book?.id}>
              <td>{book?.id}</td>
              <td>{book?.title}</td>
              <td>{book?.stock}</td>
              <td>{book?.publisher.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pengadaan;
