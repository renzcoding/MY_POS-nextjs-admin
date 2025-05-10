import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: {
        orderDetails: {
          include: {
            product: true,
          },
        },
        Transaction: true,
        customer: true,
      },
    });
    if (!order)
      return NextResponse.json(
        { message: "Order not found", status: 404 },
        { status: 404 },
      );

    return NextResponse.json(
      {
        order: order,
        message: "Order found",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, status: 500 },
      { status: 500 },
    );
  }
};

export const PATCH = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  const data = await req.json();

  try {
    const { customerId, orderDetails = [], transaction = [] } = data;

    const totalAmount = orderDetails.reduce(
      (sum: number, item: any) => sum + Number(item.subtotal),
      0,
    );

    // Delete existing orderDetails and transactions (simplest strategy)
    await prisma.orderDetail.deleteMany({ where: { orderId: Number(id) } });
    await prisma.transaction.deleteMany({ where: { orderId: Number(id) } });

    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        customerId,
        totalAmount,
        orderDetails: {
          create: orderDetails.map((detail: any) => ({
            productId: detail.productId,
            quantity: detail.quantity,
            subtotal: detail.subtotal,
          })),
        },
        Transaction: {
          create: transaction.map((tx: any) => ({
            paymentType: tx.paymentType,
            amount: tx.amount,
          })),
        },
      },
      include: {
        orderDetails: true,
        Transaction: true,
      },
    });

    return NextResponse.json(
      {
        order: updatedOrder,
        message: "Order updated",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in updating order",
        error: error.message,
        status: 500,
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  try {
    await prisma.orderDetail.deleteMany({ where: { id: Number(id) } });
    await prisma.transaction.deleteMany({ where: { id: Number(id) } });
    const deleteOrder = await prisma.order.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      {
        order: deleteOrder,
        message: "Order deleted",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in deleting order",
        error: error.message,
        status: 500,
      },
      { status: 500 },
    );
  }
};
