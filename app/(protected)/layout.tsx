import { Navbar } from "./_components/navbar/navbar";
import { Sidebar } from "./_components/side/side";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col items-center">
      <Navbar />

      <div className="flex w-full max-w-6xl flex-1 px-4 py-6 gap-6">
        {/* Só reserva espaço no desktop */}
        <div className="hidden lg:block w-64">
          <Sidebar />
        </div>

        {/* Conteúdo principal sempre ocupa toda a largura no mobile */}
        <div className="flex-1 w-full">
          {children}
        </div>
      </div>

      {/* Sidebar flutuante: aparece como overlay no mobile */}
      <Sidebar />
    </div>
  );
};

export default ProtectedLayout;
