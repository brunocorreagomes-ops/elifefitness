import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-[#f3f6f5] py-12 md:py-20 lg:py-32 min-h-[600px] lg:min-h-[720px] flex items-center">
      {/* Background Image */}
      <img
        src="https://i.ibb.co/G4fFDH2G/elife-hero-page-site.webp"
        alt="Treino com elegância elife"
        className="absolute inset-0 h-full w-full object-cover object-[78%_center] lg:object-[right_center] z-0"
      />

      {/* Overlay/Gradient to guarantee perfect text contrast and reading */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-[#f3f6f5]/95 to-[#f3f6f5]/80 lg:from-white lg:via-[#f3f6f5]/70 lg:to-transparent z-10" />

      {/* Abstract geometric accents for organic feel */}
      <div className="absolute top-1/4 left-1/3 z-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 z-20 h-72 w-72 rounded-full bg-accent-magenta/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 items-center lg:grid-cols-12 gap-12">
          
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 lg:col-span-7 py-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Nova Coleção Estreante
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-deep-teal sm:text-5xl md:text-6xl lg:leading-[1.1]">
              Activate Your <br className="hidden sm:inline" />
              <span className="text-primary relative inline-block">
                Moves
                <span className="absolute bottom-1 left-0 h-2 w-full bg-accent-magenta/20 -z-10 rounded" />
              </span>
            </h1>

            <p className="mx-auto max-w-xl text-base text-deep-teal/80 sm:text-lg md:text-xl lg:mx-0 font-light leading-relaxed">
              Performance e elegância em cada movimento. Descubra uma nova coleção projetada para acompanhar sua rotina ativa com absoluto conforto, segurança invisível e estilo atemporal. Desenvolvido localmente em Indaiatuba/SP.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
              <button
                id="hero-cta-btn"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                Ver Coleção
                <ArrowRight className="h-5 w-5" />
              </button>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-deep-teal/20 bg-white/50 px-8 py-4 text-base font-semibold text-deep-teal hover:bg-white hover:border-deep-teal transition-all duration-300 cursor-pointer"
              >
                Nossa Essência
              </a>
            </div>

            {/* Microstats / highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-deep-teal/10 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-deep-teal">100%</p>
                <p className="text-xs text-deep-teal/60">Poliamida Premium</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-deep-teal">Zero</p>
                <p className="text-xs text-deep-teal/60">Transparência</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-deep-teal">Indaiatuba</p>
                <p className="text-xs text-deep-teal/60">Produção Local</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
