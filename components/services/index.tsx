import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

enum ProService {
  YES = 1,
  NO = 0,
}
interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}

const serviceList: ServiceProps[] = [
  {
    title: "Agendamento de Posts",
    description:
      "Programe publicações no Instagram de forma simples e automática.",
    pro: ProService.NO,
  },
  {
    title: "Criação de Conteúdo com IA",
    description:
      "Gere legendas criativas e ideias de postagens em segundos.",
    pro: ProService.NO,
  },
  {
    title: "Editor de Imagens Integrado",
    description:
      "Personalize suas artes sem precisar de ferramentas externas.",
    pro: ProService.YES,
  },
  {
    title: "Relatórios de Engajamento",
    description:
      "Acompanhe o desempenho de cada post e melhore sua estratégia.",
    pro: ProService.YES,
  },
  {
    title: "Multi-Conta",
    description:
      "Gerencie diversos perfis de Instagram em um só painel.",
    pro: ProService.YES,
  },
  {
    title: "Suporte Prioritário",
    description:
      "Tenha acesso ao atendimento premium sempre que precisar.",
    pro: ProService.YES,
  },
];

const Services = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
          Serviços
        </span>
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Cresça seu Instagram com facilidade
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Nossa plataforma combina automação, inteligência artificial e relatórios
        para que você foque no que realmente importa:{" "}
        <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
          engajar seu público
        </span>
        .
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-[80%] mx-auto">
        {serviceList.map((e, index) => (
          <Card
            key={index}
            className="bg-muted/60 dark:bg-card h-full relative p-2"
          >
            <CardHeader>
              <CardTitle>{e.title}</CardTitle>
              <CardDescription>{e.description}</CardDescription>
            </CardHeader>

            {e.pro === ProService.YES && (
              <Badge
                variant="secondary"
                className="absolute -top-2 -right-3 shadow-md"
              >
                PRO
              </Badge>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Services;
