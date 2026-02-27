"use client";

import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Prisma } from "@/app/generated/prisma/client";

import {
  AwardIcon,
  CalendarIcon,
  CheckCircle2Icon,
  MicIcon,
  MoreVerticalIcon,
  TrashIcon,
  XCircleIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CreateJobDialog } from "@/components/createJobDialog/createJobDialog";

type BoardType = Prisma.BoardGetPayload<{ include: { columns: true } }>;
type ColumnType = Prisma.ColumnGetPayload<{}>;

type Props = {
  data: {
    board: BoardType | null;
    userId: string;
  };
};

type DroppableColumnType = {
  colData: {
    key: number;
    column: ColumnType;
    config: (typeof COLUMN_CONFIG)[number];
    boardId: string;
  };
};

const COLUMN_CONFIG: Array<{ color: string; icon: ReactNode }> = [
  {
    color: "bg-cyan-600",
    icon: <CalendarIcon className="h-4 w-4" />,
  },
  {
    color: "bg-purple-600",
    icon: <CheckCircle2Icon className="h-4 w-4" />,
  },
  {
    color: "bg-green-600",
    icon: <MicIcon className="h-4 w-4" />,
  },
  {
    color: "bg-yellow-600",
    icon: <AwardIcon className="h-4 w-4" />,
  },
  {
    color: "bg-red-600",
    icon: <XCircleIcon className="h-4 w-4" />,
  },
];

function DroppableColumn({ colData }: DroppableColumnType) {
  const createJobData = {
    columnId: colData.column.id,
    boardId: colData.boardId,
  };

  return (
    <Card className="min-w-75 flex shrink-0 shadow-md p-0 border-0 bg-secondary/5">
      <CardHeader
        className={cn("text-secondary rounded-t-lg py-3", colData.config.color)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {colData.config.icon}
            <CardTitle>{colData.column.name}</CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                <MoreVerticalIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-primary text-secondary ">
              <DropdownMenuItem className="hover:text-destructive">
                <TrashIcon className="h-4 w-4" />
                <span>Deletar Coluna</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="min-h-100 rounded-b-lg">
        <CreateJobDialog createJobData={createJobData} />
      </CardContent>
    </Card>
  );
}

export function KanbanBoard({ data }: Props) {
  if (!data?.board) return null;

  const board = data.board;
  const columns = board.columns;

  return (
    <div>
      {columns.map((col, key) => {
        const config = COLUMN_CONFIG[key] || {
          color: "bg-gray-500",
          icon: <CalendarIcon className="h-4 w-4" />,
        };

        const colData = {
          key,
          column: col,
          config,
          boardId: board.id,
        };

        return <DroppableColumn colData={colData} key={col.id} />;
      })}
    </div>
  );
}
