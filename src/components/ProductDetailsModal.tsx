import React from "react";
import { X, Plus, Minus, ShoppingBag, ShieldCheck, RefreshCw, Star } from "lucide-react";
import { Product } from "../types";

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

export default function ProductDetailsModal({ product, onClose, onAddToCart }: ProductDetailsModalProps) {
  if (!product) return null;

  // Build the list of all available images (main + extra)
  const allImages = [product.imagem, ...(product.imagens_extra || [])].filter(Boolean);
  const [activeImgIndex, setActiveImgIndex] = React.useState<number>(0);

  // Find first size with stock > 0
  const availableVariants = product.variantes.filter(v => v.estoque > 0);
  const initialSize = availableVariants.length > 0 ? availableVariants[0].tamanho : "";
  
  const [selectedSize, setSelectedSize] = React.useState<string>(initialSize);
  const [quantity, setQuantity] = React.useState<number>(1);

  // Reset indices and states when product changes
  React.useEffect(() => {
    setActiveImgIndex(0);
    const av = product.variantes.filter(v => v.estoque > 0);
    setSelectedSize(av.length > 0 ? av[0].tamanho : "");
    setQuantity(1);
  }, [product]);

  const handleDecreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQty = () => {
    const variant = product.variantes.find(v => v.tamanho === selectedSize);
    const maxStock = variant ? variant.estoque : 0;
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize, quantity);
    onClose();
  };

  const selectedVariant = product.variantes.find(v => v.tamanho === selectedSize);
  const currentStock = selectedVariant ? selectedVariant.estoque : 0;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Click outside container to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-deep-teal hover:text-primary hover:bg-white transition-all shadow-sm cursor-pointer"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side: Images Grid/Gallery */}
        <div className="w-full md:w-1/2 bg-gray-50 flex flex-col justify-between p-4 sm:p-6 min-h-[300px] md:min-h-[500px]">
          <div className="flex-1 flex items-center justify-center aspect-[4/5] rounded-xl overflow-hidden bg-white shadow-inner relative">
            <img
              src={allImages[activeImgIndex]}
              alt={`${product.nome} - Vista ${activeImgIndex + 1}`}
              className="h-full w-full object-cover object-center transition-all duration-300"
            />
            {availableVariants.length === 0 && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
                <span className="rounded-full bg-deep-teal text-white text-xs font-bold px-4 py-2 uppercase tracking-widest shadow-lg">
                  Coleção Esgotada
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery Row */}
          {allImages.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto py-1 scrollbar-thin">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImgIndex === idx ? "border-primary shadow-sm" : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover object-center" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[90vh] space-y-6">
          <div className="space-y-4">
            
            {/* Category tag & reviews placeholder */}
            <div className="flex items-center justify-between">
              <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary uppercase tracking-widest">
                {product.categoria}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-xs font-semibold text-deep-teal">4.9</span>
                <span className="text-[10px] text-deep-teal/40">(24 opiniões)</span>
              </div>
            </div>

            {/* Product Name & Price */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-deep-teal">{product.nome}</h2>
              <p className="text-2xl font-black text-primary">{formatPrice(product.preco)}</p>
            </div>

            {/* Long Description */}
            <p className="text-sm text-deep-teal/70 font-light leading-relaxed">
              {product.descricao || "Modelagem premium projetada especificamente com poliamida e elastano de altíssima qualidade. Toque frio, alta respirabilidade e modelação corporal que confere máxima performance e confiança."}
            </p>

            {/* Sizes Box */}
            {availableVariants.length > 0 ? (
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-deep-teal/80">Selecione o tamanho:</span>
                  {selectedSize && (
                    <span className="text-[10px] text-primary bg-primary/5 px-2 py-0.5 rounded-full font-medium">
                      {currentStock} unidades disponíveis no estoque
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variantes.map((v) => {
                    const hasStock = v.estoque > 0;
                    const isSelected = selectedSize === v.tamanho;
                    return (
                      <button
                        key={v.tamanho}
                        disabled={!hasStock}
                        onClick={() => {
                          setSelectedSize(v.tamanho);
                          setQuantity(1);
                        }}
                        className={`text-sm font-bold min-w-[48px] h-11 flex items-center justify-center rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-md"
                            : hasStock
                              ? "bg-white text-deep-teal border-gray-200 hover:border-deep-teal hover:bg-gray-50"
                              : "bg-gray-50 text-gray-300 border-gray-100 line-through cursor-not-allowed"
                        }`}
                      >
                        {v.tamanho}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center text-sm text-gray-400 italic">
                Lamentamos! Esta peça está temporariamente esgotada para todos os tamanhos.
              </div>
            )}
          </div>

          {/* Action Box (Qty Selector & Add Button) */}
          {availableVariants.length > 0 && (
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div className="flex items-center justify-between gap-4">
                
                {/* Quantity Block */}
                <div className="flex flex-col space-y-1">
                  <span className="text-xs font-medium text-deep-teal/60">Quantidade:</span>
                  <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-1">
                    <button
                      onClick={handleDecreaseQty}
                      disabled={quantity <= 1}
                      className="p-2 text-deep-teal/60 hover:text-deep-teal disabled:opacity-30 cursor-pointer"
                      aria-label="Diminuir"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-deep-teal">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncreaseQty}
                      disabled={quantity >= currentStock}
                      className="p-2 text-deep-teal/60 hover:text-deep-teal disabled:opacity-30 cursor-pointer"
                      aria-label="Aumentar"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className="flex-1 inline-flex items-center justify-center gap-3 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-widest py-4 px-6 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.01] cursor-pointer disabled:opacity-50"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Adicionar ao Carrinho
                </button>

              </div>

              {/* Guarantees Box */}
              <div className="grid grid-cols-2 gap-4 pt-2 text-[11px] text-deep-teal/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Segurança Garantida</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-primary" />
                  <span>Troca Fácil em Indaiatuba</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
