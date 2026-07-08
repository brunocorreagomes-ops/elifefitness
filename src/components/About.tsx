import { Shield, Heart, Sparkles, Compass } from "lucide-react";

export default function About() {
  const pillars = [
    {
      icon: <Compass className="h-5 w-5 text-primary" />,
      title: "Performance",
      desc: "Modelagem anatômica que acompanha o corpo em treinos intensos."
    },
    {
      icon: <Heart className="h-5 w-5 text-primary" />,
      title: "Conforto",
      desc: "Toque extremamente suave na pele com tecidos de alta qualidade."
    },
    {
      icon: <Sparkles className="h-5 w-5 text-primary" />,
      title: "Elegância",
      desc: "Design minimalista e atemporal para transitar em qualquer rotina."
    }
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-white py-16 md:py-24 lg:py-32 min-h-[600px] lg:min-h-[720px] flex items-center">
      {/* Background Image - positioned absolute, left center */}
      <img
        src="https://i.ibb.co/4ZRr0pNB/ELIFE-SECAO-SOBRE.webp"
        alt="Estilo de vida ativo elife"
        className="absolute inset-0 h-full w-full object-cover object-[15%_center] lg:object-[left_center] z-0"
      />

      {/* Overlay/Gradient from right to left to guarantee reading */}
      <div className="absolute inset-0 bg-gradient-to-l from-white via-white/95 to-white/70 lg:from-white lg:via-white/90 lg:to-transparent z-10" />

      {/* Ambient decorative elements */}
      <div className="absolute top-1/3 right-10 z-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Spacer on the left to make room for the model image */}
          <div className="hidden lg:block lg:col-span-5" />

          {/* Text Content Side - positioned on the right */}
          <div className="space-y-8 lg:col-span-7 py-8 text-left">
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Sobre a elife</h2>
              <p className="text-3xl font-bold tracking-tight text-deep-teal sm:text-4xl">
                Elevando seu treino com sofisticação
              </p>
            </div>

            <div className="space-y-4 text-deep-teal/80 font-light leading-relaxed">
              <p>
                Nascida em Indaiatuba/SP, a <strong className="font-semibold text-deep-teal">elife</strong> é muito mais do que uma marca de roupas de ginástica. Somos uma comunidade dedicada a promover um estilo de vida ativo com paixão, transformação e empoderamento feminino.
              </p>
              <p>
                Acreditamos que o conforto e a segurança são fundamentais para que você alcance seus objetivos. Nossas peças são desenvolvidas com precisão técnica e um design minimalista, oferecendo liberdade de movimento sem abrir mão da elegância que define sua essência.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {pillars.map((pillar, idx) => (
                <div 
                  key={idx} 
                  className="rounded-xl border border-deep-teal/10 bg-white/75 backdrop-blur-sm p-5 space-y-3 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xs font-bold text-deep-teal uppercase tracking-widest">{pillar.title}</h3>
                  <p className="text-xs text-deep-teal/70 font-light leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
