"use server";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const reqSchema = z.object({
  name: z.string(),
  password: z.string(),
});

type Request = z.infer<typeof reqSchema>;

export async function addUser(req: Request) {
  const parsedReq = reqSchema.parse(req);
  const { name, password } = parsedReq;

  await prisma.user.create({
    data: { name, password },
  });
}
