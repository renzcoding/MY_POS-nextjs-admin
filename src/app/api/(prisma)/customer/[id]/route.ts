import prisma from "@/lib/prisma";
import { getCurrentSegment } from "@/utlils/globalFunctions";
import { NextRequest, NextResponse } from "next/server";
const currentSegment = "customer";
export const GET = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  try {
    // check customer by id
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
    });
    if (!customer)
      return NextResponse.json(
        { message: `${currentSegment} not found`, status: 404 },
        { status: 404 },
      );

    return NextResponse.json(
      {
        customer: customer,
        message: `Data ${currentSegment} fetched successfully`,
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Database Error : Error in Fetching ${currentSegment}`,
        error: error.message,
      },
      { status: 500 },
    );
  }
};

export const PATCH = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  const body = await req.json();
  const { firstname, lastname, email, address, mobile } = body;

  try {
    // check customer by id
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
    });

    if (!customer)
      return NextResponse.json(
        { message: `${currentSegment} not found`, status: 404 },
        { status: 404 },
      );

    const updatecustomer = await prisma.customer.update({
      where: { id: Number(id) },
      data: {
        firstname,
        lastname,
        email,
        address,
        mobile,
      },
    });

    return NextResponse.json(
      {
        customer: updatecustomer,
        message: `Data ${currentSegment} updated successfully`,
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Database Error : Error in Updatoing ${currentSegment}`,
        error: error.message,
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: NextRequest, context: { params: any }) => {
  const { id } = await context.params;
  try {
    // check customer by id
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
    });

    if (!customer)
      return NextResponse.json(
        { message: `${currentSegment} not found`, status: 404 },
        { status: 404 },
      );

    const deletecustomer = await prisma.customer.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      {
        message: `Data ${getCurrentSegment} deleted successfully`,
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Database Error : Error in Deleting ${currentSegment}`,
        error: error.message,
      },
      { status: 500 },
    );
  }
};
