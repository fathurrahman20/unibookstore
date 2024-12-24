import { prisma } from "@/app/application/database";
import { Book } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const books = await prisma.book.findMany({ include: { publisher: true } });
  return NextResponse.json(books);
};

export const POST = async (req: Request) => {
  const { id, category, title, price, stock, publisherId }: Book =
    await req.json();
  const book = await prisma.book.create({
    data: {
      id,
      category,
      title,
      price,
      stock,
      publisherId,
    },
  });
  return NextResponse.json(book, { status: 201 });
};
