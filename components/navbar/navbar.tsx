"use client";

import Link from "next/link";

import { signOut, useSession } from "@/lib/auth/authClient";

import { BriefcaseIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";

export function Navbar() {
  const { data: session } = useSession();

  const router = useRouter();

  const handleSignOut = async () => {
    const result = await signOut();

    if (result.data) {
      router.push("/auth/login");
    } else {
      alert("Erro desconectando");
    }
  };

  return (
    <nav className="border-b border-secondary/5 bg-primary">
      <div className="container mx-auto flex justify-between h-16 items-center px-4">
        <Link
          href={"/"}
          className="flex items-center gap-2 text-xl font-semibold text-secondary"
        >
          <BriefcaseIcon />
          Job Tracker
        </Link>

        <div>
          {session?.user ? (
            <div className="flex items-center gap-4">
              <Link href={"/dashboard"}>
                <Button className="bg-secondary hover:bg-secondary/80 text-primary">
                  Dashboard
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    {session.user.image && (
                      <AvatarImage src={session.user.image} />
                    )}
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
                    <DropdownMenuItem>{session.user.name}</DropdownMenuItem>
                    <DropdownMenuItem>{session.user.email}</DropdownMenuItem>
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
          ) : (
            <Link href={"/auth/register"}>
              <Button className="bg-secondary hover:bg-secondary/80 text-primary">
                Comece de graça
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
