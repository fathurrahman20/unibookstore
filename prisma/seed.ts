// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const publishers = [
  {
    id: "SP01",
    name: "Penerbit Informatika",
    address: "Jl. Buah Batu No. 121",
    city: "Bandung",
    phone: "081322201946",
  },
  {
    id: "SP02",
    name: "Andi Offset",
    address: "Jl. Suryalaya IX No.3",
    city: "Bandung",
    phone: "087839030688",
  },
  {
    id: "SP03",
    name: "Danendra",
    address: "Jl. Moch. Toha 44",
    city: "Bandung",
    phone: "0225201215",
  },
];

const books = [
  {
    id: "K1001",
    category: "Keilmuan",
    title: "Analisis & Perancangan Sistem Informasi",
    price: 50000,
    stock: 60,
    publisherId: "SP01",
  },
  {
    id: "K1002",
    category: "Keilmuan",
    title: "Artificial Intelligence",
    price: 45000,
    stock: 60,
    publisherId: "SP01",
  },
  {
    id: "K2003",
    category: "Keilmuan",
    title: "Autocad 3 Dimensi",
    price: 40000,
    stock: 25,
    publisherId: "SP01",
  },
  {
    id: "B1001",
    category: "Bisnis",
    title: "Bisnis Online",
    price: 75000,
    stock: 9,
    publisherId: "SP01",
  },
  {
    id: "K3004",
    category: "Keilmuan",
    title: "Cloud Computing Technology",
    price: 85000,
    stock: 15,
    publisherId: "SP01",
  },
  {
    id: "B1002",
    category: "Bisnis",
    title: "Etika Bisnis dan Tanggung Jawab Sosial",
    price: 67500,
    stock: 20,
    publisherId: "SP01",
  },
  {
    id: "N1001",
    category: "Novel",
    title: "Cahaya Di Penjuru Hati",
    price: 68000,
    stock: 10,
    publisherId: "SP02",
  },
  {
    id: "N1002",
    category: "Novel",
    title: "Aku Ingin Cerita",
    price: 48000,
    stock: 10,
    publisherId: "SP03",
  },
];

const load = async () => {
  try {
    //   Insert data baru
    for (const publisher of publishers) {
      await prisma.publisher.create({
        data: publisher,
      });
    }

    for (const book of books) {
      await prisma.book.create({
        data: book,
      });
    }

    console.log("Publisher and Book have been seeded successfully!");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
