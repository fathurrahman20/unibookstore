"use client";

import { Book, Publisher } from "@prisma/client";
import AddBook from "./add-book";
import DeleteBook from "./delete-book";
import UpdateBook from "./update-book";
import AddPenerbit from "./add-penerbit";
import { formatToIDR } from "../utils/book-utils";
import DeletePublisher from "./delete-penerbit";
import UpdatePublisher from "./update-penerbit";

const TabAdminMenu = ({
  books,
  publishers,
}: {
  books: Book[];
  publishers: Publisher[];
}) => {
  return (
    <div role="tablist" className="tabs tabs-lifted">
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label="Buku"
        defaultChecked
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <div>
          <div className="mb-2">
            <AddBook publishers={publishers} />
          </div>
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID Buku</th>
                <th>Kategori</th>
                <th>Nama Buku</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Penerbit</th>
                <th className="text-center">Actions</th>
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
                  <td>
                    {
                      publishers.find(
                        (publisher) => publisher.id === book.publisherId
                      )?.name
                    }
                  </td>
                  <td className="flex justify-center space-x-2 text-center">
                    <DeleteBook book={book} />
                    <UpdateBook books={book} publishers={publishers} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label="Penerbit"
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <div>
          <div className="mb-2">
            <AddPenerbit publishers={publishers} />
          </div>
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID Penerbit</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Kota</th>
                <th>Telepon</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {publishers.map((publisher) => (
                <tr key={publisher.id}>
                  <td>{publisher.id}</td>
                  <td>{publisher.name}</td>
                  <td>{publisher.address}</td>
                  <td>{publisher.city}</td>
                  <td>{publisher.phone}</td>
                  <td className="flex justify-center space-x-2 text-center">
                    <DeletePublisher publisher={publisher} />
                    <UpdatePublisher publishers={publisher} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TabAdminMenu;
