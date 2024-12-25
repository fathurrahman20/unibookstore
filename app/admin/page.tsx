import { Book, Publisher } from "@prisma/client";
import { prisma } from "../application/database";
import TabAdminMenu from "./tab-admin-menu";

export async function getServerSideProps() {
  const [books, publishers] = await Promise.all([
    prisma.book.findMany({
      include: { publisher: true },
    }),
    prisma.publisher.findMany(),
  ]);

  return {
    props: {
      books,
      publishers,
    },
  };
}

const Product = ({
  books,
  publishers,
}: {
  books: Book[];
  publishers: Publisher[];
}) => {
  return (
    <div>
      <TabAdminMenu books={books} publishers={publishers} />
    </div>
  );
};

export default Product;
