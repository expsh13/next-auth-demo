import { prisma } from "@/app/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // サイインページでのフォーム生成のために使用
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // 認証
      // credentialsで定義したフォームの値がcredentialsに渡される
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials not provided");
        }
        const { username, password } = credentials;
        const user = await prisma.user.findUnique({
          where: { name: username },
        });
        if (!user) {
          throw new Error("User not found");
        }

        // パスワード検証
        const isValid = password === user.password;
        if (!isValid) {
          throw new Error("Invalid password");
        }
        // ここで返したオブジェクトが下の jwtコールバックに渡される
        return { id: user.id.toString(), name: user.name };
      },
    }),
  ],
  session: {
    strategy: "jwt", // トークンベースのセッション管理
    maxAge: 30, // 30秒間のセッション
  },
  jwt: {
    secret: process.env.AUTH_SECRET,
  },
  callbacks: {
    /**
     * JWTコールバック
     * NextAuthが「JWTを生成 or 更新」するときに呼ばれるフック
     * - `user`: ログイン時に authorize から返ってきたユーザーデータ
     * - `token`: 前回のトークンペイロード。新規ログイン時は空オブジェクト
     * - `trigger`: "update" などが入る場合があり、セッション更新の契機を判定できる (v4.13+)
     */
    async jwt({ token, user }) {
      // token: JWTのペイロード, user: 認証に成功したユーザー
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },

    /**
     * セッションコールバック
     * - フロントエンドの useSession から参照できるオブジェクトをカスタマイズ
     */
    async session({ session, token }) {
      // session: セッション情報, token: JWTのペイロード
      session.user = {
        name: token.name,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
