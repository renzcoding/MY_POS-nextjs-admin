import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface customerInput {
    name: string;
    email: string;
    address: string;
    phone: string;
}



export const GET = async (req: NextRequest) => {
    try {
        const customers = await prisma.customer.findMany();
        return new NextResponse(JSON.stringify({
            customers,
            message: "Customers fetched successfully",
            status: 200
        }), { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            message: "Database Error : Error in Fetching customers",
            error: error.message
        }, { status: 500 })
    }
}


export const POST = async (req: NextRequest) => {
    const body: customerInput = await req.json()
    const { name, email, address, phone } = body;
    if (!name || !email || !address || !phone) {
        return NextResponse.json({
            error: "All field required",
            status: 404
        }, { status: 404 });
    }

    try {
        const createCustomer = await prisma.customer.create({
            data: {
                name,
                email,
                address,
                phone
            }
        })

        return NextResponse.json({
            customer: createCustomer,
            message: "Customer created successfully", status: 200
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            message: "Database Error : Error in creating customer",
            error: error.message
        }, { status: 500 })
    }
}