import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
    email: z.email("Email inválido"),
    password: z.string().min(8, "Senha precisa ter pelo menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type FormData = z.infer<typeof formSchema>;
