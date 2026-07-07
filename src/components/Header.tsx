import React from "react";
import { ShoppingBag, Menu, X, Phone, MapPin, Instagram } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ cartCount, onCartClick, onNavigate, activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: "Início", id: "home" },
    { label: "Coleção", id: "collection" },
    { label: "Sobre", id: "about" },
    { label: "Contato", id: "contact" }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Menu Button with animated look */}
        <div className="flex md:hidden">
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-deep-teal p-2.5 focus:outline-none rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 stroke-[1.5]" /> : <Menu className="h-6 w-6 stroke-[1.5]" />}
          </button>
        </div>

        {/* Brand Logo & Brand badge */}
        <div className="flex flex-1 items-center justify-center md:justify-start gap-4">
          <button 
            id="logo-btn"
            onClick={() => handleNavClick("home")} 
            className="flex items-center gap-2 focus:outline-none cursor-pointer group"
          >
            <img
              src="https://i.ibb.co/VYnDZyh5/LOGO-ELIFE-TRANSPARENTE.png"
              alt="Logo elife"
              className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="sr-only">elife</span>
          </button>
          
          <span className="hidden lg:inline-flex items-center text-[9px] font-bold tracking-widest uppercase text-deep-teal/40 border border-deep-teal/10 px-2 py-0.5 rounded">
            INDAIATUBA / SP
          </span>
        </div>

        {/* Desktop Navigation with uppercase, generous tracking and hover indicators */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                id={`nav-item-${item.id}`}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-[11px] font-bold uppercase tracking-widest transition-all duration-300 relative py-2.5 cursor-pointer ${
                  isActive
                    ? "text-primary scale-105 font-extrabold"
                    : "text-deep-teal/70 hover:text-primary hover:scale-105"
                }`}
              >
                {item.label}
                <span 
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-primary transition-all duration-300 ${
                    isActive ? "w-4 opacity-100" : "w-0 opacity-0 group-hover:w-2"
                  }`} 
                />
              </button>
            );
          })}
        </nav>

        {/* Actions (Cart & Support text link) */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <a
            href="https://wa.me/5519999999999" // Replace with actual WhatsApp if provided
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-deep-teal/60 hover:text-primary transition-colors py-2 px-3 border border-gray-100 rounded-full hover:border-primary/20"
          >
            <Phone className="h-3 w-3 stroke-[2]" />
            Atendimento
          </a>

          <button
            id="cart-trigger"
            onClick={onCartClick}
            className="relative p-3 text-deep-teal hover:text-primary hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 focus:outline-none rounded-full cursor-pointer border border-transparent hover:border-gray-100"
            aria-label="Ver carrinho"
          >
            <ShoppingBag className="h-5 w-5 stroke-[2]" />
            {cartCount > 0 ? (
              <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-magenta text-[9px] font-extrabold text-white ring-2 ring-white animate-bounce shadow-md">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>

      </div>

      {/* Improved Mobile Menu Panel (Sleek Drawer-like experience) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md px-6 py-6 space-y-6 shadow-xl animate-in slide-in-from-top duration-300">
          <div>
            <p className="text-[9px] font-extrabold text-deep-teal/40 tracking-widest uppercase mb-4">Navegação</p>
            <div className="grid grid-cols-1 gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    id={`mobile-nav-item-${item.id}`}
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary border-l-4 border-primary"
                        : "text-deep-teal hover:bg-gray-50 active:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 space-y-4">
            <p className="text-[9px] font-extrabold text-deep-teal/40 tracking-widest uppercase">Atendimento & Localização</p>
            
            <div className="space-y-3">
              <a
                href="https://wa.me/5519999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-deep-teal/80 hover:text-primary transition-colors"
              >
                <div className="p-2 rounded-lg bg-gray-50 text-primary">
                  <Phone className="h-4 w-4" />
                </div>
                Suporte via WhatsApp
              </a>

              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-deep-teal/80">
                <div className="p-2 rounded-lg bg-gray-50 text-primary">
                  <MapPin className="h-4 w-4" />
                </div>
                Indaiatuba - SP, Brasil
              </div>
            </div>

            {/* Quick Social Share / Follow */}
            <div className="flex gap-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 bg-gray-50 text-deep-teal/60 hover:text-primary rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
