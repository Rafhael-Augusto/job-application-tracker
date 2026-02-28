import z from "zod";

const errorMessage = "Mínimo de 2 caracteres";

export const formSchema = z.object({
  position: z.string().min(2, errorMessage),
  company: z.string().min(2, errorMessage),

  location: z.string().min(2, errorMessage).or(z.literal("")),
  salary: z.string().min(2, errorMessage).or(z.literal("")),
  jobUrl: z.string().min(2, errorMessage).or(z.literal("")),
  tags: z.string().min(2, errorMessage).or(z.literal("")),

  description: z.string(),
  notes: z.string(),
});

export type FormData = z.infer<typeof formSchema>;
