"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import db from "../prisma";

export async function deleteBoard(boardId: string) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const board = await db.board.findUnique({
    where: { id: boardId },
  });

  if (!board) {
    return { error: "board not found" };
  }

  if (board.userId !== session.user.id) {
    return {
      error: "Unauthorized",
    };
  }

  await db.board.delete({ where: { id: boardId } });

  revalidatePath("/dashboard");

  return {
    success: true,
  };
}
