import { Button } from "../ui/button";
import Image from "next/image";
import HeroImage from "@/public/boneco.png";
import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";

export const HeroSection = () => {
  return (
    <section className="container">
      <div className="grid place-items-center gap-8 mx-auto py-10 md:py-28">
        <div className="text-center space-y-8">
          <Badge
            variant="secondary"
            className="px-3 py-1 text-sm font-medium"
          >
            🚀 Já ajudando criadores e empresas a crescerem mais rápido
          </Badge>

          <div className="w-full mx-auto text-center text-3xl md:text-6xl font-bold">
            <h1>
              Transforme Suas{" "}
              <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                Redes Sociais
              </span>{" "}
              com Inteligência Artificial
            </h1>
          </div>

          <p className="sm:w-[70%] w-full mx-auto text-lg md:text-xl text-muted-foreground text-center">
            Crie, agende e publique conteúdos em minutos. Deixe a{" "}
            <strong>IA trabalhar por você</strong> enquanto foca no que mais
            importa: crescer sua marca e atrair clientes.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button className="w-5/6 sm:w-auto px-6 py-4 text-md group/arrow">
              Teste Grátis Agora
              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              className="w-5/6 sm:w-auto px-6 py-4 text-md"
            >
              Ver Como Funciona
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            💡 Sem cartão de crédito • Cancelamento fácil a qualquer momento
          </p>
        </div>

        <div className="relative group mt-14">
          <div className="absolute -top-6 right-12 w-[90%] h-12 lg:h-[80%] bg-primary/50 blur-3xl rounded-full img-shadow-animation"></div>

          {/* <Image
            src={HeroImage}
            alt="Demonstração Goads IA"
            className="relative z-10 w-[280px] md:w-[480px] mx-auto drop-shadow-2xl"
            priority
          /> */}

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};
