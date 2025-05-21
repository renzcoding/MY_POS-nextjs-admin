import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Country, State, City } from "country-state-city";

export const GET = async (req: NextRequest) => {
  try {
    const states = await prisma.state.findMany();

    return NextResponse.json(
      {
        data: states,
        message: "states fetched successfully",
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
    const states = State.getAllStates();
    const countries = Country.getAllCountries();

    countries.map(async (country) => {
      states.map(async (state) => {
        if (state.countryCode === country.isoCode) {
          await prisma.state.create({
            data: {
              name: state.name,
              isoCode: state.isoCode,
              countryCode: country.isoCode,
              latitude: state.latitude,
              longitude: state.longitude,
            },
          });
        }
      });
    });

    return NextResponse.json(
      {
        data: states,
        message: "states created successfully",
        status: 200,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Database Error : Error in Fetching states",
        error: error.message,
        status: 500,
      },
      { status: 500 },
    );
  }
};
