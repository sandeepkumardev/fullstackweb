import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const logoSchema = z
  .instanceof(File, { message: "File is required" })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Max file size is 5MB",
  })
  .refine((file) => ["image/png", "image/svg+xml", "image/jpeg"].includes(file.type), {
    message: "File type must be PNG, SVG, or JPEG",
  });

const idProofSchema = z
  .instanceof(File, { message: "File is required" })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Max file size is 5MB",
  })
  .refine((file) => ["application/pdf", "application/msword", "image/png", "image/jpeg"].includes(file.type), {
    message: "File type must be PDF, Word, PNG, or JPEG",
  });

export const registerCollegeSchema = z
  .object({
    collegeName: z
      .string()
      .trim()
      .min(1, { message: "College name is required" })
      .min(3, { message: "College name is too short" }),
    collegeEmail: z.string().trim().email({ message: "Invalid email" }),
    website: z.string().trim().url({ message: "Website is invalid" }),
    phone: z.string().trim().min(1, { message: "Phone is required" }).min(10, { message: "Phone is too short" }),
    address: z.string().trim().min(1, { message: "Address is required" }).min(5, { message: "Address is too short" }),
    city: z.string().trim().min(1, { message: "City is required" }).min(2, { message: "City is too short" }),
    state: z.string().trim().min(1, { message: "State is required" }).min(2, { message: "State is too short" }),

    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner name is required" })
      .min(3, { message: "Owner name is too short" }),
    ownerEmail: z.string().trim().email({ message: "Invalid email" }),
    password: z.string().trim().min(1, { message: "Password is required" }).min(8, { message: "Password is too short" }),
    confirmPassword: z.string().trim().min(1, { message: "Password is required" }),

    collegeLogo: logoSchema,
    collegeIDProof: idProofSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterCollegeTypes = z.infer<typeof registerCollegeSchema>;
