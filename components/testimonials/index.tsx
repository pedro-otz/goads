import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Cristina Lopes",
    userName: "Gestora de Marketing",
    comment:
      "O Goads mudou minha rotina! Agora consigo planejar e agendar semanas de conteúdo em minutos. A IA gera legendas incríveis que engajam muito mais!",
    rating: 5,
  },
  {
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Sofia Almeida",
    userName: "Empreendedora",
    comment:
      "Adorei a praticidade. Não preciso mais me preocupar em lembrar de postar, tudo é automático e otimizado para os melhores horários.",
    rating: 4,
  },
  {
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    name: "Carlos Souza",
    userName: "Social Media Freelancer",
    comment:
      "Com o Goads, reduzi o tempo gasto criando posts e aumentei minha carteira de clientes. A automação faz toda a diferença!",
    rating: 5,
  },
  {
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    name: "Juliana Pereira",
    userName: "Influencer Digital",
    comment:
      "A plataforma é super intuitiva e me ajuda a manter consistência nas redes sociais. Meus resultados cresceram muito desde que comecei a usar!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Quem usa e recomenda o{" "}
          <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
            Goads
          </span>
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          O que nossos clientes falam
        </h2>
      </div>

      <Carousel className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto">
        <CarouselContent>
          {reviewList.map((e, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pt-6 pb-0">
                  <div className="flex gap-1 pb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < e.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-base text-muted-foreground">
                    “{e.comment}”
                  </p>
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={e.image} alt={e.name} />
                      <AvatarFallback>{e.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg font-semibold">
                        {e.name}
                      </CardTitle>
                      <CardDescription>{e.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default Testimonials;
