import { prisma } from "@/app/lib/prisma";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
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
        // JWTのペイロードとして返す
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
    // JWTが作成もしくは更新されるときに呼ばれる
    async jwt({ token, user }) {
      // token: JWTのペイロード, user: 認証に成功したユーザー
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    // セッションがリクエストされるときに呼ばれる
    async session({ session, token }) {
      // session: セッション情報, token: JWTのペイロード
      session.user = {
        name: token.name,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };
