"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../auth/auth";
import db from "../prisma";

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
