"use server";

import { FormData, formSchema } from "@/components/signUp/schema";
import { auth } from "@/lib/auth/auth";

export async function registerUser(data: FormData) {
  const validated = formSchema.parse(data);

  await auth.api.signUpEmail({
    body: {
      name: validated.name,
      email: validated.email,
      password: validated.password,
    },
  });
}
