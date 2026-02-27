import { db } from "./prisma";

const DEFAULT_COLUMNS = [
  { name: "Lista de Desejos", order: 0 },
  { name: "Aplicado", order: 1 },
  { name: "Em Entrevista", order: 2 },
  { name: "Oferta Recebida", order: 3 },
  { name: "Rejeitado", order: 4 },
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
