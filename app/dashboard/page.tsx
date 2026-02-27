import { db } from "@/lib/prisma";

import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/auth";
import { KanbanBoard } from "@/components/kanbanBoard/kanbanBoard";

export default async function Dashboard() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const board = await db.board.findFirst({
    where: { userId: session.user.id, name: "Job Hunt" },
    include: {
      columns: true,
    },
  });

  const data = {
    board,
    userId: session.user.id,
  };

  return (
    <div className="container mx-auto p-6">
      {board && (
        <div>
          <div className="mb-6">
            <h1 className="text-3l font-bold text-secondary">{board.name}</h1>
            <p className="text-secondary/70">Acompanhe suas candidaturas</p>
          </div>

          <KanbanBoard data={data} />
        </div>
      )}
    </div>
  );
}
