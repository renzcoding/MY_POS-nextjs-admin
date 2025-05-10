import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type CreateOrderPayload = {
  customerId: number;
  totalAmount: string;
  orderDetails: {
    productId: number;
    quantity: number;
    subtotal: string;
  }[];
  transaction: {
    paymentType: string;
    amount: string;
  }[];
};

export const GET = async (req: NextRequest) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        orderDetails: {
          include: {
            product: true,
          },
        },
        Transaction: true,
      },
    });

    return NextResponse.json(
      { orders, message: "Orders fetched successfully", status: 200 },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Database Error : Error in Fetching products",
        error: error.message,
      },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const {
    customerId,
    orderDetails = [],
    transaction = [],
    statusId,
    userId,
  } = data;

  try {
    // 🧠 Fetch product price_saless based on productIds
    const productIds = orderDetails.map((item: any) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price_sales: true, stock: true },
    });

    // ⚙️ Create orderDetails with calculated subtotals
    const enrichedOrderDetails = orderDetails.map((item: any) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product)
        throw new Error(`Product with ID ${item.productId} not found`);
      if (product.stock === 0 || product?.stock < item.quantity)
        throw new Error(`Insufficient stock for product ID ${item.productId}`);
      const subtotal = Number(product.price_sales) * item.quantity;

      return {
        productId: item.productId,
        quantity: item.quantity,
        subtotal,
      };
    });

    // 💡 Automatically calculate totalAmount from orderDetails
    const totalAmount = enrichedOrderDetails.reduce(
      (sum: number, item: any) => sum + Number(item.subtotal),
      0,
    );

    // transaction for payment and change if overpaid cash
    const transactionTotal = transaction.reduce(
      (sum: number, tx: any) => sum + Number(tx.amount),
      0,
    );

    // ✅ Auto-add change if overpaid
    const transactionsToCreate = [...transaction];
    if (transactionTotal > totalAmount) {
      transactionsToCreate.push({
        paymentType: "Change",
        amount: totalAmount - transactionTotal, // will be negative
      });
    } else if (transactionTotal < totalAmount) {
      throw new Error("Transaction amount is less than total order amount.");
    }

    // 4. Create the order with nested orderDetails and transactions
    const order = await prisma.order.create({
      data: {
        customerId,
        totalAmount,
        orderDetails: {
          /* create: orderDetails.map((detail: any) => ({
            productId: detail.productId,
            quantity: detail.quantity,
            subtotal: detail.subtotal,
          })), */
          create: enrichedOrderDetails,
        },
        Transaction: {
          create: transactionsToCreate.map((tx: any) => ({
            paymentType: tx.paymentType || "Cash",
            amount: tx.amount,
          })),
        },
        statusId,
        userId,
      },
      include: {
        orderDetails: true,
        Transaction: true,
      },
    });

    // reduce stock of products after order is created
    await Promise.all(
      enrichedOrderDetails.map(async (item: any) => {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }),
    );

    return NextResponse.json(
      {
        order,
        message: "Order created successfully",
        status: 201,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        message: "Error in creating order",
        error: error.message,
      },
      { status: 500 },
    );
  }
};
