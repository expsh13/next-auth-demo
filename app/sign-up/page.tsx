"use client";

import { useState } from "react";
import { signUpAction } from "./actions/actions";
import { customSignin } from "../lib/nextAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpOrSign, signUpOrSignSchema } from "../schema/schema";

export default function Login() {
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

    try {
      const signUpResult = await signUpAction(data);
      if (!signUpResult.success) {
        throw new Error(signUpResult.error);
      }

      const signInResult = await customSignin(data, "/");
      if (!signInResult.success) {
        throw new Error(signInResult.error);
      }
    } catch (err: any) {
      setError(err || "エラーが発生しました。");
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
      <form
        onSubmit={handleSubmit(onSubmit)}
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
          サインアップ
        </button>
      </form>

      {error && <div>{error}</div>}
    </div>
  );
}
