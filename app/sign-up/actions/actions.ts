"use server";
import { ZodError } from "zod";
import { prisma } from "../../lib/prisma";
import { SignUpOrSign, signUpOrSignSchema } from "@/app/schema/schema";
import { FetchError } from "@/app/types/types";

type FetchSuccess = {
  success: true;
};
type FetchResult = FetchSuccess | FetchError;

export async function signUpAction(signUp: SignUpOrSign): Promise<FetchResult> {
  try {
    const parsedSingUp = signUpOrSignSchema.parse(signUp);
    const { username, password } = parsedSingUp;

    await prisma.user.create({
      data: { name: username, password },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: "バリデーションエラー",
        details: error.flatten(),
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        success: false,
        error: "アカウントのサインアップに失敗しました",
      };
    }
  }
}
