// Designed by Christiana

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const artisan1 = await prisma.user.create({
    data: {
      email: "woodartisan@example.com",
      name: "Daniel Woodcraft",
      role: "artisan",
    },
  });

  const artisan2 = await prisma.user.create({
    data: {
      email: "jewelryartisan@example.com",
      name: "Grace Jewelry",
      role: "artisan",
    },
  });

  const artisan3 = await prisma.user.create({
    data: {
      email: "potteryartisan@example.com",
      name: "Michael Pottery",
      role: "artisan",
    },
  });

  const product1 = await prisma.product.create({
    data: {
      title: "Handmade Wooden Chair",
      price: 15000,
      category: "Woodwork",
      availability: "In Stock",
      description: "Durable handcrafted wooden chair",
      artisanId: artisan1.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      title: "Wooden Table",
      price: 25000,
      category: "Woodwork",
      availability: "Custom Order",
      description: "Polished wooden dining table",
      artisanId: artisan1.id,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      title: "Gold Necklace",
      price: 12000,
      category: "Jewelry",
      availability: "In Stock",
      description: "Elegant handcrafted necklace",
      artisanId: artisan2.id,
    },
  });

  const product4 = await prisma.product.create({
    data: {
      title: "Silver Bracelet",
      price: 8000,
      category: "Jewelry",
      availability: "Custom Order",
      description: "Beautiful silver bracelet",
      artisanId: artisan2.id,
    },
  });

  const product5 = await prisma.product.create({
    data: {
      title: "Clay Flower Vase",
      price: 10000,
      category: "Pottery",
      availability: "In Stock",
      description: "Decorative handmade vase",
      artisanId: artisan3.id,
    },
  });

  const product6 = await prisma.product.create({
    data: {
      title: "Ceramic Bowl",
      price: 7000,
      category: "Pottery",
      availability: "In Stock",
      description: "Smooth ceramic serving bowl",
      artisanId: artisan3.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: "Amazing craftsmanship!",
      productId: product1.id,
      customerId: artisan2.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      comment: "Very beautiful product.",
      productId: product3.id,
      customerId: artisan3.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: "Excellent quality pottery.",
      productId: product5.id,
      customerId: artisan1.id,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });