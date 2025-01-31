"server-only";

import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// ミドルウェアが使用できない時用の関数
export const verifySession = async () => {
  // クッキーからセッションを取得
  const session = await getServerSession(authOptions);

  // ユーザー認証されていない場合は/loginにリダイレクト
  if (!session) {
    redirect("/sign-in");
  }
};
