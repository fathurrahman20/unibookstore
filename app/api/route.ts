import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../application/database";
import { Book, Publisher } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    if (typeof query !== "string") {
      throw new Error("Invalid request");
    }

    /**
     * Search posts
     */
    const books: Array<Book & { publisher: Publisher }> =
      await prisma.book.findMany({
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              category: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              publisher: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        include: {
          publisher: true,
        },
      });

    return NextResponse.json(books, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
