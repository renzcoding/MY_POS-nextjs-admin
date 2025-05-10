import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, context: { params: any }) => {
    const { id } = await context.params;
    const body = await req.json()
    try {
        // check customer by id
        const customer = await prisma.customer.findUnique({
            where: { id: Number(id) }
        })
        if (!customer) return NextResponse.json({ message: "Customer not found", status: 404 }, { status: 404 });

        const updateCustomer = await prisma.customer.update({
            where: { id: Number(id) },
            data: body
        });

        return NextResponse.json({
            customer: updateCustomer,
            message: "Customer updated successfully",
            status: 201
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({
            message: "Database Error : Error in updating customer",
            error: error.message
        }, { status: 500 });
    }
}


export const DELETE = async (req: NextRequest, context: { params: any }) => {
    const { id } = await context.params;
    try {
        // check customer by id
        const customer = await prisma.customer.findUnique({
            where: { id: Number(id) }
        })
        if (!customer) return NextResponse.json({ message: "Customer not found", status: 404 }, { status: 404 });

        const deleteCustomer = await prisma.customer.delete({
            where: { id: Number(id) }
        });

        return NextResponse.json({
            message: "Customer deleted successfully",
            customer: deleteCustomer,
            status: 200
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            message: "Database Error : Error in deleting customer",
            error: error.message
        }, { status: 500 });
    }
}