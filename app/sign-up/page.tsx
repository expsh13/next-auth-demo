"use client";

import { useState } from "react";
import { signUpAction } from "./actions/actions";
import { customSignin } from "../lib/nextAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const signUpResult = await signUpAction({ username, password });
      if (!signUpResult.success) {
        throw new Error(signUpResult.error);
      }

      const signInResult = await customSignin({ username, password }, "/");
      if (!signInResult.success) {
        throw new Error(signInResult.error);
      }

      // 成功時の処理を追加（例: 成功メッセージの表示など）
    } catch (err: any) {
      setError(err.message || "エラーが発生しました。");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* TODO: actionsに変更 */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "1rem",
        }}
      >
        <h2 style={{ textAlign: "center" }}>サインアップ</h2>
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
          サインアップ
        </button>
      </form>

      {error && <div>{error}</div>}
    </div>
  );
}
