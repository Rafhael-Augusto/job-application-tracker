"use client";

import { JobApplication, Prisma } from "@/app/generated/prisma/client";
import { useEffect, useState } from "react";
import { updateJobApplication } from "../actions/jobApplications";

type Board = Prisma.BoardGetPayload<{
  include: {
    columns: {
      include: {
        jobApplications: true;
      };
    };
  };
}> | null;

type Column = Prisma.ColumnGetPayload<{
  include: {
    jobApplications: true;
  };
}>;

export function useBoard({ initialBoard }: { initialBoard: Board | null }) {
  const [board, setBoard] = useState<Board | null>(initialBoard || null);
  const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || []);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialBoard) {
      setBoard(initialBoard);
      setColumns(initialBoard.columns || []);
    }
  }, [initialBoard]);

  async function moveJob(
    jobApplicationId: string,
    newColumnId: string,
    newOrder: number,
  ) {
    setColumns((prev) => {
      const newColumns = prev.map((col) => ({
        ...col,
        jobApplications: [...col.jobApplications],
      }));

      let jobToMove: JobApplication | null = null;
      let oldColumnId: string | null = null;

      for (const col of newColumns) {
        const jobIndex = col.jobApplications.findIndex(
          (j) => j.id === jobApplicationId,
        );
        if (jobIndex !== -1 && jobIndex !== undefined) {
          jobToMove = col.jobApplications[jobIndex];
          oldColumnId = col.id;

          col.jobApplications = col.jobApplications.filter(
            (job) => job.id !== jobApplicationId,
          );

          break;
        }
      }

      if (jobToMove && oldColumnId) {
        const targetColumnIndex = newColumns.findIndex(
          (col) => col.id === newColumnId,
        );

        if (targetColumnIndex !== -1) {
          const targetColumn = newColumns[targetColumnIndex];
          const currentJobs = targetColumn.jobApplications || [];

          const updatedJobs = [...currentJobs];
          updatedJobs.splice(newOrder, 0, {
            ...jobToMove,
            columnId: newColumnId,
            order: newOrder * 100,
          });

          const jobsWithUpdatedOrders = updatedJobs.map((job, index) => ({
            ...job,
            order: index * 100,
          }));

          newColumns[targetColumnIndex] = {
            ...targetColumn,
            jobApplications: jobsWithUpdatedOrders,
          };
        }
      }

      return newColumns;
    });

    try {
      const result = await updateJobApplication(jobApplicationId, {
        columnId: newColumnId,
        order: newOrder,
      });
    } catch (err) {
      console.error("Error saving job application position in board: ", err);
    }
  }

  return {
    board,
    columns,
    error,
    moveJob,
  };
}
