import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Roboto from "@/public/roboto.png";
import Pacheco from "@/public/pacheco.png";
import Runner from "@/public/runner.png";
import Gamestation from "@/public/gamestation.png";

interface HowItWorksProps {
  badgeTitle: string;
  title: string;
  description: string;
  image: any;
}

const HowItWorksList: HowItWorksProps[] = [
  {
    badgeTitle: "Passo 1",
    title: "Crie sua conta",
    description:
      "Cadastre-se em segundos e configure seus perfis do Instagram para começar a usar a plataforma.",
    image: Roboto,
  },
  {
    badgeTitle: "Passo 2",
    title: "Gere conteúdo com IA",
    description:
      "Receba sugestões de legendas criativas, hashtags estratégicas e até imagens personalizadas com inteligência artificial.",
    image: Runner,
  },
  {
    badgeTitle: "Passo 3",
    title: "Agende seus posts",
    description:
      "Escolha a data e o horário ideais para publicar. A plataforma faz o trabalho por você, mesmo enquanto você está offline.",
    image: Pacheco,
  },
  {
    badgeTitle: "Passo 4",
    title: "Analise os resultados",
    description:
      "Acompanhe métricas de engajamento e descubra o que funciona melhor para sua audiência.",
    image: Gamestation,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
            Como funciona
          </span>
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Passo a Passo
        </h2>
      </div>

      <div className="lg:w-[80%] mx-auto relative">
        {HowItWorksList.map((e, index) => (
          <div
            key={index}
            className={`flex mb-12 items-center gap-6 ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <Card className="h-full bg-transparent border-0 shadow-none">
              <CardHeader>
                <div className="pb-4">
                  <Badge>{e.badgeTitle}</Badge>
                </div>
                <CardTitle className="text-2xl font-semibold">
                  {e.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground w-[90%] text-lg">
                {e.description}
              </CardContent>
            </Card>

            <Image
              className="w-[150px] md:w-[250px] lg:w-[300px] mx-auto"
              src={e.image}
              alt={e.badgeTitle}
              width={0}
              height={0}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
