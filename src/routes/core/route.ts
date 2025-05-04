import type { Session, User } from "better-auth";
import { Hono } from "hono";
import { authenticationMiddleware } from "../middlewares/authentication";
import type { SecureSession } from "../../utils/types/http";

export const createUnsecureRoute = (): Hono => {
  const route = new Hono();

  return route;
};

export const createSecureRoute = (): Hono<SecureSession> => {
  const route = new Hono<SecureSession>();

  route.use(authenticationMiddleware);

  return route;
};
