"use server";
import { prisma } from "../../lib/prisma";
import { signUpOrSignSchema } from "@/app/schema/schema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function signUpAction(prev: unknown, formData: FormData) {
  debugger;
  const submission = parseWithZod(formData, { schema: signUpOrSignSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    const { username, password } = submission.value;
    const existingUser = await prisma.user.findUnique({
      where: { name: username },
    });
    if (existingUser) {
      return submission.reply({
        formErrors: ["このユーザー名は既に使用されています"],
      });
    }
    await prisma.user.create({
      data: { name: username, password },
    });
  } catch (e) {
    console.error(e);
    return submission.reply({
      formErrors: ["アカウントのサインアップに失敗しました"],
    });
  }
  redirect("/sign-in");
}
