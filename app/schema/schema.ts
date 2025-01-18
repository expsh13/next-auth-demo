import { z } from "zod";

export const signUpOrSignSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type SignUpOrSign = z.infer<typeof signUpOrSignSchema>;
