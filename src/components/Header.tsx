import { Link } from "react-router-dom";
import logo from "@/assets/logo-full.png";
import { FileText, FlaskConical } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card shadow-[var(--shadow-soft)]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Digital Mente" className="h-12 md:h-16" />
          </Link>
          
          <nav className="flex gap-2 md:gap-4">
            <Link
              to="/cadastro-problema"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm md:text-base"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Cadastrar Problema</span>
              <span className="sm:hidden">Problema</span>
            </Link>
            <Link
              to="/proposta-pesquisa"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity text-sm md:text-base"
            >
              <FlaskConical className="h-4 w-4" />
              <span className="hidden sm:inline">Proposta de Pesquisa</span>
              <span className="sm:hidden">Pesquisa</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
