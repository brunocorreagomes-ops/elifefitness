import { Product } from "./types";

export const WHATSAPP_NUMBER = "5519991079898";

export const CATEGORIES = [
  "Todos",
  "Top",
  "Shorts",
  "Bermuda",
  "Legging",
  "Cropped",
  "T-shirt",
  "Regata",
  "Macacão",
  "Macaquinho"
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "top-beatriz",
    nome: "Top Beatriz",
    categoria: "Top",
    preco: 129.90,
    imagem: "https://i.ibb.co/1Jqxhr6F/top-beatriz-01.webp",
    imagens_extra: [
      "https://i.ibb.co/v4NR1Kk7/top-beatriz-02.webp",
      "https://i.ibb.co/pjZ5hzwj/top-beatriz-03.webp"
    ],
    descricao: "Top de alta sustentação com decote anatômico e costas nadador. Ideal para treinos de alta intensidade, corrida e musculação. Oferece segurança impecável com toque suave.",
    variantes: [
      { tamanho: "P", estoque: 3 },
      { tamanho: "M", estoque: 9 },
      { tamanho: "G", estoque: 11 },
      { tamanho: "GG", estoque: 7 }
    ],
    destaque: true
  },
  {
    id: "shorts-beatriz",
    nome: "Shorts Beatriz",
    categoria: "Shorts",
    preco: 139.90,
    imagem: "https://i.ibb.co/k2HpFbsN/shorts-beatriz-01.webp",
    imagens_extra: [
      "https://i.ibb.co/cctTZGfm/shorts-beatriz-02.webp",
      "https://i.ibb.co/V04t6rMX/shorts-beatriz-03.webp"
    ],
    descricao: "Shorts esportivo com cós anatômico de compressão média. Modela o corpo com suavidade, não enrola durante o treino e possui toque gelado super fresco.",
    variantes: [
      { tamanho: "P", estoque: 4 },
      { tamanho: "M", estoque: 7 },
      { tamanho: "G", estoque: 8 },
      { tamanho: "GG", estoque: 8 }
    ],
    destaque: true
  },
  {
    id: "macacao-gabriela",
    nome: "Macacão Gabriela",
    categoria: "Macacão",
    preco: 249.90,
    imagem: "https://i.ibb.co/MD6HfW9H/macacao-gabriela-01.webp",
    imagens_extra: [
      "https://i.ibb.co/HLQPynbh/macacao-gabriela-02.webp",
      "https://i.ibb.co/4ZP9Ds5J/macacao-gabriela-03.webp",
      "https://i.ibb.co/SDTsk6LX/macacao-gabriela-04.webp",
      "https://i.ibb.co/JWnNVSnG/macacao-gabriela-05.webp"
    ],
    descricao: "Macacão longo de alta performance com design minimalista. Modela com firmeza e elegância. Decote refinado nas costas garantindo ventilação ideal e liberdade de movimentos.",
    variantes: [
      { tamanho: "P", estoque: 1 },
      { tamanho: "M", estoque: 2 },
      { tamanho: "G", estoque: 3 }
    ],
    destaque: true
  },
  {
    id: "bermuda-laila",
    nome: "Bermuda Laila",
    categoria: "Bermuda",
    preco: 149.90,
    imagem: "https://i.ibb.co/dJDnCJQn/bermuda-laila-01.webp",
    imagens_extra: [
      "https://i.ibb.co/fd4Rt36J/bermuda-laila-02.webp",
      "https://i.ibb.co/3y1JZhS7/bermuda-laila-03.webp",
      "https://i.ibb.co/JW8SpTd7/bermuda-laila-04.webp"
    ],
    descricao: "Bermuda ciclista de compressão com modelagem alongada. Perfeita para evitar o atrito nas coxas durante corridas e caminhadas. Possui cós duplo ultra-firme.",
    variantes: [
      { tamanho: "P", estoque: 5 },
      { tamanho: "M", estoque: 7 },
      { tamanho: "G", estoque: 7 },
      { tamanho: "GG", estoque: 5 }
    ]
  },
  {
    id: "tshirt-luna",
    nome: "T-shirt Luna",
    categoria: "T-shirt",
    preco: 99.90,
    imagem: "https://i.ibb.co/fYqNNSr2/t-shirt-luna-01.webp",
    imagens_extra: [
      "https://i.ibb.co/DDFVRn4v/t-shirt-luna-02.webp",
      "https://i.ibb.co/b5fVzZgm/t-shirt-luna-03.webp"
    ],
    descricao: "Camiseta leve com tecnologia Dry-Fit que afasta o suor. Toque extremamente suave, caimento fluido e secagem ultra rápida. Essencial para compor qualquer look de treino.",
    variantes: [
      { tamanho: "P", estoque: 7 },
      { tamanho: "M", estoque: 9 },
      { tamanho: "G", estoque: 16 },
      { tamanho: "GG", estoque: 8 }
    ],
    destaque: true
  },
  {
    id: "top-vitoria",
    nome: "Top Vitória",
    categoria: "Top",
    preco: 119.90,
    imagem: "https://i.ibb.co/SwsBrmry/top-vitoria-01.webp",
    imagens_extra: [
      "https://i.ibb.co/5XtYz2hC/top-vitoria-02.webp",
      "https://i.ibb.co/xqttnbJX/top-vitoria-03.webp",
      "https://i.ibb.co/d4ChdnjT/top-vitoria-04.webp"
    ],
    descricao: "Top com recortes anatômicos contrastantes e tiras finas elegantes. Une estética moderna, respirabilidade estratégica e excelente sustentação para seu busto.",
    variantes: [
      { tamanho: "P", estoque: 4 },
      { tamanho: "M", estoque: 7 },
      { tamanho: "G", estoque: 13 },
      { tamanho: "GG", estoque: 6 }
    ]
  },
  {
    id: "cropped-bianca",
    nome: "Cropped Bianca",
    categoria: "Cropped",
    preco: 119.90,
    imagem: "https://i.ibb.co/8LgP8qL2/cropped-bianca-01.webp",
    imagens_extra: [
      "https://i.ibb.co/pBhZHcmJ/cropped-bianca-02.webp",
      "https://i.ibb.co/Dg8PzKx1/cropped-bianca-03.webp",
      "https://i.ibb.co/vCxCsPHX/cropped-bianca-04.webp",
      "https://i.ibb.co/RG4Fnnsc/cropped-bianca-05.webp"
    ],
    descricao: "Cropped de manga curta confeccionado em malha canelada de alta tecnologia. Confortável, versátil e ideal para transitar entre o treino e o dia a dia com elegância.",
    variantes: [
      { tamanho: "Único", estoque: 21 }
    ]
  },
  {
    id: "top-thaty",
    nome: "Top Thaty",
    categoria: "Top",
    preco: 119.90,
    imagem: "https://i.ibb.co/36SLHH1/top-thaty-01.webp",
    imagens_extra: [
      "https://i.ibb.co/JFkV7hrp/top-thaty-02.webp",
      "https://i.ibb.co/Q31szTWK/top-thaty-03.webp",
      "https://i.ibb.co/QFfzyyZ2/top-thaty-04.webp"
    ],
    descricao: "Top nadador clássico com elástico premium de alta sustentação. Tecido duplo que impede transparência e oferece compressão ideal para corrida de rua ou treinos de alta rotação.",
    variantes: [
      { tamanho: "P", estoque: 7 },
      { tamanho: "M", estoque: 4 },
      { tamanho: "G", estoque: 3 },
      { tamanho: "GG", estoque: 3 }
    ]
  },
  {
    id: "macaquinho-vitoria",
    nome: "Macaquinho Vitória",
    categoria: "Macaquinho",
    preco: 199.90,
    imagem: "https://i.ibb.co/TxGZxxdM/macaquinho-vitoria-01.webp",
    imagens_extra: ["https://i.ibb.co/Txyp9nM4/macaquinho-vitoria-02.webp"],
    descricao: "Macaquinho esportivo de alcinhas, ideal para práticas que exigem leveza e flexibilidade como yoga, pilates ou musculação. Modela perfeitamente sem marcar.",
    variantes: [
      { tamanho: "P", estoque: 5 },
      { tamanho: "M", estoque: 1 },
      { tamanho: "G", estoque: 5 }
    ]
  },
  {
    id: "top-laila",
    nome: "Top Laila",
    categoria: "Top",
    preco: 119.90,
    imagem: "https://i.ibb.co/VWZsQvCm/top-laila-01.webp",
    imagens_extra: [
      "https://i.ibb.co/jZ84sdNV/top-laila-02.webp",
      "https://i.ibb.co/d4rZ7Xyt/top-laila-03.webp",
      "https://i.ibb.co/4n8P9kcD/top-laila-04.webp"
    ],
    descricao: "Top refinado com decote cruzado e bojo removível de alta densidade. Oferece visual sofisticado ao busto, ideal para treinos de força e rotinas ativas cotidianas.",
    variantes: [
      { tamanho: "P", estoque: 4 },
      { tamanho: "M", estoque: 5 },
      { tamanho: "G", estoque: 4 },
      { tamanho: "GG", estoque: 4 }
    ]
  },
  {
    id: "regata-renata",
    nome: "Regata Renata",
    categoria: "Regata",
    preco: 89.90,
    imagem: "https://i.ibb.co/PZdr5DT9/regata-renata-01.webp",
    imagens_extra: [
      "https://i.ibb.co/cKWJZvgR/regata-renata-02.webp",
      "https://i.ibb.co/BVgnBF8J/regata-renata-03.webp",
      "https://i.ibb.co/4npksJrh/regata-renata-04.webp"
    ],
    descricao: "Regata cavada com acabamento em viés macio e tecido respirável de secagem rápida. Caimento mais solto que proporciona extremo frescor e liberdade térmica.",
    variantes: [
      { tamanho: "P", estoque: 2 },
      { tamanho: "M", estoque: 9 },
      { tamanho: "G", estoque: 3 },
      { tamanho: "GG", estoque: 1 }
    ]
  },
  {
    id: "top-bruna",
    nome: "Top Bruna",
    categoria: "Top",
    preco: 109.90,
    imagem: "https://i.ibb.co/FLDYS0hX/top-bruna-01.webp",
    imagens_extra: ["https://i.ibb.co/Rp5wVmLg/top-bruna-02.webp"],
    descricao: "Top esportivo básico com elástico invisível e decote em U. Desenvolvido para oferecer conforto diário com visual clean que combina com qualquer sobreposição.",
    variantes: [
      { tamanho: "P", estoque: 2 },
      { tamanho: "M", estoque: 5 },
      { tamanho: "G", estoque: 7 },
      { tamanho: "GG", estoque: 1 }
    ]
  },
  {
    id: "regata-karina",
    nome: "Regata Karina",
    categoria: "Regata",
    preco: 89.90,
    imagem: "https://i.ibb.co/Zp9S7qp5/regata-karina-01.webp",
    imagens_extra: [
      "https://i.ibb.co/JW6YxH6K/regata-karina-02.webp",
      "https://i.ibb.co/dJ4XL1Pt/regata-karina-03.webp",
      "https://i.ibb.co/zVkPsLRv/regata-karina-04.webp"
    ],
    descricao: "Regata fitness costas nadador ultra-macia. Corte acinturado que acompanha as linhas do corpo, mantendo a ventilação impecável para corridas sob o sol.",
    variantes: [
      { tamanho: "P", estoque: 5 },
      { tamanho: "M", estoque: 2 },
      { tamanho: "G", estoque: 4 },
      { tamanho: "GG", estoque: 3 }
    ]
  },
  {
    id: "legging-thaty",
    nome: "Legging Thaty",
    categoria: "Legging",
    preco: 179.90,
    imagem: "https://i.ibb.co/vCWtsFFR/legging-thaty-01.webp",
    imagens_extra: [
      "https://i.ibb.co/bMKqvSDS/legging-thaty-02.webp",
      "https://i.ibb.co/gbMRYdj9/legging-thaty-03.webp"
    ],
    descricao: "Calça legging premium de cintura ultra alta com compressão inteligente que modela o abdômen sem causar desconforto. Zero transparência com durabilidade eterna.",
    variantes: [
      { tamanho: "P", estoque: 4 },
      { tamanho: "M", estoque: 5 },
      { tamanho: "G", estoque: 3 },
      { tamanho: "GG", estoque: 2 }
    ],
    destaque: true
  },
  {
    id: "top-rebeca",
    nome: "Top Rebeca",
    categoria: "Top",
    preco: 119.90,
    imagem: "https://i.ibb.co/cdqDQR3/top-rebeca-01.webp",
    imagens_extra: [
      "https://i.ibb.co/hqpG6Xh/top-rebeca-02.webp",
      "https://i.ibb.co/gbq3pLFv/top-rebeca-03.webp",
      "https://i.ibb.co/PzGmz6b2/top-rebeca-04.webp"
    ],
    descricao: "Top frente-única esportivo de design deslumbrante. Proporciona incrível beleza às costas mantendo segurança firme e toque suave ideal para treinos de braço.",
    variantes: [
      { tamanho: "P", estoque: 2 },
      { tamanho: "M", estoque: 4 },
      { tamanho: "G", estoque: 5 }
    ]
  },
  {
    id: "regata-daniela",
    nome: "Regata Daniela",
    categoria: "Regata",
    preco: 89.90,
    imagem: "https://i.ibb.co/RTWYHhzy/regata-daniela-01.webp",
    imagens_extra: [],
    descricao: "Regata soltinha, confeccionada em poliamida com proteção UV. Leve como o vento, é a companheira perfeita para treinos ao ar livre de longa duração.",
    variantes: [
      { tamanho: "P", estoque: 3 },
      { tamanho: "GG", estoque: 4 }
    ]
  },
  {
    id: "top-sophia",
    nome: "Top Sophia",
    categoria: "Top",
    preco: 119.90,
    imagem: "https://i.ibb.co/x8Jf9QTj/top-sophia-01.webp",
    imagens_extra: [
      "https://i.ibb.co/7xcjPHRg/top-sophia-02.webp",
      "https://i.ibb.co/d4yB9Ffg/top-sophia-03.webp"
    ],
    descricao: "Top com decote quadrado moderno e cós largo. Excelente encaixe anatômico e tecido de alta densidade que minimiza as oscilações musculares durante saltos.",
    variantes: [
      { tamanho: "P", estoque: 2 },
      { tamanho: "M", estoque: 1 },
      { tamanho: "G", estoque: 2 },
      { tamanho: "GG", estoque: 1 }
    ]
  },
  {
    id: "macaquinho-tradicional",
    nome: "Macaquinho Tradicional",
    categoria: "Macaquinho",
    preco: 189.90,
    imagem: "https://i.ibb.co/WpYjth33/macaquinho-01.webp",
    imagens_extra: [
      "https://i.ibb.co/s9rwNJHX/macaquinho-02.webp",
      "https://i.ibb.co/zH5FdPVG/macaquinho-03.webp",
      "https://i.ibb.co/WWJXQP1j/macaquinho-04.webp",
      "https://i.ibb.co/GfS4LLnt/macaquinho-05.webp"
    ],
    descricao: "Macaquinho clássico curto de compressão moderada. Costura reforçada anti-atrito nas pernas, excelente modelagem que traz uma incrível silhueta atleticamente harmoniosa.",
    variantes: [
      { tamanho: "P", estoque: 2 },
      { tamanho: "M", estoque: 2 },
      { tamanho: "G", estoque: 1 }
    ]
  },
  {
    id: "cropped-tule",
    nome: "Cropped Tule",
    categoria: "Cropped",
    preco: 99.90,
    imagem: "https://i.ibb.co/sv1xfnb1/cropped-tule-01.webp",
    imagens_extra: [],
    descricao: "Cropped transparente em tule esportivo macio. O toque perfeito de sofisticação e respirabilidade para usar por cima de tops coloridos no pré ou pós treino.",
    variantes: [
      { tamanho: "Único", estoque: 2 }
    ]
  },
  {
    id: "macacao-thaty",
    nome: "Macacão Thaty",
    categoria: "Macacão",
    preco: 239.90,
    imagem: "https://i.ibb.co/MD6HfW9H/macacao-gabriela-01.webp",
    imagens_extra: [
      "https://i.ibb.co/4ZP9Ds5J/macacao-gabriela-03.webp",
      "https://i.ibb.co/gbMRYdj9/legging-thaty-03.webp"
    ],
    descricao: "Macacão longo anatômico com excelente sustentação dorsal. Desenvolvido para modelar suas curvas com o máximo conforto e zero atrito durante agachamentos intensos.",
    variantes: [
      { tamanho: "P", estoque: 5 },
      { tamanho: "M", estoque: 8 },
      { tamanho: "G", estoque: 15 }
    ]
  },
  {
    id: "shorts-vitoria",
    nome: "Shorts Vitória",
    categoria: "Shorts",
    preco: 129.90,
    imagem: "https://i.ibb.co/cctTZGfm/shorts-beatriz-02.webp",
    imagens_extra: [
      "https://i.ibb.co/V04t6rMX/shorts-beatriz-03.webp"
    ],
    descricao: "Shorts de corrida leve e elástico. Caimento seguro que acompanha cada passo de seus movimentos dinâmicos, com tecido de toque frio refrescante.",
    variantes: [
      { tamanho: "P", estoque: 4 },
      { tamanho: "M", estoque: 9 },
      { tamanho: "G", estoque: 14 },
      { tamanho: "GG", estoque: 6 }
    ]
  },
  {
    id: "tshirt-carol",
    nome: "T-shirt Carol",
    categoria: "T-shirt",
    preco: 99.90,
    imagem: "https://i.ibb.co/fYqNNSr2/t-shirt-luna-01.webp",
    imagens_extra: ["https://i.ibb.co/b5fVzZgm/t-shirt-luna-03.webp"],
    descricao: "T-shirt básica poliamida leve. Conforto térmico inigualável com sensação de leveza contínua para suas rotinas agitadas.",
    variantes: [
      { tamanho: "P", estoque: 4 },
      { tamanho: "M", estoque: 3 },
      { tamanho: "G", estoque: 2 },
      { tamanho: "GG", estoque: 1 }
    ]
  },
  {
    id: "shorts-rebeca",
    nome: "Shorts Rebeca",
    categoria: "Shorts",
    preco: 129.90,
    imagem: "https://i.ibb.co/k2HpFbsN/shorts-beatriz-01.webp",
    imagens_extra: ["https://i.ibb.co/V04t6rMX/shorts-beatriz-03.webp"],
    descricao: "Shorts de alta elasticidade com cós médio. Textura macia e caimento firme que garante liberdade em qualquer tipo de alongamento.",
    variantes: [
      { tamanho: "P", estoque: 4 },
      { tamanho: "M", estoque: 3 },
      { tamanho: "G", estoque: 1 }
    ]
  },
  {
    id: "shorts-bruna",
    nome: "Shorts Bruna",
    categoria: "Shorts",
    preco: 129.90,
    imagem: "https://i.ibb.co/cctTZGfm/shorts-beatriz-02.webp",
    imagens_extra: ["https://i.ibb.co/V04t6rMX/shorts-beatriz-03.webp"],
    descricao: "Shorts versátil com modelagem confortável. Ideal para o uso cotidiano ou treinos aeróbicos leves com secagem super rápida.",
    variantes: [
      { tamanho: "P", estoque: 2 },
      { tamanho: "M", estoque: 2 },
      { tamanho: "G", estoque: 1 }
    ]
  },
  {
    id: "top-sophia-alcinha",
    nome: "Top Sophia de Alcinha",
    categoria: "Top",
    preco: 109.90,
    imagem: "https://i.ibb.co/7xcjPHRg/top-sophia-02.webp",
    imagens_extra: ["https://i.ibb.co/d4yB9Ffg/top-sophia-03.webp"],
    descricao: "Versão delicada do top Sophia, com alças finas reguláveis que trazem leveza visual sem perder a compressão necessária para musculação.",
    variantes: [
      { tamanho: "P", estoque: 1 }
    ]
  },
  {
    id: "tshirt-tule",
    nome: "T-shirt Tule",
    categoria: "T-shirt",
    preco: 99.90,
    imagem: "https://i.ibb.co/Xkfb3yXZ/t-shirt-tule-01.webp",
    imagens_extra: [],
    descricao: "Camiseta de tule esportivo com toque gelado. Linda sobreposição de modelagem soltinha que proporciona ventilação extrema.",
    variantes: [
      { tamanho: "P", estoque: 0 },
      { tamanho: "M", estoque: 0 },
      { tamanho: "G", estoque: 0 },
      { tamanho: "GG", estoque: 0 },
      { tamanho: "Único", estoque: 0 }
    ]
  }
];
