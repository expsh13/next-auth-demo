"use client";

import Link from "next/link";
import { customSignin } from "../lib/nextAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpOrSign, signUpOrSignSchema } from "../schema/schema";
import { useState } from "react";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpOrSign>({
    mode: "onChange",
    resolver: zodResolver(signUpOrSignSchema),
  });

  const [error, setError] = useState("");

  const onSubmit = async (data: SignUpOrSign) => {
    setError("");
    const res = await customSignin(
      {
        ...data,
      },
      "/"
    );
    if (!res.success) {
      setError(res.error);
    }
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
        onSubmit={handleSubmit(onSubmit)}
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
            placeholder="ユーザー名を入力"
            style={{ padding: "8px", fontSize: "16px" }}
            {...register("username")}
          />
          {errors.username && errors.username.message && (
            <p role="alert" className="text-red-500">
              {errors.username.message.toString()}
            </p>
          )}
        </label>

        <label>
          パスワード:
          <input
            type="password"
            placeholder="パスワードを入力"
            style={{ padding: "8px", fontSize: "16px" }}
            {...register("password")}
          />
          {errors.password && errors.password.message && (
            <p role="alert" className="text-red-500">
              {errors.password.message.toString()}
            </p>
          )}
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

      {error && <div>{error}</div>}
    </div>
  );
}
