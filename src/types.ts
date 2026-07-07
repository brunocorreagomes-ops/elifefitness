export interface ProductVariant {
  tamanho: string;
  estoque: number;
}

export interface Product {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  imagem: string;
  imagens_extra: string[];
  variantes: ProductVariant[];
  descricao?: string;
  destaque?: boolean;
}

export interface CartItem {
  id: string; // unique ID representing product_id + size
  product: Product;
  tamanho: string;
  quantidade: number;
}
