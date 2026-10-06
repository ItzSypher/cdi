// Fatos usados na página. Tudo aqui vem do Instagram @cdirefrigeracao ou do
// site atual (nevaska-refrigeracao.ueniweb.com), conferidos em out/2026.

export const CDI = {
  nome: "CDI Refrigeração",
  instagram: "https://www.instagram.com/cdirefrigeracao/",
  arroba: "@cdirefrigeracao",
  whatsapp: "(21) 99988-0115",
  whatsappLink: "https://wa.me/5521999880115",
  endereco: "Av. Abílio Augusto Távora, 2591, Jardim Nova Era, Nova Iguaçu",
  horario: [
    ["Segunda a sexta", "8h às 18h"],
    ["Sábado", "8h às 12h"],
    ["Domingo", "Fechado"],
  ],
  posts: 54,
  seguidores: "4.763",
} as const;

export const SITE_ANTIGO = {
  url: "nevaska-refrigeracao.ueniweb.com",
  href: "https://nevaska-refrigeracao.ueniweb.com",
  nome: "Nevaska Refrigeração",
  telefone: "(21) 2698-7363",
  numero: "2861",
} as const;

// Divergências entre o que o site antigo publica e o que a CDI é hoje.
export const DIVERGENCIAS = [
  { campo: "Nome", antigo: "Nevaska Refrigeração", atual: "CDI Refrigeração" },
  { campo: "Telefone", antigo: "(21) 2698-7363, fixo", atual: "(21) 99988-0115, WhatsApp" },
  { campo: "Endereço", antigo: "Av. Abílio Augusto Távora, 2861", atual: "Av. Abílio Augusto Távora, 2591" },
  { campo: "Sábado", antigo: "Fechado", atual: "Aberto das 8h às 12h" },
  { campo: "O que vende", antigo: "Um serviço: limpeza de split", atual: "Peças, gás, compressores, ferramentas e instalação" },
] as const;

// Ofertas publicadas no Instagram. Servem só de exemplo para a prévia.
export const OFERTAS = [
  { item: "Gás R410A", detalhe: "Cilindro", preco: "889,90" },
  { item: "Split Philco 12.000 BTUs", detalhe: "Hi-Wall", preco: "1.890,00" },
  { item: "Compressor 12k", detalhe: "220V, R410", preco: "480,00" },
  { item: "Gás R134a", detalhe: "Lata 750g", preco: "65,00" },
  { item: "Furadeira de impacto", detalhe: "Bomvink", preco: "148,90" },
  { item: "Gás MAP", detalhe: "400g", preco: "20,99" },
] as const;

export const FOX = {
  nome: "Fox TI Solutions",
  site: "https://foxtisolutions.com.br",
  telefone: "(21) 2070-6930",
  whatsappLink:
    "https://wa.me/552120706930?text=" +
    encodeURIComponent("Olá, Fox TI. Vi a proposta da CDI Refrigeração e quero conversar."),
} as const;
