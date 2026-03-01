import { Colors, Icons } from "@/app/generated/prisma/client";

import { db } from "./prisma";

type ColumnType = {
  name: string;
  order: number;
  color: Colors;
  icon: Icons;
};

const DEFAULT_COLUMNS: ColumnType[] = [
  { name: "Lista de Desejos", order: 0, color: "CYAN", icon: "CALENDAR" },
  { name: "Aplicado", order: 1, color: "PURPLE", icon: "CHECK_CIRCLE" },
  { name: "Em Entrevista", order: 2, color: "GREEN", icon: "MIC" },
  { name: "Oferta Recebida", order: 3, color: "YELLOW", icon: "AWARD" },
  { name: "Rejeitado", order: 4, color: "RED", icon: "X_CIRCLE" },
];

export async function initializeUserBoard(userId: string) {
  try {
    const existingBoard = await db.board.findFirst({
      where: { userId, name: "Job Hunt" },
      include: { columns: true },
    });

    if (existingBoard) return existingBoard;

    const board = await db.board.create({
      data: {
        name: "Job Hunt",
        userId,
        columns: {
          create: DEFAULT_COLUMNS.map((col) => ({
            name: col.name,
            color: col.color,
            icon: col.icon,
            order: col.order,
          })),
        },
      },
      include: {
        columns: true,
      },
    });

    return board;
  } catch (err) {
    console.error("Erro ao inicializar board:", err);
    throw err;
  }
}
