import { prisma } from "../application/database";
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

const Book = async () => {
  const [books, publishers] = await Promise.all([getBooks(), getPublisher()]);
  return (
    <div>
      <TabAdminMenu books={books} publishers={publishers} />
    </div>
  );
};

export default Book;
