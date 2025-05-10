"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET || "secret";

// Generate JWT Token
export const generateToken = async (payload: object) => {
  const token = await jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

// Verify JWT Token
export const verifyToken = async (token: string) => {
  console.log("verify token", token);
  try {
    const decoded = await jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserFromCookies = async () => {
  const cookiesStore = cookies();
  const token = (await cookiesStore).get("auth-token")?.value;

  if (!token) return null;

  const user = verifyToken(token);
  return user;
};
