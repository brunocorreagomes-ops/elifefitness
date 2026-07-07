import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-white via-[#f3f6f5] to-[#edf2f0] py-12 md:py-20 lg:py-28">
      {/* Abstract geometric accents for organic feel */}
      <div className="absolute top-1/4 right-0 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-10 -z-10 h-72 w-72 rounded-full bg-accent-magenta/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Text Content */}
          <div className="text-center lg:col-span-7 lg:text-left space-y-6">
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
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100 max-w-md mx-auto lg:mx-0">
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

          {/* Editorial Visual Collage */}
          <div className="relative lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-deep-teal/10 group">
              {/* Main Image */}
              <img
                src="https://i.ibb.co/Fb0kNH33/macacao-gabriela-01.webp"
                alt="Treino com elegância elife"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay styling for elegant atmosphere */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/80 via-transparent to-transparent" />
              
              {/* Brand card overlaid on image */}
              <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/95 backdrop-blur-sm p-5 shadow-lg space-y-1">
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Estilo elife</p>
                <p className="text-base font-semibold text-deep-teal">Liberdade & Conforto</p>
                <p className="text-xs text-deep-teal/70 leading-relaxed font-light">
                  "O caimento perfeito que abraça o corpo. Sinto-me segura para correr e alongar sem restrições."
                </p>
              </div>

              {/* Float Accent Tag */}
              <div className="absolute top-4 right-4 rounded-full bg-accent-magenta text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-md">
                Renovação
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
