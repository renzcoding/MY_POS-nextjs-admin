import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Users
  await prisma.user.createMany({
    data: [
      {
        username: "AdminOne",
        email: "admin1@example.com",
        password: "admin123",
        role: "admin",
      },
      {
        username: "CashierOne",
        email: "cashier1@example.com",
        password: "cashier123",
        role: "cashier",
      },
    ],
    skipDuplicates: true, // Optional: avoid errors if user already exists
  });

  // Suppliers
  const supplier = await prisma.supplier.create({
    data: {
      name: "Supplier A",
      email: "tests10@example.com",
      address: "Jl. Supplier A",
      phone: "081234567890",
      contact: "081234567890",
      userId: 1,
    },
  });

  // Categories
  await prisma.product_Category.createMany({
    data: [
      { name: "Food", userId: 1 },
      { name: "Drink", userId: 1 },
      { name: "Snacks", userId: 1 },
    ],
  });

  // Products
  await prisma.product.createMany({
    data: [
      {
        name: "Burger",
        price_sales: 5.99,
        price_purchase: 1.99,
        stock: 50,
        categoryId: 1,
        supplierId: supplier.id,
        userId: 1,
      },
      {
        name: "Pizza",
        price_sales: 9.99,
        price_purchase: 1.99,
        stock: 30,
        categoryId: 2,
        supplierId: supplier.id,
        userId: 1,
      },
      {
        name: "Coca Cola",
        price_sales: 1.99,
        price_purchase: 1.99,
        stock: 100,
        categoryId: 1,
        supplierId: supplier.id,
        userId: 1,
      },
      {
        name: "French Fries",
        price_sales: 2.99,
        price_purchase: 1.99,
        stock: 40,
        categoryId: 3,
        supplierId: supplier.id,
        userId: 1,
      },
    ],
  });

  // Customers
  const customer = await prisma.customer.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "Jl. Customer A",
      userId: 1,
    },
  });

  // Transactions Type
  const transactionType = await prisma.transaction_type.create({
    data: {
      name: "Income",
      description: "This is about income transaction",
      userId: 1,
    },
  });

  // Transactions Status
  const transactionStatus = await prisma.transaction_status.create({
    data: {
      name: "Completed",
      description: "This is status Completed",
      userId: 1,
    },
  });

  // Orders
  const order = await prisma.order.create({
    data: {
      customerId: customer.id,
      totalAmount: 15.97,
      orderDetails: {
        create: [
          { productId: 1, quantity: 2, subtotal: 11.98 },
          { productId: 3, quantity: 2, subtotal: 3.98 },
        ],
      },
      statusId: transactionStatus.id,
      userId: 1,
    },
  });

  // Transactions
  await prisma.transaction.create({
    data: {
      orderId: order.id,
      paymentType: "Cash",
      amount: 15.97,
      typeId: 1,
      statusId: transactionStatus.id,
    },
  });

  // Reports
  await prisma.report.create({
    data: {
      date: new Date(),
      totalSales: 1000,
      totalOrders: 10,
    },
  });

  // Analytics
  await prisma.analytics.create({
    data: {
      reportId: 1,
      trend: "Top-selling product: Pizza",
    },
  });

  console.log("✅ Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
