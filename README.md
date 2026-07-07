# elife activewear — Catálogo Oficial & Landing Page

Este é o site oficial da **elife**, marca de moda fitness feminina sediada em **Indaiatuba/SP**. O projeto foi construído em **React + TypeScript + Tailwind CSS (v4)** e projetado para ser hospedado gratuitamente no **GitHub Pages**.

## 🚀 Funcionalidades Principais

- **Visual Corporate Modern / Editorial**: Alinhado com a identidade de marca sofisticada e elegante ("Activate Your Moves").
- **Catálogo Inteligente**: Filtros por categoria e busca textual em tempo real.
- **Seleção de Variantes com Estoque Real**: Exibe apenas os tamanhos disponíveis e bloqueia compras acima do limite real do estoque.
- **Galeria de Detalhes (Quick View)**: Visualização de múltiplos ângulos de cada peça e ficha técnica estendida.
- **Carrinho com Checkout via WhatsApp**: O cliente monta o carrinho, preenche dados de nome, pagamento e tipo de envio (retirada ou entrega local em Indaiatuba/SP) e o site gera automaticamente o link com a mensagem formatada para o fechamento manual!

---

## 🛠️ Como dar manutenção no site

### 1. Alterar o número do WhatsApp de atendimento
Abra o arquivo `/src/data.ts` e altere a constante no topo do arquivo:
```typescript
export const WHATSAPP_NUMBER = "5519991079898"; // Código do país (55) + DDD (19) + número
```

### 2. Adicionar ou Editar produtos
Todos os produtos e estoques estão cadastrados no arquivo `/src/data.ts`. Cada produto segue esta estrutura:
```typescript
{
  id: "top-beatriz", // Identificador único em minúsculo
  nome: "Top Beatriz",
  categoria: "Top",
  preco: 129.90, // Preço em Reais (BRL)
  imagem: "https://i.ibb.co/...", // URL da imagem principal
  imagens_extra: [
    "https://i.ibb.co/..." // Imagens adicionais para a galeria (opcional)
  ],
  descricao: "Descrição completa do produto...",
  variantes: [
    { tamanho: "P", estoque: 3 },
    { tamanho: "M", estoque: 9 },
    { tamanho: "G", estoque: 11 },
    { tamanho: "GG", estoque: 7 }
  ],
  destaque: true // Mostra como destaque se necessário
}
```

### 3. Alterar ou Adicionar Fotos
Para atualizar fotos oficiais, faça o upload das imagens em um serviço de hospedagem como o **ImgBB** (como já estão hospedadas as fotos atuais) ou salve dentro do repositório no GitHub na pasta `/public/img/produtos/` seguindo a convenção de IDs e altere os caminhos correspondentes no `/src/data.ts`.

---

## 📦 Como Publicar Atualizações no GitHub Pages

1. **Subir o projeto para um repositório no GitHub**:
   - Crie um repositório público ou privado no seu GitHub (ex: `elife-activewear`).
   - Siga as instruções do GitHub para associar a pasta do seu projeto e dar `git push`.

2. **Ativar o Deploy Automático**:
   O Vite possui suporte excelente para compilar páginas estáticas para o GitHub Pages.
   - Instale a dependência de deploy executando: `npm install gh-pages --save-dev`
   - Adicione no seu `package.json` a propriedade `"homepage": "https://<seu-usuario>.github.io/<nome-do-repositorio>/"`
   - Adicione no bloco de `"scripts"` no `package.json`:
     `"predeploy": "npm run build",`
     `"deploy": "gh-pages -d dist"`
   - Rode `npm run deploy` no terminal para publicar diretamente!

---

## 🔮 Preparado para o Futuro (Nuvemshop / Shopify)
A arquitetura do catálogo (`/src/data.ts`) foi estruturada baseando-se em **Produtos e Variantes**. No futuro, quando a elife migrar para uma plataforma de e-commerce completa, os dados de produtos poderão ser exportados em CSV ou integrados diretamente com facilidade!
