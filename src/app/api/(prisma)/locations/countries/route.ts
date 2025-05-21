import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Country, State, City } from "country-state-city";

export const GET = async (req: NextRequest) => {
  try {
    const countries = await prisma.country.findMany();

    return NextResponse.json(
      {
        data: countries,
        message: "Countries fetched successfully",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in Fetching countries",
        error: error.message,
        status: 500,
      },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const countries = Country.getAllCountries();
    setTimeout(() => {
      countries.map(async (country) => {
        await prisma.country.create({
          data: {
            name: country.name,
            isoCode: country.isoCode,
            phonecode: country.phonecode,
            currency: country.currency,
            flag: country.flag,
            latitude: country.latitude,
            longitude: country.longitude,
          },
        });
      });
    }, 5000);
    console.log("Countries inserted successfully");

    return NextResponse.json(
      {
        data: countries,
        message: "Countries created successfully",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in Fetching countries",
        error: error.message,
        status: 500,
      },
      { status: 500 },
    );
  }
};
