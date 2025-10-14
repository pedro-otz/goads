import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
              Sobre a Goads
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Somos movidos pelo propósito de transformar ideias em impacto real.
            Acreditamos que tecnologia e criatividade podem mudar o mercado e gerar valor duradouro para pessoas e empresas.
          </p>
        </section>

        {/* Nossa História */}
        <section className="mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">
            <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
              Nossa História
            </span>
          </h2>
          <p className="text-muted-foreground mb-4">
            Fundada em 2024, a <strong>Goads</strong> nasceu com um objetivo simples:
            oferecer soluções digitais que realmente fizessem a diferença.
            O que começou como uma pequena equipe apaixonada logo evoluiu para uma empresa capaz de entregar inovação em escala.
          </p>
          <p className="text-muted-foreground mb-4">
            Crescemos ouvindo nossos clientes, aprendendo com o mercado e construindo parcerias sólidas.
            Hoje, seguimos comprometidos em ser referência em design, tecnologia e impacto positivo.
          </p>
          <p className="text-muted-foreground">
            Mais do que serviços, entregamos confiança. Mais do que resultados, entregamos transformação.
          </p>
        </section>

        {/* Nossa Missão */}
        <section className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
              Nossa Missão
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Capacitar marcas e empreendedores a alcançarem todo o seu potencial
            através de soluções digitais inteligentes, criativas e sustentáveis.
          </p>
        </section>

        {/* Valores */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
              Nossos Valores
            </span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Inovação", text: "Buscamos sempre o novo para resolver os desafios de amanhã." },
              { title: "Integridade", text: "Agimos com ética, transparência e responsabilidade." },
              { title: "Excelência", text: "Elevamos o padrão em cada detalhe, sempre." },
              { title: "Colaboração", text: "Crescemos juntos, porque juntos vamos mais longe." },
              { title: "Sustentabilidade", text: "Valorizamos o impacto positivo no presente e no futuro." },
              { title: "Foco no Cliente", text: "O sucesso dos nossos clientes é o nosso sucesso." },
            ].map((value, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-20">
          <h2 className="text-2xl font-bold mb-4">
            Pronto para transformar suas ideias em resultados?
          </h2>
          <p className="text-muted-foreground mb-6">
            Junte-se a nós nessa jornada de inovação e crescimento.
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/register">Começar agora</Link>
          </Button>
        </section>
      </div>
      <Footer />
    </>
  )
}
