import { ZodError } from "zod";

export type FetchError = {
  success: false;
  error: string;
  details?: ReturnType<ZodError["flatten"]>;
};
