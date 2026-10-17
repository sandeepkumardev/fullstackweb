import { z } from "zod";

export const registerCollegeSchema = z.object({
  collegeName: z.string().min(1, { message: "College name is required" }).min(3, { message: "College name is too short" }),
  collegeEmail: z.string().email({ message: "Invalid email" }),
  website: z.string().url({ message: "Website is invalid" }),
  phone: z.string().min(1, { message: "Phone is required" }).min(10, { message: "Phone is too short" }),
  address: z.string().min(1, { message: "Address is required" }).min(5, { message: "Address is too short" }),
  city: z.string().min(1, { message: "City is required" }).min(2, { message: "City is too short" }),
  state: z.string().min(1, { message: "State is required" }).min(2, { message: "State is too short" }),

  ownerName: z.string().min(1, { message: "Owner name is required" }).min(3, { message: "Owner name is too short" }),
  ownerEmail: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }).min(8, { message: "Password is too short" }),
  confirmPassword: z.string().min(1, { message: "Password is required" }),
});

export type RegisterCollegeTypes = z.infer<typeof registerCollegeSchema>;
