"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Publisher } from "@prisma/client";

const DeletePublisher = ({ publisher }: { publisher: Publisher }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (publisherId: string) => {
    await fetch(`/api/publishers/${publisherId}`, {
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
            Yakin ingin menghapus penerbit {publisher.name}?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              Batal
            </button>
            <button
              type="button"
              onClick={() => handleDelete(publisher.id)}
              className="btn btn-primary">
              Ya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePublisher;
