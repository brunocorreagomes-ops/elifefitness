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
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          
          {/* Image Side with Soft Rounded Edge and Premium Look */}
          <div className="relative group">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/10 to-accent-magenta/10 opacity-70 blur-2xl group-hover:opacity-100 transition duration-500" />
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://i.ibb.co/5W8N9Zhd/legging-thaty-03.webp"
                alt="Detalhe costura esportiva elife"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-deep-teal/45 to-transparent" />
              
              {/* Float Badge */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-lg bg-white/95 backdrop-blur-sm px-4 py-2 shadow-md">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-deep-teal">Proteção UV & Costuras Anti-atrito</span>
              </div>
            </div>
          </div>

          {/* Text Content Side */}
          <div className="space-y-8">
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
                  className="rounded-xl border border-gray-100 bg-gray-50/50 p-5 space-y-3 hover:shadow-md transition-shadow duration-300"
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
