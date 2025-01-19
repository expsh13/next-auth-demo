"use server";
import { prisma } from "../../lib/prisma";
import { SignUpOrSign, signUpOrSignSchema } from "@/app/schema/schema";

export async function signUpAction(signUp: SignUpOrSign) {
  try {
    const parsedSingUp = signUpOrSignSchema.parse(signUp);
    const { username, password } = parsedSingUp;

    await prisma.user.create({
      data: { name: username, password },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user" };
  }
}
