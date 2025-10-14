import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "smartphone",
    title: "100% Mobile Friendly",
    description:
      "Gerencie e agende seus posts de qualquer lugar, direto do celular ou desktop.",
  },
  {
    icon: "bot",
    title: "Automação com IA",
    description:
      "Crie legendas criativas e ideias de conteúdo automaticamente com inteligência artificial.",
  },
  {
    icon: "calendar",
    title: "Agendamento Simples",
    description:
      "Defina data e hora para seus posts e deixe que a plataforma publique por você.",
  },
  {
    icon: "shield",
    title: "Segurança Garantida",
    description:
      "Seus dados e posts ficam protegidos com tecnologia de segurança de ponta.",
  },
  {
    icon: "sparkles",
    title: "Design de Posts",
    description:
      "Crie imagens e artes personalizadas sem precisar de ferramentas externas.",
  },
  {
    icon: "barChart",
    title: "Métricas de Engajamento",
    description:
      "Acompanhe o desempenho dos seus posts e descubra o que mais gera resultados.",
  },
];

const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
          Features
        </span>
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Nosso diferencial
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Uma plataforma completa para{" "}
        <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
          criar, agendar e analisar
        </span>{" "}
        seus posts no Instagram de forma prática e inteligente.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map((e, index) => (
          <Card
            key={index}
            className="h-full bg-background dark:bg-card hover:bg-muted/50 dark:hover:bg-muted/50 transition-all delay-75 group/number"
          >
            <CardHeader className="flex justify-center items-center">
              <CardTitle>{e.title}</CardTitle>
            </CardHeader>

            <CardContent className="text-muted-foreground text-center">
              {e.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
