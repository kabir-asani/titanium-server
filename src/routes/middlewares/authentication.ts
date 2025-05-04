import type { Session, User } from "better-auth";
import { createMiddleware } from "hono/factory";
import { betterAuthClient } from "../../integrations/better-auth";
import { unauthorizedException, type SecureSession } from "../../utils/types/http";

export const authenticationMiddleware = createMiddleware<SecureSession>(async (context, next) => {
  const session = await betterAuthClient.api.getSession({ headers: context.req.raw.headers });

  if (!session) {
    throw unauthorizedException();
  }

  context.set("user", session.user as User);
  context.set("session", session.session as Session);

  return await next();
});
