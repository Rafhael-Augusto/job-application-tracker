"use client";

import { ReactNode, useState } from "react";

import { Column, JobApplication, Prisma } from "@/app/generated/prisma/client";

import { useBoard } from "@/lib/hooks/useBoards";
import { cn } from "@/lib/utils";

import {
  AwardIcon,
  CalendarIcon,
  CheckCircle2Icon,
  MicIcon,
  MoreVerticalIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
} from "lucide-react";

import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { JobApplicationCard } from "@/components/jobApplicationCard/jobApplicationCard";
import { JobDialogForm } from "@/components/jobDialogForm/jobDialogForm";

type BoardType = Prisma.BoardGetPayload<{
  include: {
    columns: {
      include: {
        jobApplications: true;
      };
    };
  };
}>;

type ColumnType = Prisma.ColumnGetPayload<{
  include: {
    jobApplications: true;
  };
}>;

type Props = {
  data: {
    board: BoardType | null;
    userId: string;
  };
};

type DroppableColumnType = {
  colData: {
    column: ColumnType;
    config: (typeof COLUMN_CONFIG)[number];
    boardId: string;
    sortedColumns: Prisma.ColumnGetPayload<{}>[];
  };
};

type JobCardType = {
  job: Prisma.JobApplicationGetPayload<{}>;
  columns: Prisma.ColumnGetPayload<{}>[];
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
  const [isOpen, setIsOpen] = useState(false);

  const createJobData = {
    columnId: colData.column.id,
    boardId: colData.boardId,
  };

  const sortedJobs =
    colData.column.jobApplications?.sort((a, b) => a.order - b.order) || [];

  const { setNodeRef, isOver } = useDroppable({
    id: colData.column.id,
    data: {
      type: "column",
      columnId: colData.column.id,
    },
  });

  return (
    <>
      <Card className="min-w-md flex shadow-md p-0 border-0 bg-secondary/5">
        <CardHeader
          className={cn(
            "text-secondary rounded-t-lg py-3",
            colData.config.color,
          )}
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

        <CardContent
          ref={setNodeRef}
          className={cn(
            "min-h-100 rounded-b-lg",
            isOver && "ring-2 ring-blue-500",
          )}
        >
          <div className="flex flex-col gap-2">
            <SortableContext
              items={sortedJobs.map((job) => job.id)}
              strategy={verticalListSortingStrategy}
            >
              {sortedJobs.map((job) => (
                <SortableJobCard
                  key={job.id}
                  job={{ ...job, columnId: job.columnId || colData.column.id }}
                  columns={colData.sortedColumns}
                />
              ))}
            </SortableContext>
          </div>

          <Button
            className="bg-primary/45 my-4"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon />
            Adicionar Vaga
          </Button>
        </CardContent>
      </Card>

      <JobDialogForm
        createJobData={createJobData}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}

function SortableJobCard({ job, columns }: JobCardType) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({
    id: job.id,
    data: {
      type: "job",
      job,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <JobApplicationCard
        job={job}
        columns={columns}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

export function KanbanBoard({ data }: Props) {
  if (!data?.board) return null;

  const [activeId, setActiveId] = useState<string | null>(null);

  const board = data.board;

  const { columns, moveJob } = useBoard({ initialBoard: board });

  const sortedColumns = columns?.sort((a, b) => a.order - b.order) || [];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  async function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveId(null);

    if (!over || !board.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    let draggedJob: JobApplication | null = null;
    let sourcedColumn: Column | null = null;
    let sourceIndex = -1;

    for (const column of sortedColumns) {
      const jobs =
        column.jobApplications.sort((a, b) => a.order - b.order) || [];
      const jobIndex = jobs.findIndex((j) => j.id === activeId);

      if (jobIndex !== -1) {
        draggedJob = jobs[jobIndex];
        sourcedColumn = column;
        sourceIndex = jobIndex;
        break;
      }
    }

    if (!draggedJob || !sourcedColumn) return;

    const targetColumn = sortedColumns.find((col) => col.id === overId);
    const targetJob = sortedColumns
      .flatMap((col) => col.jobApplications || [])
      .find((job) => job.id === overId);

    let targetColumnId: string;
    let newOrder: number;

    if (targetColumn) {
      targetColumnId = targetColumn.id;
      const jobsInTarget =
        targetColumn.jobApplications
          .filter((job) => job.id !== activeId)
          .sort((a, b) => a.order - b.order) || [];

      newOrder = jobsInTarget.length;
    } else if (targetJob) {
      const targetJobColumn = sortedColumns.find((col) =>
        col.jobApplications.some((j) => j.id === targetJob.id),
      );
      targetColumnId = targetJob.columnId || targetJobColumn?.id || "";

      if (!targetColumnId) return;

      const targetColumnObject = sortedColumns.find(
        (col) => col.id === targetColumnId,
      );

      if (!targetColumnObject) return;

      const allJobsInTargetOriginal =
        targetColumnObject.jobApplications.sort((a, b) => a.order - b.order) ||
        [];

      const allJobsInTargetFiltered =
        allJobsInTargetOriginal.filter((j) => j.id !== activeId) || [];

      const targetIndexInOriginal = allJobsInTargetOriginal.findIndex(
        (j) => j.id === overId,
      );

      const targetIndexInFiltered = allJobsInTargetFiltered.findIndex(
        (j) => j.id === overId,
      );

      if (targetIndexInFiltered !== -1) {
        if (sourcedColumn.id === targetColumnId) {
          if (sourceIndex < targetIndexInOriginal) {
            newOrder = targetIndexInFiltered + 1;
          } else {
            newOrder = targetIndexInFiltered;
          }
        } else {
          newOrder = targetIndexInFiltered;
        }
      } else {
        newOrder = allJobsInTargetFiltered.length;
      }
    } else {
      return;
    }

    if (!targetColumnId) return;

    await moveJob(activeId, targetColumnId, newOrder);
  }
  const activeJob = sortedColumns
    .flatMap((col) => col.jobApplications || [])
    .find((job) => job.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {sortedColumns.map((col, key) => {
            const config = COLUMN_CONFIG[key] || {
              color: "bg-gray-500",
              icon: <CalendarIcon className="h-4 w-4" />,
            };

            const colData = {
              key,
              column: col,
              config,
              boardId: board.id,
              sortedColumns,
            };

            return <DroppableColumn colData={colData} key={col.id} />;
          })}
        </div>
      </div>

      <DragOverlay>
        {activeJob && (
          <div className="opacity-50">
            <JobApplicationCard job={activeJob} columns={sortedColumns} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
