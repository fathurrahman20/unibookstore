import { Book, Publisher } from "@prisma/client";
import React from "react";
import { formatToIDR } from "./utils/book-utils";

const Books = ({
  books,
}: {
  books: Array<Book & { publisher: Publisher }>;
}) => {
  return (
    <div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID Buku</th>
            <th>Kategori</th>
            <th>Nama Buku</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Penerbit</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.category}</td>
              <td>{book.title}</td>
              <td>{formatToIDR(book.price)}</td>
              <td>{book.stock}</td>
              <td>{book.publisher.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
