"use client";

import { signUpAction } from "./actions/actions";
import { useForm } from "@conform-to/react";
import { signUpOrSignSchema } from "../schema/schema";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";

export default function SignUp() {
  const [lastResult, action] = useActionState(signUpAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    // クライアントのバリデーション検証
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signUpOrSignSchema });
    },
    shouldValidate: "onInput",
  });

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
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
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
            name={fields.username.name}
          />
          {fields.username.errors && (
            <p role="alert" className="text-red-500">
              {fields.username.errors[0]}
            </p>
          )}
        </label>

        <label>
          パスワード:
          <input
            type="password"
            placeholder="パスワードを入力"
            style={{ padding: "8px", fontSize: "16px" }}
            name={fields.password.name}
          />
          {fields.password.errors && (
            <p role="alert" className="text-red-500">
              {fields.password.errors[0]}
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

      {form.errors && <div>{form.errors[0]}</div>}
    </div>
  );
}
