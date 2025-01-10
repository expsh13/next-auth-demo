import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials || {};

        // 外部認証テーブルを参照するAPIコール
        const res = await fetch("https://example.com/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user; // 認証成功時、ユーザー情報を返す
        }

        return null; // 認証失敗時はnullを返す
      },
    }),
  ],
  session: {
    strategy: "jwt" as const, // ステートレスセッション管理
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      // 認証成功時にJWTに追加情報を付加
      if (user) {
        token.id = user.id;
        token.role = user.role; // 必要なら追加情報も
      }
      return token;
    },
    async session({ session, token }) {
      // セッションデータにJWT情報を反映
      session.user = {
        id: token.id,
        role: token.role,
      };
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
