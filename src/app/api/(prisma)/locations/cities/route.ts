import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Country, State, City } from "country-state-city";

export const GET = async (req: NextRequest) => {
  try {
    const cities = await prisma.city.findMany();

    return NextResponse.json(
      {
        data: cities,
        message: "cities fetched successfully",
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
  const states = State.getAllStates();
  for (const state of states) {
    const cities = City.getCitiesOfState(state.isoCode, state.countryCode);

    for (const city of cities) {
      try {
        await prisma.city.create({
          data: {
            name: city.name,
            countryCode: city.countryCode,
            stateCode: city.stateCode,
            latitude: city.latitude || undefined,
            longitude: city.longitude || undefined,
            state: {
              connect: {
                isoCode: state.isoCode, // must be unique
              },
            },
          },
        });

        return NextResponse.json(
          {
            message: "cities created successfully",
            status: 200,
          },
          { status: 200 },
        );
      } catch (error) {
        console.error(`Failed to insert city ${city.name}:`, error);
      }
    }
  }
};
