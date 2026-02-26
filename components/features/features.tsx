import { BriefcaseIcon, CheckCircle2Icon, TrendingUpIcon } from "lucide-react";

const featuresList = [
  {
    title: "Organize Candidaturas",
    desc: "Crie quadros e colunas personalizados para acompanhar suas candidaturas em cada etapa do processo.",
    icon: BriefcaseIcon,
    id: 0,
  },
  {
    title: "Acompanhe o Progresso",
    desc: "Monitore o status das suas candidaturas, desde a inscrição até a entrevista e a oferta, com quadros Kanban visuais.",
    icon: TrendingUpIcon,
    id: 1,
  },
  {
    title: "Mantenha-se Organizado",
    desc: "Nunca perca o controle de uma candidatura. Mantenha todas as informações da sua busca por emprego em um único lugar centralizado.",
    icon: CheckCircle2Icon,
    id: 2,
  },
];

export function Features() {
  return (
    <section className="border-t border-secondary/5 py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-3">
          {featuresList.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-secondary">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
