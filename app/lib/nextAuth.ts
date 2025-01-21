import { signIn } from "next-auth/react";
import { SignUpOrSign, signUpOrSignSchema } from "../schema/schema";
import { FetchError } from "../types/types";
import { ZodError } from "zod";

type FetchSuccess = {
  success: true;
};
type FetchResult = FetchSuccess | FetchError;

export const customSignin = async (
  idPass: SignUpOrSign,
  callbackUrl: string
): Promise<FetchResult> => {
  try {
    const parsedIdPass = signUpOrSignSchema.parse(idPass);
    await signIn("credentials", {
      username: parsedIdPass.username,
      password: parsedIdPass.password,
      callbackUrl: callbackUrl,
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
      return {
        success: false,
        error: "サインインに失敗しました",
      };
    }
  }
};
