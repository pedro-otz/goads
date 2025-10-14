import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "calendar",
    title: "Agendamento Inteligente",
    description:
      "Programe seus posts no Instagram de forma simples e rápida. Escolha data e hora e deixe que a plataforma publique automaticamente para você.",
  },
  {
    icon: "sparkles",
    title: "Criação de Posts com IA",
    description:
      "Gere legendas criativas, imagens e ideias de conteúdo em segundos com inteligência artificial integrada.",
  },
  {
    icon: "barChart",
    title: "Análises e Relatórios",
    description:
      "Acompanhe métricas de desempenho e descubra quais posts engajam mais seu público, otimizando sua estratégia de marketing.",
  },
  {
    icon: "clock",
    title: "Economia de Tempo",
    description:
      "Automatize suas tarefas e foque no que realmente importa: criar conexões com seus seguidores e aumentar sua presença digital.",
  },
];
const Benefits = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">
            <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
              Benefícios
            </span>
          </h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            A forma mais fácil de{" "}
            <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
              criar e agendar
            </span>{" "}
            seus posts.
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Poupe tempo, aumente seu engajamento e mantenha sua presença online
            ativa todos os dias!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map((e, index) => (
            <Card
              key={index}
              className="bg-muted/50 dark:bg-card hover:bg-background dark:hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <CardTitle>{e.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {e.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
