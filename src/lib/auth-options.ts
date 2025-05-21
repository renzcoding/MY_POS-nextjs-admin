import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CreadentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import { AuthOptions } from "next-auth";
import { generateToken } from "@/utlils/jwt";
import { hash } from "bcrypt";

export const authOptions: AuthOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),

    CreadentialProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials provided");

        const { email, password } = credentials;

        // const user: any = await prisma.user.findUnique({
        //   where: { email: credentials?.email },
        // });

        const user: any = await prisma.user.findUnique({
          where: { email },
        });
        if (!user || !user.password)
          throw new Error("Invalid email or password");

        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) throw new Error("password does not match");

        const token = await generateToken(user);
        user.accessToken = token;

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour (in seconds)
  },
  jwt: {
    maxAge: 60 * 60, // 1 hour for token expiry too
  },
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account && user) {
        console.log("Provider used:", account.provider);
        token.id = user.id;
        token.role = user.role;

        if (account.provider === "google") {
          // check existing users
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
          if (existingUser) {
            token.id = existingUser.id;
            token.role = existingUser.role;
          }

          if (!existingUser) {
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                username: user.name,
                image: user.image,
                role: "admin",
                password: await hash("password", 10),
              },
            });
            token.id = newUser.id;
            token.role = newUser.role;
          }

          // If you want to fetch or generate a token, do it here
          token.accessToken = account.access_token; // from Google OAuth
        } else if (account.provider === "credentials") {
          // You can set a custom token generated in authorize()
          token.accessToken = user.accessToken || "custom-access-token";
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      // Attach your custom fields from `token` to `session`
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.accessToken = token.accessToken; // ← now usable in frontend
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error", // 👈 custom error page
    signOut: "/auth/signout",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/welcome",
  },
};
