import { colorsName } from "@/lib/mapping/colors";
import { iconsName } from "@/lib/mapping/icons";
import z from "zod";

const errorMessage = "Mínimo de 3 caracteres";

export const formSchema = z.object({
  label: z.string().min(3, errorMessage),
  icon: z.enum(iconsName, "Icone invalido"),
  color: z.enum(colorsName, "Cor invalida"),
});

export type FormData = z.infer<typeof formSchema>;
