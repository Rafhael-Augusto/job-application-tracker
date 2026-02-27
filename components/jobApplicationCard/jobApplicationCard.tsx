import { Prisma } from "@/app/generated/prisma/client";

import {
  Edit2Icon,
  ExternalLinkIcon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  job: Prisma.JobApplicationGetPayload<{}>;
  columns: Prisma.ColumnGetPayload<{}>[];
};

export function JobApplicationCard({ job, columns }: Props) {
  return (
    <Card className="bg-secondary/5 border-0 text-secondary">
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="font-bold text-xl">{job.position}</h3>
              <p className="text-muted-foreground">{job.company}</p>
            </div>
            {job.description && (
              <p className="text-muted-foreground">{job.description}</p>
            )}

            {job.tags && job.tags.length > 0 && (
              <div className="flex items-center gap-4">
                {job.tags.map((tag, key) => (
                  <span
                    key={key}
                    className="py-1 px-2 bg-primary/40 text-secondary rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {job.jobUrl && (
              <a
                target="_blank"
                href={job.jobUrl}
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLinkIcon />
              </a>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}>
                  <MoreVerticalIcon />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-primary text-secondary"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Edit2Icon />
                    Editar
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {columns.length > 1 && (
                  <>
                    <DropdownMenuGroup>
                      {columns
                        .filter((col) => col.id !== job.columnId)
                        .map((column) => (
                          <DropdownMenuItem key={column.id}>
                            Mover para {column.name}
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                  </>
                )}

                <DropdownMenuGroup>
                  <DropdownMenuItem className="hover:text-destructive">
                    <TrashIcon />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
