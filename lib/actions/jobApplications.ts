"use server";

import { FormData } from "@/components/createJobDialog/schema";

import { getSession } from "../auth/auth";

import db from "../prisma";

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

  return {
    data: jobApplication,
  };
}
