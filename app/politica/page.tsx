'use client'
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useEffect } from "react";
import { FiFileText, FiUser, FiLock, FiMail, FiGlobe, FiInfo, FiSettings } from "react-icons/fi";

export default function PrivacyPolicyPage() {
    // opcional: scroll suave
    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            const target = (e.target as HTMLAnchorElement).getAttribute("href");
            if (target && target.startsWith("#")) {
                const el = document.querySelector(target);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }
        };
        document.querySelectorAll('a[href^="#"]').forEach(el => el.addEventListener("click", handler));
        return () => document.querySelectorAll('a[href^="#"]').forEach(el => el.removeEventListener("click", handler));
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-col md:flex-row container mx-auto px-4 py-12 max-w-7xl">

                {/* SUMÁRIO */}
                <aside className="hidden md:block w-1/4 pr-8 sticky top-24 h-fit">
                    <h2 className="text-xl font-bold mb-4">Sumário</h2>
                    <ul className="space-y-3 text-muted-foreground">
                        <li><a href="#lgpd" className="flex items-center gap-2 hover:text-primary"><FiFileText /> LGPD</a></li>
                        <li><a href="#importancia" className="flex items-center gap-2 hover:text-primary"><FiInfo /> Importância da Lei</a></li>
                        <li><a href="#dados" className="flex items-center gap-2 hover:text-primary"><FiUser /> Dados Coletados</a></li>
                        <li><a href="#uso" className="flex items-center gap-2 hover:text-primary"><FiSettings /> Como Usamos</a></li>
                        <li><a href="#compartilhamento" className="flex items-center gap-2 hover:text-primary"><FiLock /> Compartilhamento</a></li>
                        <li><a href="#direitos" className="flex items-center gap-2 hover:text-primary"><FiMail /> Direitos do Usuário</a></li>
                        <li><a href="#meta" className="flex items-center gap-2 hover:text-primary"><FiGlobe /> Integração Meta</a></li>
                        <li><a href="#contato" className="flex items-center gap-2 hover:text-primary"><FiMail /> Contato</a></li>
                    </ul>
                </aside>

                {/* CONTEÚDO */}
                <main className="md:w-3/4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">Política de Privacidade e Proteção de Dados</h1>
                    <p className="text-muted-foreground mb-6">
                        A <strong>Goads</strong> assegura a privacidade e a segurança dos dados de clientes e usuários em conformidade
                        com a LGPD (Lei 13.709/2018).
                    </p>

                    {/* Seções com IDs para scroll */}
                    <section id="lgpd" className="mb-10">
                        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><FiFileText /> O que é a LGPD?</h2>
                        <p className="text-muted-foreground">
                            A LGPD é uma lei brasileira que regula a coleta, armazenamento e tratamento de dados pessoais,
                            garantindo direitos aos cidadãos e responsabilidades às empresas.
                        </p>
                    </section>

                    <section id="importancia" className="mb-10">
                        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><FiInfo /> Por que essa lei é importante?</h2>
                        <p className="text-muted-foreground">
                            Cria regras claras sobre como os dados pessoais devem ser tratados, prevenindo abusos e protegendo
                            a privacidade dos usuários.
                        </p>
                    </section>

                    <section id="dados" className="mb-10">
                        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><FiUser /> Quais dados coletamos?</h2>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Nome, e-mail e dados de contato</li>
                            <li>Informações bancárias quando necessárias</li>
                            <li>Dados de navegação e cookies</li>
                            <li>Dados de interações em campanhas e redes sociais</li>
                        </ul>
                    </section>

                    <section id="uso" className="mb-10">
                        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><FiSettings /> Como utilizamos os dados</h2>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                            <li>Personalização da experiência do usuário</li>
                            <li>Otimização de campanhas e anúncios</li>
                            <li>Prevenção de fraudes</li>
                            <li>Cumprimento de obrigações legais</li>
                            <li>Gestão do relacionamento com clientes</li>
                        </ul>
                    </section>

                    <section id="compartilhamento" className="mb-10">
                        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><FiLock /> Compartilhamento de dados</h2>
                        <p className="text-muted-foreground">
                            Compartilhamos apenas com parceiros tecnológicos, prestadores de serviços ou autoridades legais,
                            nunca vendemos dados sem consentimento.
                        </p>
                    </section>

                    <section id="direitos" className="mb-10">
                        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><FiMail /> Direitos do usuário</h2>
                        <p className="text-muted-foreground">
                            Você pode solicitar acesso, correção, exclusão, portabilidade e revogação de consentimento de seus dados,
                            conforme previsto na LGPD.
                        </p>
                    </section>

                    <section id="meta" className="mb-10">
                        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><FiGlobe /> Uso de dados do Meta</h2>
                        <p className="text-muted-foreground">
                            Integramos com Facebook e Instagram apenas para gerenciar campanhas publicitárias de forma segura.
                        </p>
                    </section>

                    <section id="contato" className="mb-10">
                        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2"><FiMail /> Contato</h2>
                        <p className="text-muted-foreground">
                            Dúvidas ou solicitações: <strong>contato@Goads.com.br</strong>
                        </p>
                    </section>
                </main>
            </div>

            <Footer />
        </>
    )
}

