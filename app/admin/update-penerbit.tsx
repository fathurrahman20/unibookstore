"use client";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { Publisher } from "@prisma/client";

const UpdatePublisher = ({ publishers }: { publishers: Publisher }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [publisher, setPublisher] = useState({
    id: publishers.id,
    name: publishers.name,
    address: publishers.address,
    city: publishers.city,
    phone: publishers.phone,
  });

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch(`/api/publishers/${publisher.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(publisher),
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
          <h2 className="font-bold mb-3">Update Buku {publishers.name}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label htmlFor="id" className="label font-bold">
                ID Buku
              </label>
              <input
                type="text"
                name="id"
                id="id"
                value={publisher.id}
                onChange={(e) =>
                  setPublisher({ ...publisher, id: e.target.value })
                }
                className="input input-bordered"
                placeholder="ID Penerbit"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="name" className="label font-bold">
                Nama
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={publisher.name}
                onChange={(e) =>
                  setPublisher({ ...publisher, name: e.target.value })
                }
                className="input input-bordered"
                placeholder="Nama"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="address" className="label font-bold">
                Alamat
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={publisher.address}
                onChange={(e) =>
                  setPublisher({ ...publisher, address: e.target.value })
                }
                className="input input-bordered"
                placeholder="Alamat"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="city" className="label font-bold">
                Kota
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={publisher.city}
                onChange={(e) =>
                  setPublisher({ ...publisher, city: e.target.value })
                }
                className="input input-bordered"
                placeholder="Kota"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="phone" className="label font-bold">
                Stok
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                value={publisher.phone}
                onChange={(e) =>
                  setPublisher({ ...publisher, phone: e.target.value })
                }
                className="input input-bordered"
              />
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

export default UpdatePublisher;
