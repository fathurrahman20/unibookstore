import { prisma } from "../application/database";
import AddBook from "./add-book";
import DeleteBook from "./delete-book";
import UpdateBook from "./update-book";
import TabAdminMenu from "./tab-admin-menu";

const getBooks = async () => {
  const response = await prisma.book.findMany({
    include: {
      publisher: true,
    },
  });
  return response;
};

const getPublisher = async () => {
  const response = await prisma.publisher.findMany();
  return response;
};

const Product = async () => {
  const [books, publishers] = await Promise.all([getBooks(), getPublisher()]);
  return (
    <div>
      <TabAdminMenu books={books} publishers={publishers} />
    </div>
  );
};

export default Product;
