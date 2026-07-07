import { MapPin, Instagram, Facebook, MessageSquare, ShieldAlert } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-deep-teal text-white pt-16 pb-8 border-t border-teal-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="https://i.ibb.co/VYnDZyh5/LOGO-ELIFE-TRANSPARENTE.png"
                alt="Logo elife"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm text-white/70 font-light leading-relaxed max-w-xs">
              Transforme sua rotina com elegância e performance excepcionais. Peças exclusivas desenvolvidas localmente com altíssimo padrão.
            </p>
            <p className="text-xs font-bold text-primary uppercase tracking-widest">
              Activate Your Moves
            </p>
          </div>

          {/* Column 2: Social Media */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Redes Sociais</h3>
            <ul className="space-y-2.5 text-sm text-white/70 font-light">
              <li>
                <a 
                  href="https://instagram.com/elife.activewear" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/5519991079898" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp Atendimento
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Location / Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary font-sans">Informações</h3>
            <ul className="space-y-2.5 text-sm text-white/70 font-light">
              <li className="flex items-start gap-2">
                <MapPin className="h-4.5 w-4.5 text-primary flex-shrink-0 mt-0.5" />
                <span>Indaiatuba / SP<br /><span className="text-xs text-white/50">Atendimento Local & Encomendas</span></span>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">Políticas de Privacidade</a>
              </li>
              <li className="text-[11px] text-white/40">
                FUTURO: Substituir botão de checkout do WhatsApp por Gateway de Pagamento integrado (Nuvemshop / Shopify).
              </li>
            </ul>
          </div>

          {/* Column 4: Quality & Ethics */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Nossa Garantia</h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Cada peça elife passa por um rígido controle de qualidade para garantir fios impecáveis, compressão inteligente e costuras anti-atrito. Desenhado para durar e empoderar.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
          <p>© 2026 elife activewear. Todos os direitos reservados.</p>
          <p>Indaiatuba, São Paulo, Brasil.</p>
        </div>

      </div>
    </footer>
  );
}
