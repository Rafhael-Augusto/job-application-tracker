import Link from "next/link";

import { getSession } from "@/lib/auth/auth";

import { BriefcaseIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { NavbarDropdown } from "../navbarDropdown/navbarDropdown";
import { Suspense } from "react";

export async function NavbarPage() {
  const session = await getSession();

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
            <NavbarDropdown session={session} />
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

export async function Navbar() {
  return (
    <Suspense fallback={<p>loading</p>}>
      <NavbarPage />
    </Suspense>
  );
}
