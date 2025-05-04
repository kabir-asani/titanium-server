import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { authenticationsRoute } from "./routes/authentications";

const allRoutes = new Hono();

allRoutes.route("/authentications", authenticationsRoute);

serve(allRoutes, ({ port }) => {
  console.log(`\t✅ Listening @ http://localhost:${port}`);
});
