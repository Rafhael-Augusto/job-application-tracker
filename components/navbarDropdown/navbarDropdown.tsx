"use client";

import { getSession } from "@/lib/auth/auth";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { signOut } from "@/lib/auth/authClient";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type SessionType = {
  session: Awaited<ReturnType<typeof getSession>>;
};

export function NavbarDropdown({ session }: SessionType) {
  const router = useRouter();

  if (!session) return;

  const handleSignOut = async () => {
    const result = await signOut();

    if (result.data) {
      router.push("/auth/login");
    } else {
      alert("Erro desconectando");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Link href={"/dashboard"}>
        <Button className="bg-secondary hover:bg-secondary/80 text-primary">
          Dashboard
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {session.user.image && <AvatarImage src={session.user.image} />}
            <AvatarFallback className="bg-secondary/10 text-secondary">
              {session.user.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-primary text-secondary">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-bold">
              Minha Conta
            </DropdownMenuLabel>
            <DropdownMenuLabel className="text-xs">
              {session.user.name}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="text-xs">
              {session.user.email}
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleSignOut()}>
              Desconectar
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
