"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Book } from "@prisma/client";

const DeleteBook = ({ book }: { book: Book }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (bookId: string) => {
    await fetch(`/api/books/${bookId}`, {
      next: {
        revalidate: 0,
      },
      method: "DELETE",
    });
    router.refresh();
    setIsOpen(false);
  };

  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleModal}>
        Hapus
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold">
            Yakin ingin menghapus buku {book.title}?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              Batal
            </button>
            <button
              type="button"
              onClick={() => handleDelete(book.id)}
              className="btn btn-primary">
              Ya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
