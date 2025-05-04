import { serve } from "@hono/node-server";
import { Hono } from "hono";

const allRoutes = new Hono();

allRoutes.get("", (context) => {
  return context.json({
    message: "Hello, World",
  });
});

serve(allRoutes, ({ port }) => {
  console.log(`\t✅ Listening @ http://localhost:${port}`);
});
