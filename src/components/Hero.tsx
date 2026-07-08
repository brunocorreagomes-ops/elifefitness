import { ArrowRight, MessageSquare } from "lucide-react";
import FadeIn from "./FadeIn";

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-white py-12 md:py-20 lg:py-24 border-b border-gray-100 flex items-center min-h-[540px] lg:min-h-[640px]">
      {/* Background/Layout container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Editorial Content */}
          <div className="text-left space-y-6 lg:col-span-6 py-4 flex flex-col justify-center">
            <FadeIn direction="up" delay={0.1} duration={0.8}>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary">
                Elife Activewear
              </span>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.2} duration={0.8}>
              <h1 className="text-4xl font-extrabold tracking-tight text-deep-teal sm:text-5xl md:text-6xl leading-[1.1]">
                Vista sua melhor <br />
                <span className="text-primary font-black relative inline-block">
                  versão.
                </span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.3} duration={0.8}>
              <p className="text-base text-deep-teal/80 sm:text-lg font-light leading-relaxed max-w-xl">
                Moda fitness feminina para treinar com conforto, confiança e estilo.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.4} duration={0.8}>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  id="hero-cta-btn"
                  onClick={onExploreClick}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/10 hover:bg-primary-dark transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                >
                  Ver coleção
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
                <a
                  href="https://wa.me/5519991079898"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-deep-teal/10 bg-white hover:bg-[#f8f9f9] px-8 py-3.5 text-sm font-semibold text-deep-teal transition-all duration-300 cursor-pointer"
                >
                  <MessageSquare className="h-4.5 w-4.5 text-[#25D366] fill-[#25D366] stroke-white" />
                  Falar no WhatsApp
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Premium Lifestyle Image */}
          <div className="lg:col-span-6 relative h-[320px] sm:h-[450px] lg:h-[540px] w-full overflow-hidden rounded-2xl bg-gray-50">
            <div className="absolute inset-0 bg-deep-teal/5 z-10" />
            <img
              src="https://i.ibb.co/G4fFDH2G/elife-hero-page-site.webp"
              alt="Moda Fitness Feminina Elife"
              className="absolute inset-0 h-full w-full object-cover object-center z-0 hover:scale-[1.02] transition-transform duration-700"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
