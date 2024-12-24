"use client";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

import { Book, Publisher } from "@prisma/client";

const UpdateBook = ({
  books,
  publishers,
}: {
  books: Book;
  publishers: Publisher[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [book, setBook] = useState({
    id: books.id,
    category: books.category,
    title: books.title,
    price: books.price,
    stock: books.stock,
    publisherId: books.publisherId,
  });

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch(`/api/books/${book.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    router.refresh();
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn btn-sm" onClick={handleModal}>
        Update
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h2 className="font-bold mb-3">Update Buku {books.title}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label htmlFor="id" className="label font-bold">
                ID Buku
              </label>
              <input
                type="text"
                name="id"
                id="id"
                value={book.id}
                onChange={(e) => setBook({ ...book, id: e.target.value })}
                className="input input-bordered"
                placeholder="ID Buku"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="category" className="label font-bold">
                Kategori
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={book.category}
                onChange={(e) => setBook({ ...book, category: e.target.value })}
                className="input input-bordered"
                placeholder="Kategori"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="title" className="label font-bold">
                Nama Buku
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={book.title}
                onChange={(e) => setBook({ ...book, title: e.target.value })}
                className="input input-bordered"
                placeholder="Nama Buku"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="price" className="label font-bold">
                Harga
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={book.price}
                onChange={(e) => setBook({ ...book, price: +e.target.value })}
                className="input input-bordered"
                placeholder="Harga"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="stock" className="label font-bold">
                Stok
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={book.stock}
                onChange={(e) => setBook({ ...book, stock: +e.target.value })}
                className="input input-bordered"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="publisher" className="label font-bold">
                Penerbit
              </label>
              <select
                name="publisher"
                id="publisher"
                value={book.publisherId}
                onChange={(e) =>
                  setBook({ ...book, publisherId: e.target.value })
                }
                className="select select-bordered">
                <option disabled>Pilih Penerbit</option>
                {publishers.map((publisher) => (
                  <option key={publisher.id} value={publisher.id}>
                    {publisher.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Tutup
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
