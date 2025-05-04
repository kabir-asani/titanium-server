import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authenticationsRoute } from "./routes/authentications";
import { postsRoute } from "./routes/posts";
import { cors } from "hono/cors";
import { webClientUrl } from "./utils/environment";
import { logger } from "hono/logger";

const allRoutes = new Hono();

allRoutes.use(logger());

allRoutes.use(
  cors({
    origin: [webClientUrl],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

allRoutes.route("/authentications", authenticationsRoute);

allRoutes.route("/posts", postsRoute);

serve(allRoutes, ({ port }) => {
  console.log(`\t✅ Listening @ http://localhost:${port}`);
});
