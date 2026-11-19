import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email" }),
  password: z.string().trim().min(1, { message: "Password is required" }).min(8, { message: "Password is too short" }),
});

export type ISignInData = z.infer<typeof signInSchema>;
