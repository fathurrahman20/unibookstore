import { prisma } from "@/app/application/database";
import { Book } from "@prisma/client";
import { NextResponse } from "next/server";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Book = await request.json();
  const book = await prisma.book.update({
    where: {
      id: params.id,
    },
    data: body,
  });
  return NextResponse.json(book, { status: 200 });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const book = await prisma.book.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(book, { status: 200 });
};
