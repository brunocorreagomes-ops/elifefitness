import React from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

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
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-deep-teal p-2 focus:outline-none"
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex flex-1 items-center justify-center md:justify-start">
          <button 
            id="logo-btn"
            onClick={() => handleNavClick("home")} 
            className="flex items-center gap-2 focus:outline-none cursor-pointer"
          >
            <img
              src="https://i.ibb.co/VYnDZyh5/LOGO-ELIFE-TRANSPARENTE.png"
              alt="Logo elife"
              className="h-9 w-auto object-contain"
            />
            <span className="sr-only">elife</span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              id={`nav-item-${item.id}`}
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium tracking-wide transition-colors relative py-2 cursor-pointer ${
                activeSection === item.id
                  ? "text-primary"
                  : "text-deep-teal/70 hover:text-primary"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions (Cart) */}
        <div className="flex flex-1 items-center justify-end">
          <button
            id="cart-trigger"
            onClick={onCartClick}
            className="relative p-2.5 text-deep-teal hover:text-primary transition-colors focus:outline-none rounded-full hover:bg-gray-50 cursor-pointer"
            aria-label="Ver carrinho"
          >
            <ShoppingBag className="h-6 w-6 stroke-[2]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-magenta text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              id={`mobile-nav-item-${item.id}`}
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                activeSection === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-deep-teal hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
