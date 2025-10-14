const Footer = () => {
  return (
    <footer>
      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        
        {/* Logo */}
        <div className="col-span-full xl:col-span-2">
          <a rel="noreferrer noopener" href="/" className="font-bold text-xl flex">
            <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
              Goads
            </span>
          </a>
        </div>

        {/* Siga-nos */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Siga-nos</h3>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Github</a>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Twitter</a>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Dribbble</a>
        </div>

        {/* Rede Sociais */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Rede Sociais</h3>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Web</a>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Mobile</a>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Desktop</a>
        </div>

        {/* Sobre */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Sobre</h3>
          <a rel="noreferrer noopener" href="/sobre" className="opacity-60 hover:opacity-100">Nossa Empresa</a>
          <a rel="noreferrer noopener" href="/politica" className="opacity-60 hover:opacity-100">Política de Privacidade</a>
        </div>

        {/* Comunidade */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Comunidade</h3>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Youtube</a>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Discord</a>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Instagram</a>
        </div>
      </section>

      {/* Copyright */}
      <section className="container pb-14 text-center">
        <h3>&copy; {`${new Date().getFullYear()}`} Goads. Todos os direitos reservados.</h3>
      </section>
    </footer>
  );
};

export default Footer;
