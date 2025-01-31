import "server-only";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { cache } from "react";

const UserSchema = z.object({
  name: z.string(),
});

type User = z.infer<typeof UserSchema>;

const getUsers = async (): Promise<User[]> => {
  const response = await prisma.user.findMany({
    select: {
      name: true, // nameのみ取得
    },
  });
  if (!response) {
    throw new Error("Failed to fetch users");
  }

  const parsedUsers = z.array(UserSchema).parse(response);

  return parsedUsers;
};

export const cacheGetUsers = cache(getUsers);
