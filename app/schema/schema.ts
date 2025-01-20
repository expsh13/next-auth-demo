import { z } from "zod";

export const signUpOrSignSchema = z.object({
  username: z
    .string()
    .nonempty("名前を入力してください。")
    .min(2, "2文字以上で入力してください。"),
  password: z
    .string()
    .nonempty("パスワードを入力してください。")
    .min(2, "2文字以上で入力してください。"),
});

export type SignUpOrSign = z.infer<typeof signUpOrSignSchema>;
