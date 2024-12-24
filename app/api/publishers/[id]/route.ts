import { prisma } from "@/app/application/database";
import { Publisher } from "@prisma/client";
import { NextResponse } from "next/server";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Publisher = await request.json();
  const publisher = await prisma.publisher.update({
    where: {
      id: params.id,
    },
    data: body,
  });
  return NextResponse.json(publisher, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
  });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const publisher = await prisma.publisher.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(publisher, { status: 200 });
};
