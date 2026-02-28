"use client";

import { Prisma } from "@/app/generated/prisma/client";
import { useEffect, useState } from "react";

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
  ) {}

  return {
    board,
    columns,
    error,
    moveJob,
  };
}
