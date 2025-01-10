import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Access Denied. Please login.</p>;
  }

  return <p>Welcome, {session.user.id}!</p>;
}
