export const colorsMap = {
  Ciano: "bg-cyan-600",
  Roxo: "bg-purple-600",
  Verde: "bg-green-600",
  Amarelo: "bg-yellow-600",
  Vermelho: "bg-red-600",
  Rosa: "bg-pink-600",
} as const;

export const colorsName = Object.keys(colorsMap) as (keyof typeof colorsMap)[];

export const colorsList = Object.entries(colorsMap).map(([name, color]) => ({
  name,
  color,
}));
