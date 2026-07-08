import React from "react";
import { Search, Sparkles, Filter, RefreshCw, ShoppingBag, SlidersHorizontal, ArrowUpDown, X, Check, Eye, Tag, TrendingUp, Clock, Percent, MessageSquare, Truck, Instagram } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryGrid from "./components/CategoryGrid";
import About from "./components/About";
import ProductCard from "./components/ProductCard";
import ProductDetailsModal from "./components/ProductDetailsModal";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import FadeIn from "./components/FadeIn";

import { PRODUCTS_DATA, CATEGORIES } from "./data";
import { Product, CartItem } from "./types";

// Helper mapping to return premium physical garment colors based on product metadata
export const getProductColors = (id: string): string[] => {
  const lowercaseId = id.toLowerCase();
  
  if (lowercaseId.includes("beatriz")) return ["Rosa", "Preto"];
  if (lowercaseId.includes("gabriela")) return ["Preto"];
  if (lowercaseId.includes("laila")) return ["Verde", "Preto"];
  if (lowercaseId.includes("luna")) return ["Branco", "Rosa"];
  if (lowercaseId.includes("vitoria")) return ["Azul", "Preto", "Rosa"];
  if (lowercaseId.includes("bianca")) return ["Nude", "Branco"];
  if (lowercaseId.includes("thaty")) return ["Preto", "Azul"];
  if (lowercaseId.includes("renata")) return ["Branco", "Azul"];
  if (lowercaseId.includes("bruna")) return ["Nude", "Rosa"];
  if (lowercaseId.includes("karina")) return ["Preto"];
  if (lowercaseId.includes("rebeca")) return ["Azul", "Rosa"];
  if (lowercaseId.includes("daniela")) return ["Rosa", "Branco"];
  if (lowercaseId.includes("sophia")) return ["Verde", "Nude"];
  if (lowercaseId.includes("tradicional")) return ["Preto"];
  if (lowercaseId.includes("tule")) return ["Preto", "Branco"];
  if (lowercaseId.includes("carol")) return ["Branco"];
  
  return ["Preto", "Rosa"]; // fallback
};

export default function App() {
  // Navigation & UI States
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);
  const [activeSection, setActiveSection] = React.useState("home");
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Advanced Filters & Sort State
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
  const [selectedHighlight, setSelectedHighlight] = React.useState<string | null>(null);
  const [sortBy, setSortBy] = React.useState<string>("recent");
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false);
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [isSticky, setIsSticky] = React.useState(false);

  // SPA Routing handlers
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  React.useEffect(() => {
    if (currentPath === "/colecao" || currentPath.startsWith("/produto/")) {
      setActiveSection("collection");
    } else if (currentPath === "/" || currentPath === "/home") {
      setActiveSection("home");
    }
  }, [currentPath]);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const urlProduct = React.useMemo(() => {
    if (currentPath.startsWith("/produto/")) {
      const slug = currentPath.substring("/produto/".length);
      return PRODUCTS_DATA.find(p => p.id === slug) || null;
    }
    return null;
  }, [currentPath]);

  const handleCloseProductModal = () => {
    if (currentPath.startsWith("/produto/")) {
      navigateTo("/colecao");
    } else {
      setQuickViewProduct(null);
    }
  };

  // Dynamic counts of products in each category for superior navigation UX
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { Todos: PRODUCTS_DATA.length };
    PRODUCTS_DATA.forEach((product) => {
      counts[product.categoria] = (counts[product.categoria] || 0) + 1;
    });
    return counts;
  }, []);

  const allSizes = ["PP", "P", "M", "G", "GG", "Único"];
  const allColors = ["Preto", "Branco", "Verde", "Azul", "Rosa", "Nude"];
  
  // Shopping Cart States
  const [cartItems, setCartItems] = React.useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("elife_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  // Quick View Product State
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);

  // Synchronize cart with localStorage safely
  React.useEffect(() => {
    try {
      localStorage.setItem("elife_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Erro ao salvar carrinho no localStorage", e);
    }
  }, [cartItems]);

  // Handle active section & sticky filter on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const isHome = window.location.pathname === "/" || window.location.pathname === "/home";

      // 1. Active section logic
      if (isHome) {
        const sections = ["home", "about", "contact"];
        const scrollPos = window.scrollY + 120;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
            if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      } else {
        setActiveSection("collection");
      }

      // 2. Sticky filter logic
      const filterElement = document.getElementById("collection-filters");
      if (filterElement && !isHome) {
        const rect = filterElement.getBoundingClientRect();
        // Enable sticky when the top of the filter section has scrolled past the header height (80px)
        setIsSticky(rect.top < 80);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    if (id === "home") {
      navigateTo("/");
    } else if (id === "collection") {
      navigateTo("/colecao");
    } else if (id === "about" || id === "contact") {
      if (window.location.pathname !== "/") {
        window.history.pushState({}, "", "/");
        setCurrentPath("/");
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            const offset = element.offsetTop - 70; // Header height compensation
            window.scrollTo({
              top: offset,
              behavior: "smooth"
            });
          }
        }, 150);
      } else {
        const element = document.getElementById(id);
        if (element) {
          const offset = element.offsetTop - 70; // Header height compensation
          window.scrollTo({
            top: offset,
            behavior: "smooth"
          });
        }
      }
    }
  };

  // Add Item to Cart
  const handleAddToCart = (product: Product, size: string, quantity: number) => {
    const itemId = `${product.id}-${size}`;
    
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);
      
      const variant = product.variantes.find(v => v.tamanho === size);
      const maxStock = variant ? variant.estoque : 99;

      if (existingIndex > -1) {
        // Exists, update quantity up to maxStock
        const newItems = [...prevItems];
        const newQty = Math.min(newItems[existingIndex].quantidade + quantity, maxStock);
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantidade: newQty
        };
        return newItems;
      } else {
        // Create new item
        return [
          ...prevItems,
          {
            id: itemId,
            product,
            tamanho: size,
            quantidade: Math.min(quantity, maxStock)
          }
        ];
      }
    });

    // Automatically open cart drawer to give immediate feedback
    setIsCartOpen(true);
  };

  // Update Item Quantity inside Cart
  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const variant = item.product.variantes.find(v => v.tamanho === item.tamanho);
          const maxStock = variant ? variant.estoque : 99;
          return {
            ...item,
            quantidade: Math.max(1, Math.min(quantity, maxStock))
          };
        }
        return item;
      })
    );
  };

  // Remove Item from Cart
  const handleRemoveCartItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Filter products based on search queries and active categories
  const filteredProducts = React.useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // 1. Category Filter
      const matchesCategory = selectedCategory === "Todos" || product.categoria === selectedCategory;
      
      // 2. Search Filter (matches name, code/id, category, color, description)
      const matchesSearch = !searchQuery || (() => {
        const query = searchQuery.toLowerCase().trim();
        const colors = getProductColors(product.id).map(c => c.toLowerCase());
        return (
          product.nome.toLowerCase().includes(query) ||
          product.id.toLowerCase().includes(query) ||
          product.categoria.toLowerCase().includes(query) ||
          colors.some(c => c.includes(query)) ||
          (product.descricao && product.descricao.toLowerCase().includes(query))
        );
      })();
      
      // 3. Size Filter (supporting "Único" automatically for matching size queries if needed)
      const matchesSize = !selectedSize || product.variantes.some(
        (v) => (v.tamanho === selectedSize || (selectedSize === "P" && v.tamanho === "Único") || (selectedSize === "M" && v.tamanho === "Único")) && v.estoque > 0
      );

      // 4. Color Filter using our precise helper
      const matchesColor = !selectedColor || getProductColors(product.id).includes(selectedColor);

      // 5. Highlight Filters (Novidades, Mais vendidos, Últimas peças, Promoções)
      let matchesHighlight = true;
      if (selectedHighlight === "novidades") {
        matchesHighlight = product.destaque === true;
      } else if (selectedHighlight === "mais-vendidos") {
        // Top 5 curated best sellers
        const bestSellers = ["top-beatriz", "shorts-beatriz", "macacao-gabriela", "legging-thaty", "top-vitoria"];
        matchesHighlight = bestSellers.includes(product.id);
      } else if (selectedHighlight === "ultimas-pecas") {
        const totalStock = product.variantes.reduce((sum, v) => sum + v.estoque, 0);
        matchesHighlight = totalStock > 0 && totalStock <= 6;
      } else if (selectedHighlight === "promocoes") {
        matchesHighlight = product.preco <= 120.00;
      }

      return matchesCategory && matchesSearch && matchesSize && matchesColor && matchesHighlight;
    }).sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.preco - b.preco;
      }
      if (sortBy === "price-desc") {
        return b.preco - a.preco;
      }
      if (sortBy === "low-stock") {
        const stockA = a.variantes.reduce((sum, v) => sum + v.estoque, 0);
        const stockB = b.variantes.reduce((sum, v) => sum + v.estoque, 0);
        if (stockA === 0) return 1;
        if (stockB === 0) return -1;
        return stockA - stockB;
      }
      // "recent" (default: destaque first, then alphabetical)
      if (a.destaque && !b.destaque) return -1;
      if (!a.destaque && b.destaque) return 1;
      return a.nome.localeCompare(b.nome);
    });
  }, [selectedCategory, searchQuery, selectedSize, selectedColor, selectedHighlight, sortBy]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

  const hasActiveFilters = React.useMemo(() => {
    return selectedCategory !== "Todos" || !!searchQuery || !!selectedSize || !!selectedColor || !!selectedHighlight;
  }, [selectedCategory, searchQuery, selectedSize, selectedColor, selectedHighlight]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8f9f9]">
      
      {/* Announcement Promo Banner */}
      <div className="bg-deep-teal text-white text-[11px] sm:text-xs font-semibold py-2 px-4 text-center tracking-wider flex items-center justify-center gap-1.5 border-b border-teal-950">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span>PARCELAMENTO EM ATÉ 3X SEM JUROS • RETIRADA GRÁTIS EM INDAIATUBA / SP</span>
        <span className="hidden md:inline">• ENVIAMOS PARA TODO O BRASIL!</span>
      </div>

      {/* Header */}
      <Header
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Sticky Compact Filter Bar */}
      {(currentPath === "/colecao" || currentPath.startsWith("/produto/")) && (
        <div 
          className={`fixed top-[80px] left-0 right-0 z-30 bg-white border-b border-deep-teal/5 shadow-md transition-all duration-300 transform ${
            isSticky ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
            
            {/* Left: Small Search Bar */}
            <div className="relative w-40 sm:w-64 text-left">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-deep-teal/40">
                <Search className="h-3.5 w-3.5" />
              </span>
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8.5 pr-8 py-1.5 rounded-full bg-[#f8f9f9] border border-transparent text-deep-teal placeholder-deep-teal/40 focus:outline-none focus:border-primary/40 focus:bg-white transition-all duration-300 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-2.5 flex items-center text-deep-teal/40 hover:text-deep-teal transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Center: Main Chips */}
            <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {["Todos", "Top", "Shorts", "Legging"].map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs font-semibold px-3.5 py-1 rounded-full border border-transparent transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-white shadow-sm"
                        : "bg-[#f8f9f9] text-deep-teal/70 hover:bg-[#edf2f0] hover:text-deep-teal"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Right: Filtros Button & Counter */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-semibold text-deep-teal font-mono">
                {hasActiveFilters ? `${filteredProducts.length} produtos encontrados` : `${filteredProducts.length} produtos`}
              </span>

              <button
                onClick={() => {
                  handleNavigate("collection");
                  setShowAdvanced(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-deep-teal/10 text-xs font-bold uppercase tracking-wider text-deep-teal hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span className="hidden xs:inline">Filtros</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Dynamic Content Sections */}
      {(() => {
        const isHome = currentPath === "/" || currentPath === "/home";

        if (isHome) {
          return (
            <>
              {/* Hero Section */}
              <Hero onExploreClick={() => navigateTo("/colecao")} />

              {/* Trust Strip (Faixa de Confiança) */}
              <div className="bg-white border-y border-gray-100 py-6 sm:py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    
                    <div className="flex items-center gap-4 py-2 md:py-0 md:px-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                        <MessageSquare className="h-5.5 w-5.5" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-deep-teal">Atendimento direto pelo WhatsApp</h4>
                        <p className="text-xs text-deep-teal/60 font-light mt-0.5">Suporte rápido e humanizado para suas compras</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                        <Truck className="h-5.5 w-5.5" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-deep-teal">Pronta entrega em Indaiatuba</h4>
                        <p className="text-xs text-deep-teal/60 font-light mt-0.5">Receba suas peças preferidas de forma imediata</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                        <Sparkles className="h-5.5 w-5.5" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-deep-teal">Peças selecionadas para treino real</h4>
                        <p className="text-xs text-deep-teal/60 font-light mt-0.5">Testadas para oferecer zero transparência e alta durabilidade</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Category Grid (Categorias por imagem) */}
              <CategoryGrid 
                onCategorySelect={(category) => {
                  setSelectedCategory(category);
                  navigateTo("/colecao");
                }} 
              />

              {/* Seção Mais Vendidos */}
              <section className="py-16 bg-gray-50/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-10">
                  <FadeIn direction="up" delay={0.1}>
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">Favoritos da comunidade</span>
                      <h2 className="text-3xl font-extrabold text-deep-teal">Mais Vendidos</h2>
                      <p className="text-sm text-deep-teal/60 font-light max-w-lg mx-auto">
                        Descubra as peças preferidas das nossas clientes para treinar com máxima segurança e estilo.
                      </p>
                    </div>
                  </FadeIn>

                  <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {PRODUCTS_DATA.filter(p => p.destaque).slice(0, 8).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onQuickView={(p) => navigateTo(`/produto/${p.id}`)}
                      />
                    ))}
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => navigateTo("/colecao")}
                      className="inline-flex items-center gap-2 rounded-full bg-deep-teal px-8 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-md hover:bg-[#0f6b64] hover:scale-[1.01] transition-all cursor-pointer"
                    >
                      Ver coleção completa
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Banner Institucional */}
              <section className="relative overflow-hidden bg-deep-teal text-white py-20 lg:py-28">
                {/* Visual Accent Overlay */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 text-left space-y-6">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">Estilo de Vida Ativo</span>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                        Moda fitness feita para valorizar suas curvas e resistir ao treino real.
                      </h2>
                      <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-xl">
                        Nossas peças são desenvolvidas com tecidos de tecnologia superior, toque gelado, proteção UV e compressão na medida certa. Sinta-se confiante, confortável e elegante dentro e fora do treino.
                      </p>
                      <div className="pt-2">
                        <button
                          onClick={() => navigateTo("/colecao")}
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg hover:bg-primary-dark hover:scale-[1.01] transition-all cursor-pointer"
                        >
                          Explorar Loja Online
                        </button>
                      </div>
                    </div>
                    <div className="lg:col-span-5 relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&auto=format&fit=crop&q=80" 
                        alt="Treino Real Elife" 
                        className="absolute inset-0 h-full w-full object-cover object-center hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Seção Novidades */}
              <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-10">
                  <FadeIn direction="up" delay={0.1}>
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">Lançamentos Exclusivos</span>
                      <h2 className="text-3xl font-extrabold text-deep-teal">Novidades</h2>
                      <p className="text-sm text-deep-teal/60 font-light max-w-lg mx-auto">
                        Confira as últimas novidades da Elife, pensadas para trazer frescor e sofisticação à sua rotina ativa.
                      </p>
                    </div>
                  </FadeIn>

                  <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {PRODUCTS_DATA.filter(p => !p.destaque).slice(0, 8).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onQuickView={(p) => navigateTo(`/produto/${p.id}`)}
                      />
                    ))}
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => navigateTo("/colecao")}
                      className="inline-flex items-center gap-2 rounded-full bg-deep-teal px-8 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-md hover:bg-[#0f6b64] hover:scale-[1.01] transition-all cursor-pointer"
                    >
                      Ver coleção completa
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Feed Instagram */}
              <section className="py-16 bg-gray-50/30 border-t border-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-10">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Siga-nos @elife.activewear</span>
                    <h2 className="text-3xl font-extrabold text-deep-teal">Inspiração Elife</h2>
                    <p className="text-sm text-deep-teal/60 font-light max-w-md mx-auto">
                      Faça parte do nosso estilo de vida ativo. Compartilhe seu treino usando nossas peças.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&auto=format&fit=crop&q=60",
                      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60",
                      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&auto=format&fit=crop&q=60",
                      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60",
                      "https://images.unsplash.com/photo-1485727749690-d091e8284ef3?w=500&auto=format&fit=crop&q=60",
                      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60"
                    ].map((imgSrc, index) => (
                      <a 
                        key={index}
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 block shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="absolute inset-0 bg-deep-teal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                          <Instagram className="h-6 w-6 text-white stroke-[2]" />
                        </div>
                        <img 
                          src={imgSrc} 
                          alt={`Instagram post ${index + 1}`} 
                          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              {/* Brand About Segment */}
              <About />
            </>
          );
        }

        return (
          <main id="collection" className="flex-1 py-8 md:py-10 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5">
          
          {/* Section Titles */}
          <FadeIn direction="up" delay={0.1} duration={0.8}>
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-primary">Coleção Exclusiva</h2>
              <p className="text-2xl font-bold text-deep-teal sm:text-3xl">Vista sua melhor versão</p>
              <p className="text-xs text-deep-teal/60 font-light leading-relaxed">
                Explore nossa seleção de vestuários esportivos refinados. Roupas com costuras reforçadas, zero transparência e toque incrivelmente macio.
              </p>
            </div>
          </FadeIn>

          {/* Premium Filtering and Search Controls Section */}
          <div id="collection-filters" className="space-y-4">
            
            {/* 1. DESKTOP FILTER VIEW */}
            <div className="hidden md:block bg-white px-5 py-4 rounded-2xl border border-deep-teal/5 shadow-sm space-y-4">
              
              {/* Upper Control Row: Search & Count & Sort */}
              <div className="flex gap-4 justify-between items-center">
                {/* Search Bar */}
                <div className="relative w-full max-w-sm text-left">
                  <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-deep-teal/40">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Buscar peça, cor ou modelo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs pl-10 pr-9 py-2 rounded-full bg-[#f8f9f9] border border-transparent text-deep-teal placeholder-deep-teal/40 focus:outline-none focus:border-primary/40 focus:bg-white transition-all duration-300 shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-3 flex items-center text-deep-teal/40 hover:text-deep-teal transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Right Side: Product Count & Inline Sorting */}
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-semibold text-deep-teal">
                    {hasActiveFilters ? `${filteredProducts.length} produtos encontrados` : `${filteredProducts.length} produtos`}
                  </span>
                  
                  {/* Inline sorting select next to counter */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-[11px] font-bold uppercase tracking-wider pl-2.5 pr-7 py-1 bg-[#f8f9f9] border border-transparent hover:border-deep-teal/10 rounded-lg text-deep-teal/80 hover:text-deep-teal focus:outline-none cursor-pointer appearance-none transition-all"
                    >
                      <option value="recent">Mais recentes</option>
                      <option value="price-asc">Menor preço</option>
                      <option value="price-desc">Maior preço</option>
                      <option value="low-stock">Últimas unidades</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center text-deep-teal/40">
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Categorias Row with reduced padding and text spacing */}
              <div className="space-y-1.5 text-left pt-1 border-t border-deep-teal/5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-deep-teal/40">Categorias</span>
                <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                  {CATEGORIES.map((category) => {
                    const count = categoryCounts[category];
                    const isSelected = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`text-xs font-medium px-3.5 py-1 rounded-full whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-1 border border-transparent ${
                          isSelected
                            ? "bg-primary text-white shadow-sm font-semibold"
                            : "bg-[#f8f9f9] text-deep-teal/70 hover:bg-[#edf2f0] hover:text-deep-teal"
                        }`}
                      >
                        <span>{category}</span>
                        <span className={`text-[8px] font-medium font-mono px-1 rounded-full ${
                          isSelected ? "bg-white/20 text-white" : "bg-deep-teal/5 text-deep-teal/40"
                        }`}>
                          {count !== undefined ? count : 0}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Coleções & Destaques (Sleek and discreet) */}
              <div className="space-y-1.5 text-left">
                <span className="text-[9px] font-semibold uppercase tracking-widest text-deep-teal/30">Destaques</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "novidades", label: "Novidades", icon: Sparkles, activeClass: "bg-primary text-white shadow-sm font-semibold" },
                    { id: "mais-vendidos", label: "Mais vendidos", icon: TrendingUp, activeClass: "bg-amber-500 text-white shadow-sm font-semibold" },
                    { id: "ultimas-pecas", label: "Últimas peças", icon: Clock, activeClass: "bg-rose-500 text-white shadow-sm font-semibold" },
                    { id: "promocoes", label: "Promoções", icon: Percent, activeClass: "bg-indigo-500 text-white shadow-sm font-semibold" }
                  ].map((chip) => {
                    const Icon = chip.icon;
                    const isSelected = selectedHighlight === chip.id;
                    return (
                      <button
                        key={chip.id}
                        onClick={() => setSelectedHighlight(isSelected ? null : chip.id)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-normal border border-transparent transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? chip.activeClass
                            : "bg-[#f8f9f9] text-deep-teal/60 hover:bg-[#edf2f0] hover:text-deep-teal"
                        }`}
                      >
                        <Icon className="h-3 w-3 opacity-80" />
                        <span>{chip.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Advanced Filters Button and Collapsible Panel */}
              <div className="pt-1 text-left">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-deep-teal/60 hover:text-primary transition-colors cursor-pointer"
                >
                  <span>Filtros avançados</span>
                  <SlidersHorizontal className="h-3 w-3 opacity-85" />
                  <span className="text-[9px] font-normal text-deep-teal/40">
                    {showAdvanced ? "▲" : "▼"}
                  </span>
                </button>

                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    showAdvanced 
                      ? "max-h-[300px] opacity-100 border-t border-deep-teal/5 pt-3.5 mt-3" 
                      : "max-h-0 opacity-0 pointer-events-none mt-0"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {/* Size Filter */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-deep-teal/40">Filtrar por Tamanho</span>
                      <div className="flex flex-wrap gap-1.5">
                        {allSizes.map((size) => {
                          const isSelected = selectedSize === size;
                          return (
                            <button
                              key={size}
                              onClick={() => setSelectedSize(isSelected ? null : size)}
                              className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "bg-deep-teal border-deep-teal text-white shadow-sm"
                                  : "bg-white border-deep-teal/10 text-deep-teal hover:bg-gray-50"
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Color Filter */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-deep-teal/40">Filtrar por Cor</span>
                      <div className="flex flex-wrap gap-1.5">
                        {allColors.map((color) => {
                          const isSelected = selectedColor === color;
                          const dotBgMap: Record<string, string> = {
                            Preto: "bg-black border border-white/20",
                            Branco: "bg-white border border-gray-300",
                            Verde: "bg-emerald-600",
                            Azul: "bg-sky-600",
                            Rosa: "bg-pink-400",
                            Nude: "bg-amber-200"
                          };
                          return (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(isSelected ? null : color)}
                              className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "bg-deep-teal border-deep-teal text-white shadow-sm"
                                  : "bg-white border-deep-teal/10 text-deep-teal hover:bg-gray-50"
                              }`}
                            >
                              <span className={`h-2.5 w-2.5 rounded-full ${dotBgMap[color] || "bg-gray-400"}`} />
                              <span>{color}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sorting Block in Advanced Panel */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-deep-teal/40">Ordenar Exibição</span>
                      <div className="relative max-w-xs">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full text-xs font-semibold pl-3 pr-10 py-1.5 bg-white border border-deep-teal/10 rounded-lg text-deep-teal focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/5 cursor-pointer appearance-none shadow-sm"
                        >
                          <option value="recent">Mais recentes</option>
                          <option value="price-asc">Menor preço</option>
                          <option value="price-desc">Maior preço</option>
                          <option value="low-stock">Últimas unidades</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-deep-teal/60">
                          <ArrowUpDown className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* 2. MOBILE FILTER VIEW */}
            <div className="block md:hidden space-y-3">
              <div className="flex gap-2.5 items-center">
                {/* Search Bar */}
                <div className="relative flex-1 text-left">
                  <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-deep-teal/40">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Buscar peça, cor ou modelo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs pl-10 pr-9 py-2.5 rounded-full bg-white border border-deep-teal/10 text-deep-teal placeholder-deep-teal/40 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/5 transition-all duration-300 shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-3 flex items-center text-deep-teal/40 hover:text-deep-teal"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Trigger Button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className={`flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-full border transition-all duration-300 cursor-pointer ${
                    hasActiveFilters || sortBy !== "recent"
                      ? "bg-primary border-primary text-white shadow-sm"
                      : "bg-white border-deep-teal/10 text-deep-teal/80 hover:bg-[#f8f9f9]"
                  }`}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Filtrar</span>
                  {((selectedCategory !== "Todos" ? 1 : 0) + (selectedSize ? 1 : 0) + (selectedColor ? 1 : 0) + (selectedHighlight ? 1 : 0) + (sortBy !== "recent" ? 1 : 0)) > 0 && (
                    <span className={`text-[9px] font-extrabold font-mono px-1.5 py-0.5 rounded-full ${
                      hasActiveFilters || sortBy !== "recent" ? "bg-white text-primary" : "bg-primary text-white"
                    }`}>
                      {(selectedCategory !== "Todos" ? 1 : 0) + (selectedSize ? 1 : 0) + (selectedColor ? 1 : 0) + (selectedHighlight ? 1 : 0) + (sortBy !== "recent" ? 1 : 0)}
                    </span>
                  )}
                </button>
              </div>

              {/* Bottom Sheet Modal for Mobile Filters */}
              {mobileFiltersOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center">
                  {/* Backdrop */}
                  <div 
                    className="absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300"
                    onClick={() => setMobileFiltersOpen(false)}
                  />
                  
                  {/* Content Sheet */}
                  <div className="relative w-full max-h-[85vh] bg-white rounded-t-[2.5rem] shadow-2xl z-50 flex flex-col overflow-hidden animate-slide-up">
                    {/* Visual Drag Handle Indicator */}
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-3.5" />
                    
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 pb-4 border-b border-gray-100 text-left">
                      <div>
                        <h3 className="text-base font-bold text-deep-teal">Refinar Coleção</h3>
                        <p className="text-[10px] text-deep-teal/50 font-medium">Toque para selecionar os atributos</p>
                      </div>
                      <button 
                        onClick={() => setMobileFiltersOpen(false)}
                        className="p-1.5 rounded-full bg-gray-100 text-deep-teal hover:bg-gray-200 cursor-pointer transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Scrollable Filter Sections */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
                      {/* Destaques */}
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-deep-teal/40">Destaques</span>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: "novidades", label: "Novidades", icon: Sparkles, active: "bg-primary border-primary text-white" },
                            { id: "mais-vendidos", label: "Mais vendidos", icon: TrendingUp, active: "bg-amber-500 border-amber-500 text-white" },
                            { id: "ultimas-pecas", label: "Últimas peças", icon: Clock, active: "bg-rose-500 border-rose-500 text-white" },
                            { id: "promocoes", label: "Promoções", icon: Percent, active: "bg-indigo-500 border-indigo-500 text-white" }
                          ].map((chip) => {
                            const isSelected = selectedHighlight === chip.id;
                            const Icon = chip.icon;
                            return (
                              <button
                                key={chip.id}
                                onClick={() => setSelectedHighlight(isSelected ? null : chip.id)}
                                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                                  isSelected
                                    ? chip.active
                                    : "bg-white border-deep-teal/10 text-deep-teal/80"
                                }`}
                              >
                                <Icon className="h-3.5 w-3.5" />
                                <span>{chip.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Categorias */}
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-deep-teal/40">Categorias</span>
                        <div className="flex flex-wrap gap-1.5">
                          {CATEGORIES.map((category) => {
                            const isSelected = selectedCategory === category;
                            return (
                              <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`text-xs font-semibold px-3.5 py-2 rounded-full border transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-primary border-primary text-white font-semibold"
                                    : "bg-gray-50 border-transparent text-deep-teal/70"
                                }`}
                              >
                                {category}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Tamanho */}
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-deep-teal/40">Tamanho</span>
                        <div className="flex flex-wrap gap-1.5">
                          {allSizes.map((size) => {
                            const isSelected = selectedSize === size;
                            return (
                              <button
                                key={size}
                                onClick={() => setSelectedSize(isSelected ? null : size)}
                                className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-deep-teal border-deep-teal text-white shadow-sm"
                                    : "bg-white border-deep-teal/10 text-deep-teal hover:bg-gray-50"
                                }`}
                              >
                                {size}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Cor */}
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-deep-teal/40">Cor</span>
                        <div className="flex flex-wrap gap-1.5">
                          {allColors.map((color) => {
                            const isSelected = selectedColor === color;
                            const dotBgMap: Record<string, string> = {
                              Preto: "bg-black border border-white/20",
                              Branco: "bg-white border border-gray-300",
                              Verde: "bg-emerald-600",
                              Azul: "bg-sky-600",
                              Rosa: "bg-pink-400",
                              Nude: "bg-amber-200"
                            };
                            return (
                              <button
                                key={color}
                                onClick={() => setSelectedColor(isSelected ? null : color)}
                                className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-deep-teal border-deep-teal text-white shadow-sm"
                                    : "bg-white border-deep-teal/10 text-deep-teal hover:bg-gray-50"
                                }`}
                              >
                                <span className={`h-2.5 w-2.5 rounded-full ${dotBgMap[color] || "bg-gray-400"}`} />
                                <span>{color}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Ordenação */}
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-deep-teal/40">Ordenação</span>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: "recent", label: "Mais recentes" },
                            { id: "price-asc", label: "Menor preço" },
                            { id: "price-desc", label: "Maior preço" },
                            { id: "low-stock", label: "Últimas unidades" }
                          ].map((opt) => {
                            const isSelected = sortBy === opt.id;
                            return (
                              <button
                                key={opt.id}
                                onClick={() => setSortBy(opt.id)}
                                className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-deep-teal border-deep-teal text-white font-bold"
                                    : "bg-white border-deep-teal/10 text-deep-teal/80"
                                }`}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions Sticky inside Bottom Sheet */}
                    <div className="p-4 border-t border-gray-100 bg-white flex gap-3">
                      <button
                        onClick={() => {
                          setSelectedCategory("Todos");
                          setSelectedSize(null);
                          setSelectedColor(null);
                          setSelectedHighlight(null);
                          setSortBy("recent");
                          setMobileFiltersOpen(false);
                        }}
                        className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-deep-teal rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer text-center"
                      >
                        Limpar Filtros
                      </button>
                      <button
                        onClick={() => setMobileFiltersOpen(false)}
                        className="flex-1 py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer text-center shadow-md"
                      >
                        Aplicar filtros
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Active Filter Badges with Quick Dismiss option (Desktop & general fallback) */}
          {((selectedCategory !== "Todos") || searchQuery || selectedSize || selectedColor || selectedHighlight || sortBy !== "recent") && (
            <div className="flex flex-wrap items-center gap-2 pt-1 bg-transparent text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-deep-teal/40 mr-1">Filtros Ativos:</span>
              
              {selectedCategory !== "Todos" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-white text-deep-teal border border-deep-teal/5 shadow-sm px-3 py-1 rounded-full">
                  Categoria: {selectedCategory}
                  <button onClick={() => setSelectedCategory("Todos")} className="hover:text-primary transition-colors cursor-pointer ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-white text-deep-teal border border-deep-teal/5 shadow-sm px-3 py-1 rounded-full">
                  Busca: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="hover:text-primary transition-colors cursor-pointer ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {selectedHighlight && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-white text-deep-teal border border-deep-teal/5 shadow-sm px-3 py-1 rounded-full">
                  Destaque: {selectedHighlight === "novidades" ? "Novidades" : selectedHighlight === "mais-vendidos" ? "Mais vendidos" : selectedHighlight === "ultimas-pecas" ? "Últimas peças" : "Promoções"}
                  <button onClick={() => setSelectedHighlight(null)} className="hover:text-primary transition-colors cursor-pointer ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {selectedSize && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-white text-deep-teal border border-deep-teal/5 shadow-sm px-3 py-1 rounded-full">
                  Tamanho: {selectedSize}
                  <button onClick={() => setSelectedSize(null)} className="hover:text-primary transition-colors cursor-pointer ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {selectedColor && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-white text-deep-teal border border-deep-teal/5 shadow-sm px-3 py-1 rounded-full">
                  Cor: {selectedColor}
                  <button onClick={() => setSelectedColor(null)} className="hover:text-primary transition-colors cursor-pointer ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {sortBy !== "recent" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-white text-deep-teal border border-deep-teal/5 shadow-sm px-3 py-1 rounded-full">
                  Ordenação: {
                    sortBy === "price-asc" ? "Menor preço" :
                    sortBy === "price-desc" ? "Maior preço" :
                    sortBy === "low-stock" ? "Últimas unidades" : "Mais recentes"
                  }
                  <button onClick={() => setSortBy("recent")} className="hover:text-primary transition-colors cursor-pointer ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              <button 
                onClick={() => {
                  setSelectedCategory("Todos");
                  setSearchQuery("");
                  setSelectedSize(null);
                  setSelectedColor(null);
                  setSelectedHighlight(null);
                  setSortBy("recent");
                }}
                className="text-[10px] font-extrabold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors ml-2 flex items-center gap-1 cursor-pointer"
              >
                Limpar Todos
              </button>
            </div>
          )}

          {/* Catalog Products Grid */}
          {filteredProducts.length > 0 ? (
            <FadeIn direction="up" duration={0.8}>
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={(p) => navigateTo(`/produto/${p.id}`)}
                  />
                ))}
              </div>
            </FadeIn>
          ) : (
            <FadeIn direction="none" duration={0.5}>
              <div className="text-center py-16 space-y-3 bg-white rounded-2xl border border-gray-100 p-8">
                <p className="text-base font-semibold text-deep-teal">Nenhum produto encontrado</p>
                <p className="text-xs text-deep-teal/60 font-light">Tente mudar os filtros de categoria ou ajustar sua pesquisa.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("Todos");
                    setSearchQuery("");
                  }}
                  className="rounded-lg bg-primary text-white font-extrabold text-[10px] uppercase tracking-widest px-5 py-3 hover:bg-primary-dark transition-colors cursor-pointer"
                >
                  Limpar Filtros
                </button>
              </div>
            </FadeIn>
          )}

        </div>
      </main>
        );
      })()}

      {/* Floating Shop Quick Indicator for Better UX */}
      {totalCartCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-white shadow-xl hover:bg-primary-dark hover:scale-105 transition-all flex items-center gap-2 cursor-pointer border border-white/20"
          aria-label="Abrir carrinho"
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xs font-bold font-mono bg-accent-magenta text-white px-2 py-0.5 rounded-full">
            {totalCartCount}
          </span>
        </button>
      )}

      {/* Shopping Footer */}
      <Footer />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
      />

      {/* Quick View Detailed Dialog/Modal */}
      <ProductDetailsModal
        product={urlProduct || quickViewProduct}
        onClose={handleCloseProductModal}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
