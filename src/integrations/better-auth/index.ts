import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaClient } from "../prisma";
import { serverUrl, webClientUrl } from "../../utils/environment";

export const betterAuthClient = betterAuth({
  baseURL: serverUrl,
  basePath: "/authentications",
  database: prismaAdapter(prismaClient, {
    provider: "postgresql",
  }),
  trustedOrigins: [serverUrl, webClientUrl],
  advanced: {
    defaultCookieAttributes: {
      secure: true,
      sameSite: "none",
      httpOnly: true,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "User",
  },
  account: {
    modelName: "Account",
  },
  session: {
    modelName: "Session",
    cookieCache: {
      enabled: true,
      maxAge: 15 * 60,
    },
  },
  verification: {
    modelName: "Verification",
  },
});
