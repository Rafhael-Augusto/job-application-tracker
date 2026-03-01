"use client";

import { HTMLAttributes, useState } from "react";

import { JobApplication, Column } from "@/app/generated/prisma/client";

import {
  deleteJobApplication,
  updateJobApplication,
} from "@/lib/actions/jobApplications";

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

import { JobDialogForm } from "@/components/jobDialogForm/jobDialogForm";

type Props = {
  job: JobApplication;
  columns: Column[];
  dragHandleProps?: HTMLAttributes<HTMLElement>;
};

export function JobApplicationCard({ job, columns, dragHandleProps }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleMove(newColumnId: string) {
    try {
      const result = await updateJobApplication(job.id, {
        columnId: newColumnId,
      });

      if (result.error) {
        console.log("Failed to move job application: ", result.error);
      }
    } catch (err) {
      console.log("Failed to move job application: ", err);
    }
  }

  async function handleDelete() {
    try {
      const result = await deleteJobApplication(job.id);

      if (result.error) {
        console.log("Failed to delete job application: ", result.error);
      }
    } catch (err) {
      console.log("Failed to delete job application: ", err);
    }
  }

  return (
    <>
      <Card
        {...dragHandleProps}
        className="bg-secondary/5 border-0 text-secondary"
      >
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
                    <DropdownMenuItem onClick={() => setIsOpen(true)}>
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
                            <DropdownMenuItem
                              key={column.id}
                              onClick={() => handleMove(column.id)}
                            >
                              Mover para {column.name}
                            </DropdownMenuItem>
                          ))}
                      </DropdownMenuGroup>
                    </>
                  )}

                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => handleDelete()}
                      className="hover:text-destructive"
                    >
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

      <JobDialogForm
        createJobData={{ columnId: job.columnId, boardId: job.columnId }}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        jobApplicationId={job.id}
      />
    </>
  );
}
