import { prisma } from "@/app/application/database";
import { Publisher } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { id, name, address, city, phone }: Publisher = await req.json();
  const publisher = await prisma.publisher.create({
    data: { id, name, address, city, phone },
  });
  return NextResponse.json(publisher, { status: 201 });
};
