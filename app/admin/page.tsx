import { prisma } from "../application/database";
import AddBook from "./add-book";
import DeleteBook from "./delete-book";
import UpdateBook from "./update-book";
import TabAdminMenu from "./tab-admin-menu";

const Product = async () => {
  const [books, publishers] = await Promise.all([
    prisma.book.findMany({
      include: { publisher: true },
    }),
    prisma.publisher.findMany(),
  ]);
  return (
    <div>
      <TabAdminMenu books={books} publishers={publishers} />
    </div>
  );
};

export default Product;
