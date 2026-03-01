"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";

import { colorsMapDb, colorsName } from "@/lib/mapping/colors";
import { iconsMapDb, iconsName } from "@/lib/mapping/icons";

import db from "../prisma";

type Data = {
  name: string;
  icon: (typeof iconsName)[number];
  color: (typeof colorsName)[number];
};

export async function createColumn(data: Data) {
  const session = await getSession();

  const colorSelected = colorsMapDb[data.color];
  const iconSelected = iconsMapDb[data.icon];

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const findColumnOrder = await db.column.aggregate({
    _max: {
      order: true,
    },
  });

  let order = 0;

  if (!findColumnOrder._max.order) {
    order = 0;
  } else {
    order = findColumnOrder._max.order + 1;
  }

  const findBoard = await db.board.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (!findBoard) {
    return {
      error: "User board not found",
    };
  }

  const column = await db.column.create({
    data: {
      name: data.name,
      color: colorSelected,
      icon: iconSelected,
      order: order,
      boardId: findBoard.id,
    },
  });

  revalidatePath("/dashboard");

  return {
    data: column,
  };
}

export async function deleteColumn(columnId: string) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const column = await db.column.findFirst({
    where: {
      id: columnId,
      board: {
        userId: session.user.id,
      },
    },
  });

  if (!column) {
    return { error: "column not found" };
  }

  await db.column.delete({ where: { id: columnId } });

  revalidatePath("/dashboard");

  return {
    success: true,
  };
}
