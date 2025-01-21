import "server-only";
import { z, ZodError } from "zod";
import { prisma } from "../lib/prisma";
import { FetchError } from "../types/types";

const UserSchema = z.object({
  name: z.string(),
});

type User = z.infer<typeof UserSchema>;

export type FetchResult = User[] | FetchError;

export const getUsers = async (): Promise<FetchResult> => {
  try {
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
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: "バリデーションエラー",
        details: error.flatten(),
      };
    } else {
      return {
        success: false,
        error: "データの取得に失敗しました",
      };
    }
  }
};
