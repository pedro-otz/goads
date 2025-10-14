import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Password is required!",
    path: ["password"]
  })

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const CreateEventSchema = z.object({
  title: z.string().min(6, {
    message: "O título precisa ter no mínimo 6 caracteres",
  }),
  description: z.string().min(10, {
    message: "A descrição precisa ter no mínimo 10 caracteres",
  }),
  location: z.string().min(3, {
    message: "A localização precisa ter no mínimo 3 caracteres",
  }),
  date: z.date(),
  categoryId: z.string(),
  coverEventImageUrl: z.string().optional(),
  maxParticipants: z.number(),
  price: z.number().optional(),
  isFree: z.boolean().default(false),
  isOnline: z.boolean().default(false),
  creatorId: z.string().optional(),
});

export const UpdateEventSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  date: z
    .union([z.string(), z.date()])
    .optional()
    .transform((value) => (typeof value === "string" ? new Date(value) : value)),
  categoryId: z.string().optional(),
  coverEventImageUrl: z.string().optional(),
  maxParticipants: z.number().optional(),
  price: z.number().optional(),
  isFree: z.boolean().default(false).optional(),
  isOnline: z.boolean().default(false).optional(),
  creatorId: z.string().optional(),
});

export const CreateTicketSchema = z.object({
  price: z.number().default(0.0),
  eventId: z.string(),
  userId: z.string(),
  name: z.string(),
  email: z.string(),
})