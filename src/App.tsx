import React from "react";
import { Search, Sparkles, Filter, RefreshCw, ShoppingBag } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import ProductCard from "./components/ProductCard";
import ProductDetailsModal from "./components/ProductDetailsModal";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";

import { PRODUCTS_DATA, CATEGORIES } from "./data";
import { Product, CartItem } from "./types";

export default function App() {
  // Navigation & UI States
  const [activeSection, setActiveSection] = React.useState("home");
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");
  const [searchQuery, setSearchQuery] = React.useState("");
  
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

  // Handle active section on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "collection", "about", "contact"];
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
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 70; // Header height compensation
      window.scrollTo({
        top: offset,
        behavior: "smooth"
      });
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
      const matchesCategory = selectedCategory === "Todos" || product.categoria === selectedCategory;
      const matchesSearch = product.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.categoria.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

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

      {/* Hero Section */}
      <Hero onExploreClick={() => handleNavigate("collection")} />

      {/* Main Catalog Section */}
      <main id="collection" className="flex-1 py-16 md:py-20 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section Titles */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Coleção Exclusiva</h2>
            <p className="text-3xl font-bold text-deep-teal sm:text-4xl">Vista sua melhor versão</p>
            <p className="text-sm text-deep-teal/60 font-light leading-relaxed">
              Explore nossa seleção de vestuários esportivos refinados. Roupas com costuras reforçadas, zero transparência e toque incrivelmente macio.
            </p>
          </div>

          {/* Filtering and Search Controls bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            
            {/* Category Select Filter Tabs */}
            <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-thin">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-sm font-extrabold"
                      : "bg-gray-50 text-deep-teal/70 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Elegant Search Input */}
            <div className="relative w-full md:w-72">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Buscar modelo, top, legging..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-deep-teal focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>

          </div>

          {/* Catalog Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
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
          )}

        </div>
      </main>

      {/* Brand About Segment */}
      <About />

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
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
