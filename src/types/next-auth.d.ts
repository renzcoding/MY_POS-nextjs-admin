// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // ✅ Add your custom field here
    };
  }

  interface User {
    id: string;
    role?: string;
  }

  interface JWT {
    id?: string;
    role?: string;
  }
}
