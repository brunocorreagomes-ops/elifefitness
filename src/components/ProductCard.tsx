import React from "react";
import { Plus, Minus, ShoppingBag, ZoomIn } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  // Find first size that has stock > 0
  const availableVariants = product.variantes.filter(v => v.estoque > 0);
  const initialSize = availableVariants.length > 0 ? availableVariants[0].tamanho : "";
  
  const [selectedSize, setSelectedSize] = React.useState<string>(initialSize);
  const [quantity, setQuantity] = React.useState<number>(1);

  // If initial size was empty but some variant became available, adjust
  React.useEffect(() => {
    if (!selectedSize && availableVariants.length > 0) {
      setSelectedSize(availableVariants[0].tamanho);
    }
  }, [product, availableVariants, selectedSize]);

  const handleDecreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQty = () => {
    // Check stock limit for selected size
    const variant = product.variantes.find(v => v.tamanho === selectedSize);
    const maxStock = variant ? variant.estoque : 0;
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering quick view on parent
    if (!selectedSize) return;
    onAddToCart(product, selectedSize, quantity);
    // Reset quantity after adding
    setQuantity(1);
  };

  // Get current variant's stock
  const currentVariant = product.variantes.find(v => v.tamanho === selectedSize);
  const currentStock = currentVariant ? currentVariant.estoque : 0;

  // Format currency
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
    >
      {/* Upper Badge & Image Container */}
      <div 
        className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <span className="absolute top-3 left-3 z-10 rounded-md bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-deep-teal uppercase tracking-widest shadow-sm">
          {product.categoria}
        </span>
        
        {/* Gallery Zoom Button on Hover */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-deep-teal/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-deep-teal shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <ZoomIn className="h-5 w-5" />
          </div>
        </div>

        <img
          src={product.imagem}
          alt={product.nome}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {availableVariants.length === 0 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
            <span className="rounded-full bg-deep-teal text-white text-xs font-bold px-4 py-1.5 uppercase tracking-wider">
              Esgotado
            </span>
          </div>
        )}
      </div>

      {/* Product Text Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <h3 
            className="text-base font-semibold text-deep-teal hover:text-primary transition-colors cursor-pointer"
            onClick={() => onQuickView(product)}
          >
            {product.nome}
          </h3>
          <p className="text-lg font-bold text-primary">{formatPrice(product.preco)}</p>
        </div>

        {availableVariants.length > 0 && (
          <div className="space-y-3.5 pt-1">
            {/* Size Selector */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-deep-teal/60">Tamanho:</span>
              <div className="flex flex-wrap gap-1.5">
                {product.variantes.map((variant) => {
                  const hasStock = variant.estoque > 0;
                  const isSelected = selectedSize === variant.tamanho;
                  
                  return (
                    <button
                      key={variant.tamanho}
                      disabled={!hasStock}
                      onClick={() => {
                        setSelectedSize(variant.tamanho);
                        setQuantity(1); // Reset qty on size change
                      }}
                      className={`text-xs font-bold px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                        isSelected
                          ? "bg-primary text-white shadow-sm"
                          : hasStock
                            ? "bg-gray-100 text-deep-teal hover:bg-gray-200"
                            : "bg-gray-50 text-gray-300 line-through cursor-not-allowed"
                      }`}
                    >
                      {variant.tamanho}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Qty and Add Box */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex flex-col space-y-1">
                <span className="text-[10px] font-medium text-deep-teal/60">Qtd:</span>
                <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-1">
                  <button
                    onClick={handleDecreaseQty}
                    disabled={quantity <= 1}
                    className="p-1 text-deep-teal/60 hover:text-deep-teal disabled:opacity-35 cursor-pointer"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-xs font-semibold text-deep-teal">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncreaseQty}
                    disabled={quantity >= currentStock}
                    className="p-1 text-deep-teal/60 hover:text-deep-teal disabled:opacity-35 cursor-pointer"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary/10 hover:bg-primary hover:text-white text-primary text-[10px] font-bold uppercase tracking-wider py-3 px-3 transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                <ShoppingBag className="h-4 w-4" />
                Adicionar
              </button>
            </div>
          </div>
        )}

        {/* Esgotado indicator inside info box */}
        {availableVariants.length === 0 && (
          <div className="pt-2 text-center text-xs text-gray-400 italic">
            Sem estoque disponível para esta coleção.
          </div>
        )}
      </div>
    </div>
  );
}
