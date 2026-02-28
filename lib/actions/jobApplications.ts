"use server";

import { Prisma } from "@/app/generated/prisma/client";

import { FormData } from "@/components/jobDialogForm/schema";

import { getSession } from "../auth/auth";

import db from "../prisma";
import { revalidatePath } from "next/cache";

type Data = Omit<FormData, "tags"> & {
  tags: string[];
  columnId: string;
  boardId: string;
};

export async function createJobApplication(data: Data) {
  const session = await getSession();

  const {
    position,
    company,
    location,
    salary,
    jobUrl,
    tags,
    description,
    notes,
    columnId,
    boardId,
  } = data;

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  if (!company || !position || !columnId || !boardId) {
    return {
      error: "Missing required fields",
    };
  }

  const board = await db.board.findFirst({
    where: {
      id: boardId,
      userId: session.user.id,
    },
  });

  if (!board) {
    return {
      error: "Board not found",
    };
  }

  const column = await db.column.findFirst({
    where: {
      id: columnId,
      boardId: boardId,
    },
  });

  if (!column) {
    return {
      error: "Column not found",
    };
  }

  const maxOrderJob = await db.jobApplication.findFirst({
    where: { columnId },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const jobApplication = await db.jobApplication.create({
    data: {
      company,
      position,
      location,
      notes,
      salary,
      jobUrl,
      columnId,
      boardId,
      userId: session.user.id,
      tags: tags || [],
      description,
      status: "applied",
      order: maxOrderJob?.order ? maxOrderJob?.order + 1 : 0,
    },
  });

  await db.column.update({
    where: { id: columnId },
    data: {
      jobApplications: {
        connect: { id: jobApplication.id },
      },
    },
  });

  revalidatePath("/dashboard");

  return {
    data: jobApplication,
  };
}

export async function updateJobApplication(
  id: string,
  updates: Partial<Prisma.JobApplicationModel>,
) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const jobApplication = await db.jobApplication.findUnique({
    where: { id },
  });

  if (!jobApplication) {
    return { error: "Job application not found" };
  }

  if (jobApplication.userId !== session.user.id) {
    return { error: "Unauthorized" };
  }

  const { columnId, order, ...otherUpdates } = updates;

  const currentColumnId = jobApplication.columnId;
  const newColumnId = columnId ?? currentColumnId;

  const isMovingToDifferentColumn =
    columnId !== undefined && columnId !== currentColumnId;

  let newOrderValue = jobApplication.order;

  if (isMovingToDifferentColumn) {
    const jobsInTargetColumn = await db.jobApplication.findMany({
      where: {
        columnId: newColumnId,
        id: { not: id },
      },
      orderBy: { order: "asc" },
    });

    if (order !== undefined && order !== null) {
      newOrderValue = order * 100;

      const jobsThatNeedToShift = jobsInTargetColumn.slice(order);

      for (const job of jobsThatNeedToShift) {
        await db.jobApplication.update({
          where: { id: job.id },
          data: {
            order: job.order + 100,
          },
        });
      }
    } else {
      if (jobsInTargetColumn.length > 0) {
        const lastOrder =
          jobsInTargetColumn[jobsInTargetColumn.length - 1].order ?? 0;
        newOrderValue = lastOrder + 100;
      } else {
        newOrderValue = 0;
      }
    }
  } else if (order !== undefined && order !== null) {
    const otherJobsInColumn = await db.jobApplication.findMany({
      where: {
        columnId: currentColumnId,
        id: { not: id },
      },
      orderBy: { order: "asc" },
    });

    const oldIndex = otherJobsInColumn.findIndex(
      (job) => job.order > jobApplication.order,
    );

    const oldPosition = oldIndex === -1 ? otherJobsInColumn.length : oldIndex;

    newOrderValue = order * 100;

    if (order < oldPosition) {
      const jobsToShiftDown = otherJobsInColumn.slice(order, oldPosition);

      for (const job of jobsToShiftDown) {
        await db.jobApplication.update({
          where: { id: job.id },
          data: { order: job.order + 100 },
        });
      }
    } else if (order > oldPosition) {
      const jobsToShiftUp = otherJobsInColumn.slice(oldPosition, order);

      for (const job of jobsToShiftUp) {
        await db.jobApplication.update({
          where: { id: job.id },
          data: {
            order: Math.max(0, job.order - 100),
          },
        });
      }
    }
  }

  const updated = await db.jobApplication.update({
    where: { id },
    data: {
      ...otherUpdates,
      columnId: newColumnId,
      order: newOrderValue,
    },
  });

  revalidatePath("/dashboard");

  return { data: updated };
}

export async function getJobApplication(jobApplicationId: string) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const jobApplication = await db.jobApplication.findUnique({
    where: { id: jobApplicationId },
  });

  if (!jobApplication) {
    return { error: "Job application not found" };
  }

  return jobApplication;
}
