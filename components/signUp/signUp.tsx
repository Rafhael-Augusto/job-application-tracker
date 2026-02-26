"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormData, formSchema } from "./schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className=" p-4 w-full max-w-md bg-secondary/5 rounded-xl  text-secondary">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Crie uma conta</FieldLegend>
              <FieldDescription>
                Crie uma conta para começar a acompanhar suas candidaturas.
              </FieldDescription>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Nome</FieldLabel>
                  <Input
                    {...register("name")}
                    autoComplete={"off"}
                    id="name"
                    type="text"
                    placeholder="John Doe"
                  />

                  {errors.name && (
                    <FieldError>{errors.name.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...register("email")}
                    autoComplete={"off"}
                    id="email"
                    type="email"
                    placeholder="John@exemplo.com"
                  />

                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    {...register("password")}
                    autoComplete={"off"}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                  />

                  {errors.password && (
                    <FieldError>{errors.password.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirmar Senha
                  </FieldLabel>
                  <Input
                    {...register("confirmPassword")}
                    autoComplete={"off"}
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                  />

                  {errors.confirmPassword && (
                    <FieldError>{errors.confirmPassword.message}</FieldError>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>

            <Field>
              <Button variant={"secondary"} type="submit" className="w-full">
                Criar conta
              </Button>
              <p>
                Já tem uma conta?{" "}
                <Link href={"/auth/login"} className="text-cyan-600">
                  Fazer Login
                </Link>
              </p>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
