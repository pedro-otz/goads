import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Preciso ter experiência em design para usar o Goads?",
    answer:
      "Não! O Goads foi feito para qualquer pessoa, desde iniciantes até profissionais. Nossa IA gera artes e legendas automaticamente para você.",
    value: "item-1",
  },
  {
    question: "Posso agendar posts para várias redes sociais?",
    answer:
      "Sim! Com o Goads você consegue criar, editar e agendar posts para diferentes plataformas em um só lugar.",
    value: "item-2",
  },
  {
    question: "Existe um limite de posts que posso criar?",
    answer:
      "Depende do plano escolhido. No plano gratuito você pode criar até 10 posts por mês. Nos planos pagos, o limite é bem maior e atende tanto criadores quanto empresas.",
    value: "item-3",
  },
  {
    question: "Posso cancelar a assinatura a qualquer momento?",
    answer:
      "Sim! Você pode cancelar sua assinatura quando quiser, sem burocracia. O acesso permanece até o final do período já pago.",
    value: "item-4",
  },
  {
    question: "O Goads funciona em dispositivos móveis?",
    answer:
      "Sim! O Goads é 100% responsivo e pode ser acessado de qualquer dispositivo, seja computador, tablet ou celular.",
    value: "item-5",
  },
];

const Faq = () => {
  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
            FAQS
          </span>
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Perguntas Frequentes
        </h2>
      </div>

      <Accordion type="single" collapsible>
        {FAQList.map((e) => (
          <AccordionItem key={e.value} value={e.value}>
            <AccordionTrigger className="text-left">{e.question}</AccordionTrigger>
            <AccordionContent>{e.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;
