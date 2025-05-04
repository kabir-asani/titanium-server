import { prismaClient } from "../../integrations/prisma";
import { notFoundException } from "../../utils/types/http";
import { createSecureRoute } from "../core/route";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const postsRoute = createSecureRoute();

postsRoute.get("/latest-10", async (context) => {
  const limit = 10;

  const posts = await prismaClient.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });

  return context.json(posts);
});

postsRoute.post(
  "",
  zValidator(
    "json",
    z.object({
      text: z.string(),
    }),
  ),
  async (context) => {
    const { id: userId } = context.get("user");
    const { text } = context.req.valid("json");

    const post = await prismaClient.post.create({
      data: {
        text,
        userId,
      },
    });

    return context.json(post, 201);
  },
);

postsRoute.delete("/:postId", async (context) => {
  const { id: userId } = context.get("user");
  const { postId } = context.req.param();

  const post = await prismaClient.post.findUnique({
    where: {
      id: postId,
      userId,
    },
  });

  if (!post) {
    throw notFoundException();
  }

  await prismaClient.post.delete({ where: { id: postId } });

  return context.json(post);
});
