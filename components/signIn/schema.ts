import { z } from "zod";

export const formSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(8, "Senha precisa ter pelo menos 8 caracteres"),
});
export type FormData = z.infer<typeof formSchema>;
