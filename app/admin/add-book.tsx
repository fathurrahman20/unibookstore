"use client";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

import { Publisher } from "@prisma/client";

const AddBook = ({ publishers }: { publishers: Publisher[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [book, setBook] = useState({
    id: "",
    category: "",
    title: "",
    price: 0,
    stock: 0,
    publisherId: "SP01",
  });

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    setBook({
      id: "",
      category: "",
      title: "",
      price: 0,
      stock: 0,
      publisherId: "",
    });

    router.refresh();
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Tambah Buku
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold">Tambah Buku Baru</h3>
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
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
