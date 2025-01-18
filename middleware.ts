import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// 1. 保護されたルートと公開ルートを指定
const protectedRoutes = ["/"];

export default async function middleware(req: NextRequest) {
  // 2. 現在のルートが保護されているか公開されているか
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  // 3. クッキーからJWTを取得
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  // 4. ユーザー認証されていない場合は/loginにリダイレクト
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  return NextResponse.next();
}

// ミドルウェアで実行されるべきでないルート
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
