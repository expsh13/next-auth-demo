"use client";

import Link from "next/link";
import { useState } from "react";
import { customSignin } from "../lib/nextAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await customSignin(
      {
        username,
        password,
      },
      "/"
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "1rem",
        }}
      >
        <h2 style={{ textAlign: "center" }}>サインイン</h2>
        <label>
          ユーザー名:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ユーザー名を入力"
            style={{ padding: "8px", fontSize: "16px" }}
          />
        </label>
        <label>
          パスワード:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力"
            style={{ padding: "8px", fontSize: "16px" }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "#FFF",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ログイン
        </button>
      </form>
      <Link className="mt-3" href="/sign-up">
        サインアップ
      </Link>
    </div>
  );
}
