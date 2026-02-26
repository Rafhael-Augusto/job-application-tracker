import Link from "next/link";

import { BriefcaseIcon } from "lucide-react";

import { Button } from "../ui/button";

export function Navbar() {
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
          <Link href={"auth"}>
            <Button className="bg-secondary hover:bg-secondary/80 text-primary">
              Comece de graca
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
