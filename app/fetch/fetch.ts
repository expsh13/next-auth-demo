import "server-only";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const UserSchema = z.object({
  name: z.string(),
});

type User = z.infer<typeof UserSchema>;

export const getUsers = async (): Promise<User[]> => {
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
