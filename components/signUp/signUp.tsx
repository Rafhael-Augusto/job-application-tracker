"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function SignUp() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="bg-primary text-secondary w-full max-w-md">
        <CardHeader>
          <CardTitle>Crie uma conta</CardTitle>
          <CardDescription>
            Crie uma conta para começar a acompanhar suas candidaturas.
          </CardDescription>
        </CardHeader>

        <form>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="text" placeholder="John Doe" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="John@exemplo.com" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirm-password">Confirmar Senha</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 mt-8">
            <Button variant={"secondary"} type="submit" className="w-full">
              Criar conta
            </Button>
            <p>
              Já tem uma conta?{" "}
              <Link href={"/auth/login"} className="text-cyan-600">
                Fazer Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
