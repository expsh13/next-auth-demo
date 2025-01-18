import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { SignOutButton } from "./SignOutButton";

export const Navigation = async () => {
  const session = await getServerSession();
  const userName = session?.user?.name;
  return (
    <header>
      {userName ? (
        <>
          <div>{`${userName}さんログイン中`}</div>
          <SignOutButton />
        </>
      ) : (
        <Link href={"/sign-in"}>ログイン</Link>
      )}
    </header>
  );
};
