"use client";

import { signOut } from "next-auth/react";
import React from "react";

export const SignOutButton = () => {
  return (
    <button
      onClick={async () => {
        await signOut();
        window.location.href = "/"; // セッション周りでハイドレーションエラーにならないように
      }}
    >
      ログアウト
    </button>
  );
};
