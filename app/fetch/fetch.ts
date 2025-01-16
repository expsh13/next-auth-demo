import "server-only";
import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
});

type User = z.infer<typeof UserSchema>;

export const getUsers = async (): Promise<User[]> => {
  // TODO: セッション確認
  const response = await fetch(`${process.env.SERVER_URL}/api/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  const parsedUsers = z.array(UserSchema).parse(data);

  return parsedUsers;
};
