import cleanBodyPost from "@/lib/cleanBodyPost";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// helper for get table name
const getTableFromSegment = (segment: string[] | undefined): string | null => {
  if (!segment || segment.length === 0) return null;

  const allowedSegments = [
    "category",
    "condition",
    "size",
    "type",
    "unit", // Kg, L, cm
    "weight", // Kg
    "variant", // Color, Material, Gender
    "volume", // L, cm
    "measurement", // Kg, L, cm
    "brand", // Adidas, Nike, Puma
    "color", // Black, White
    "material", // Cotton, Polyester, Denim
    "gender", // Male, Female
    "warehouse", // Warehouse 1, Warehouse 2
    "collection", // Collection 1, Collection 2
    "branch", // Branch 1, Branch 2
  ];
  if (!allowedSegments.includes(segment[0])) {
    return null;
  }

  const firstLetterSegment =
    segment[0].charAt(0).toUpperCase() + segment[0].slice(1);

  const table = `product_${firstLetterSegment}`;
  console.log(table);
  const allowedTables = [
    "product_Category", // Clothing, Shoes, Accessories
    "product_Condition", // New, Used
    "product_Size", // XS, S, M
    "product_Type", // Good, service, combo
    "product_Unit", // Kg, L, cm
    "product_Weight", // Kg
    "product_Variant", // Color, Material, Gender
    "product_Volume", // L, cm
    "product_measurement", // Kg, L, cm
    "product_Brand", // Adidas, Nike, Puma
    "product_Color", // Black, White
    "product_Material", // Cotton, Polyester, Denim
    "product_Gender", // Male, Female
    "product_Warehouse", // Warehouse 1, Warehouse 2
    "product_Collection", // Collection 1, Collection 2
    "product_Branch", // Branch 1, Branch 2
  ];
  if (!allowedTables.includes(table)) {
    return null;
  }

  return table;
};

// GET all data
export const GET = async (
  req: NextRequest,
  { params }: { params: { segment?: string[] } },
) => {
  const { segment } = await params; // ✅ TANPA await
  const table = getTableFromSegment(segment);

  if (!table)
    return NextResponse.json({ error: "Table not found" }, { status: 400 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  const showAll = searchParams.get("showAll") === "true";
  const name = searchParams.get("name");
  const status = searchParams.get("status");
  const email = searchParams.get("email");
  const orderBy = searchParams.get("orderBy");
  const orderDirection = searchParams.get("orderDirection");
  const whereConditions: string[] = [];
  const queryParams: any[] = [];

  if (name) {
    whereConditions.push(`name LIKE ?`);
    queryParams.push(`%${name}%`);
  }
  if (email) {
    whereConditions.push(`email LIKE ?`);
    queryParams.push(`%${email}%`);
  }
  if (status) {
    whereConditions.push(`status = ?`);
    queryParams.push(status);
  }
  const whereClause =
    whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";
  const orderClause = orderBy
    ? `ORDER BY ${orderBy} ${orderDirection === "desc" ? "DESC" : "ASC"}`
    : "";

  try {
    const query = `
      SELECT 
        id, 
        name, 
        description, 
        userId, 
        DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt,
        DATE_FORMAT(updatedAt, '%Y-%m-%d %H:%i:%s') as updatedAt
      FROM ${table}
      ${whereClause}
      ${orderClause}
      LIMIT ? OFFSET ?
    `;
    queryParams.push(limit, skip);
    const data: any = await prisma.$queryRawUnsafe(query, ...queryParams);
    const total = data.length;

    // console.log("Result:", result);
    return NextResponse.json(
      {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        message: `Success fetching products ${segment?.length ? segment[0] : ""} data`,
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database cannot fatching Query failed",
        details: error,
        error: error.message,
        status: 500,
      },
      { status: 500 },
    );
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { segment?: string[] } },
) => {
  const { method } = await req;
  if (method !== "POST")
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });

  const table = getTableFromSegment(params?.segment);
  if (!table)
    return NextResponse.json({ error: "Table not found" }, { status: 400 });

  const body = await req.json();
  const cleanBody = cleanBodyPost(body);
  const keys = Object.keys(cleanBody).join(", ");
  const values = Object.values(cleanBody)
    .map((v) => `'${v}'`)
    .join(", ");
  try {
    const result = await prisma.$executeRawUnsafe(
      `INSERT INTO \`${table}\` (${keys}) VALUES (${values})`,
    );
    return NextResponse.json(
      {
        result,
        success: true,
        message: "Data has success created",
        status: 201,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in creating data",
        error: error.message,
        status: 500,
      },
      { status: 500 },
    );
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { segment?: string[] } },
) => {
  const { method } = await req;
  if (method !== "PATCH")
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });

  const { segment } = await params;
  if (!segment || segment.length === 0)
    return NextResponse.json({ error: "Segment not found" }, { status: 400 });

  const id = parseInt(segment[1]);
  const body = await req.json();
  const { name, description, userId } = body;
  const table = getTableFromSegment(segment);
  if (!table)
    return NextResponse.json({ error: "Table not found" }, { status: 400 });

  try {
    const existingData = await prisma.$queryRawUnsafe(
      `SELECT 
        id, 
        name, 
        description, 
        userId, 
        DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt,
        DATE_FORMAT(updatedAt, '%Y-%m-%d %H:%i:%s') as updatedAt 
        FROM ${table} WHERE id = ${id}`,
    );

    if (!existingData)
      return NextResponse.json(
        { message: "Data not found", status: 404 },
        { status: 404 },
      );

    // const update = await prisma.$executeRawUnsafe(
    //   `UPDATE ${table} SET name = '${name}', description = '${description}', userId = ${userId} WHERE id = ${id}`,
    // );

    const result = await prisma.$executeRawUnsafe(
      `UPDATE ${table} SET name = ?, description = ?, userId = ?  WHERE id = ?`,
      name,
      description,
      userId,
      id,
    );

    return NextResponse.json(
      {
        result,
        success: true,
        message: `Data ${segment.length ? segment[0] : ""} with id ${id} has success updated`,
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in updating data",
        error: error.message,
        status: 500,
      },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { segment?: string[] } },
) => {
  const { method } = await req;
  if (method !== "DELETE")
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });

  const { segment } = await params;
  if (!segment || segment.length === 0)
    return NextResponse.json({ error: "Segment not found" }, { status: 400 });

  const id = parseInt(segment[1]);
  const table = getTableFromSegment(segment);
  if (!table)
    return NextResponse.json({ error: "Table not found" }, { status: 400 });

  try {
    const existingData = await prisma.$queryRawUnsafe(
      `SELECT 
        id, 
        name, 
        description, 
        userId, 
        DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') as createdAt,
        DATE_FORMAT(updatedAt, '%Y-%m-%d %H:%i:%s') as updatedAt 
        FROM ${table} WHERE id = ${id}`,
    );

    if (!existingData)
      return NextResponse.json(
        { message: "Data not found", status: 404 },
        { status: 404 },
      );

    const result = await prisma.$executeRawUnsafe(
      `DELETE FROM ${table} WHERE id = ${id}`,
    );

    return NextResponse.json(
      {
        result,
        success: true,
        message: `Data ${segment.length ? segment[0] : ""} with id ${id} has success deleted`,
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in deleting data",
        error: error.message,
        status: 500,
      },
      { status: 500 },
    );
  }
};
