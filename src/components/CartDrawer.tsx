import React from "react";
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag, CreditCard, User, CheckCircle } from "lucide-react";
import { CartItem } from "../types";
import { WHATSAPP_NUMBER } from "../data";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }: CartDrawerProps) {
  const [userName, setUserName] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("Pix");
  const [deliveryType, setDeliveryType] = React.useState("Retirada"); // Retirada ou Entrega local
  const [address, setAddress] = React.useState("");

  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.product.preco * item.quantidade, 0);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    let message = `Olá! Gostaria de fazer o seguinte pedido na elife:\n\n`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}x ${item.product.nome} (Tam. ${item.tamanho}) — ${formatPrice(item.product.preco * item.quantidade)}\n`;
    });

    message += `\n*Total:* ${formatPrice(total)}\n\n`;
    message += `*DADOS DO CLIENTE*\n`;
    message += `Nome: ${userName || "Não preenchido"}\n`;
    message += `Forma de pagamento: ${paymentMethod}\n`;
    message += `Método de envio: ${deliveryType}\n`;
    
    if (deliveryType === "Entrega") {
      message += `Endereço em Indaiatuba: ${address || "Não preenchido"}\n`;
    }

    message += `\n_Pedido gerado pelo catálogo elife. Aguardo confirmação!_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Open in a new window/tab safely
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Background shadow with transition */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="h-16 px-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-deep-teal">Seu Carrinho</h2>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-50 text-deep-teal cursor-pointer"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            
            {cartItems.length === 0 ? (
              
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-deep-teal">Seu carrinho está vazio</p>
                  <p className="text-xs text-deep-teal/60 font-light max-w-[240px]">
                    Navegue pelas nossas categorias e adicione peças incríveis ao seu carrinho.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg bg-primary/10 text-primary text-xs font-bold px-5 py-2.5 hover:bg-primary hover:text-white transition-all cursor-pointer"
                >
                  Voltar ao Catálogo
                </button>
              </div>

            ) : (

              /* Cart List */
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const variant = item.product.variantes.find(v => v.tamanho === item.tamanho);
                  const maxStock = variant ? variant.estoque : 0;

                  return (
                    <div 
                      key={item.id} 
                      className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-all duration-300"
                    >
                      {/* Thumbnail */}
                      <div className="h-20 w-16 rounded-lg overflow-hidden bg-white shadow-sm flex-shrink-0">
                        <img 
                          src={item.product.imagem} 
                          alt={item.product.nome} 
                          className="h-full w-full object-cover object-center" 
                        />
                      </div>

                      {/* Detail block */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-semibold text-deep-teal truncate">{item.product.nome}</h4>
                            <p className="text-xs text-deep-teal/50 font-light">Tam. <strong className="font-semibold">{item.tamanho}</strong></p>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors cursor-pointer"
                            aria-label="Excluir item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Controls & Price */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center rounded-lg border border-gray-200 bg-white p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantidade - 1)}
                              disabled={item.quantidade <= 1}
                              className="p-1 text-deep-teal/60 hover:text-deep-teal disabled:opacity-30 cursor-pointer"
                              aria-label="Diminuir"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-deep-teal">
                              {item.quantidade}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantidade + 1)}
                              disabled={item.quantidade >= maxStock}
                              className="p-1 text-deep-teal/60 hover:text-deep-teal disabled:opacity-30 cursor-pointer"
                              aria-label="Aumentar"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-deep-teal">{formatPrice(item.product.preco * item.quantidade)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Checkout Form (only if items exist) */}
            {cartItems.length > 0 && (
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <h3 className="text-xs font-bold text-deep-teal uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Dados de Entrega & Pagamento
                </h3>

                <div className="space-y-3">
                  
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-deep-teal/70 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-primary" />
                      Seu Nome Completo:
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ex: Amanda Silva"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full text-sm bg-gray-50 border border-gray-200 focus:border-primary focus:bg-white focus:outline-none rounded-lg py-2.5 px-3 transition-colors text-deep-teal"
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-deep-teal/70 flex items-center gap-1.5">
                      <CreditCard className="h-3.5 w-3.5 text-primary" />
                      Forma de Pagamento Preferida:
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full text-sm bg-gray-50 border border-gray-200 focus:border-primary focus:bg-white focus:outline-none rounded-lg py-2.5 px-3 transition-colors text-deep-teal"
                    >
                      <option value="Pix">Pix (com desconto de 5%)</option>
                      <option value="Cartão de Crédito">Cartão de Crédito (até 3x sem juros)</option>
                      <option value="Dinheiro / Pix na entrega">Dinheiro ou Pix no ato da entrega</option>
                    </select>
                  </div>

                  {/* Shipment Type Selector */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-deep-teal/70 flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5 text-primary" />
                      Como deseja receber:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setDeliveryType("Retirada")}
                        className={`text-xs font-semibold py-2.5 px-3 rounded-lg border transition-all cursor-pointer ${
                          deliveryType === "Retirada"
                            ? "bg-primary/15 text-primary border-primary"
                            : "bg-gray-50 text-deep-teal/60 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        Retirada (Indaiatuba)
                      </button>
                      <button
                        onClick={() => setDeliveryType("Entrega")}
                        className={`text-xs font-semibold py-2.5 px-3 rounded-lg border transition-all cursor-pointer ${
                          deliveryType === "Entrega"
                            ? "bg-primary/15 text-primary border-primary"
                            : "bg-gray-50 text-deep-teal/60 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        Entrega local
                      </button>
                    </div>
                  </div>

                  {/* Delivery Address Input */}
                  {deliveryType === "Entrega" && (
                    <div className="space-y-1 animate-in fade-in duration-200">
                      <label className="text-[11px] font-semibold text-deep-teal/70">
                        Endereço Completo (Apenas Indaiatuba/SP):
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ex: Rua das Flores, 123, apto 4, Centro, Indaiatuba"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full text-sm bg-gray-50 border border-gray-200 focus:border-primary focus:bg-white focus:outline-none rounded-lg py-2 px-3 transition-colors text-deep-teal resize-none"
                      />
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>

          {/* Footer Summary & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-deep-teal/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-deep-teal/60">
                  <span>Envio / Retirada</span>
                  <span className="font-semibold text-primary">Grátis</span>
                </div>
                <div className="flex items-center justify-between text-base font-black text-deep-teal pt-1.5 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-lg text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold uppercase tracking-widest py-4 px-4 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
              >
                <MessageSquare className="h-5 w-5" />
                Finalizar no WhatsApp
              </button>
              
              <p className="text-[10px] text-deep-teal/50 text-center leading-relaxed">
                Você será redirecionada para o WhatsApp da elife com seu pedido formatado pronto para fechamento.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
