import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authenticationsRoute } from "./routes/authentications";
import { postsRoute } from "./routes/posts";

const allRoutes = new Hono();

allRoutes.route("/authentications", authenticationsRoute);

allRoutes.route("/posts", postsRoute);

serve(allRoutes, ({ port }) => {
  console.log(`\t✅ Listening @ http://localhost:${port}`);
});
