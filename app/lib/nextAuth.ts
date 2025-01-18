import { signIn } from "next-auth/react";
import { SignUpOrSign, signUpOrSignSchema } from "../schema/schema";

export const customSignin = async (
  idPass: SignUpOrSign,
  callbackUrl: string
) => {
  try {
    const parsedIdPass = signUpOrSignSchema.parse(idPass);
    console.log(parsedIdPass);
    await signIn("credentials", {
      username: parsedIdPass.username,
      password: parsedIdPass.password,
      callbackUrl: callbackUrl,
    });
  } catch (error) {
    console.error("Error signing in:", error);
    return { success: false, error: "Failed to sign in" };
  }
};
