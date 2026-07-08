import FadeIn from "./FadeIn";

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
}

export default function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  const categories = [
    {
      name: "Tops",
      categoryKey: "Top",
      image: "https://i.ibb.co/VWZsQvCm/top-laila-01.webp",
      description: "Alta sustentação e conforto absoluto"
    },
    {
      name: "Leggings",
      categoryKey: "Legging",
      image: "https://i.ibb.co/vCWtsFFR/legging-thaty-01.webp",
      description: "Cós alto, zero transparência e modelagem anatômica"
    },
    {
      name: "Shorts",
      categoryKey: "Shorts",
      image: "https://i.ibb.co/k2HpFbsN/shorts-beatriz-01.webp",
      description: "Liberdade de movimento e toque fresco"
    },
    {
      name: "Conjuntos",
      categoryKey: "Macacão",
      image: "https://i.ibb.co/MD6HfW9H/macacao-gabriela-01.webp",
      description: "Praticidade e elegância em peça única"
    }
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <FadeIn direction="up" delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Navegue por Estilo</span>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <h2 className="text-2xl sm:text-3xl font-bold text-deep-teal mt-1">Nossas Categorias</h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.3}>
            <p className="text-sm text-deep-teal/60 font-light mt-2 leading-relaxed">
              Explore peças desenvolvidas para valorizar suas curvas e potencializar seus treinos.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={cat.name}>
              <FadeIn direction="up" delay={0.1 * (idx + 1)}>
                <div 
                  onClick={() => onCategorySelect(cat.categoryKey)}
                  className="group relative h-[380px] w-full overflow-hidden rounded-xl bg-gray-50 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Image background */}
                  <div className="absolute inset-0 bg-deep-teal/10 group-hover:bg-deep-teal/20 transition-colors duration-300 z-10" />
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-6 bg-gradient-to-t from-deep-teal via-deep-teal/60 to-transparent pt-20 flex flex-col justify-end text-left">
                    <h3 className="text-xl font-bold text-white tracking-wide">{cat.name}</h3>
                    <p className="text-xs text-white/80 font-light mt-1.5 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-primary transition-colors">
                        Ver peças
                        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
