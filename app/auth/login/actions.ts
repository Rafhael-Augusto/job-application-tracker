"use server";

import { FormData, formSchema } from "@/components/signIn/schema";
import { auth } from "@/lib/auth/auth";

export async function signInUser(data: FormData) {
  const validated = formSchema.parse(data);

  await auth.api.signInEmail({
    body: {
      email: validated.email,
      password: validated.password,
    },
  });
}
