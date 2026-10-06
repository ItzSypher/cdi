export type Premissas = {
  buscas: number;
  conversao: number; // %
  ticket: number;
  horas: number; // por semana
  valorHora: number;
  recupera: number; // % da perda que o "faça você mesmo" recupera
};

export const PREMISSAS_INICIAIS: Premissas = {
  buscas: 120,
  conversao: 15,
  ticket: 450,
  horas: 6,
  valorHora: 50,
  recupera: 25,
};

export function calcular(p: Premissas) {
  const perdaMes = p.buscas * (p.conversao / 100) * p.ticket;
  const horasMes = p.horas * 4.3 * p.valorHora;
  const escapaMes = perdaMes * (1 - p.recupera / 100);
  return {
    perdaMes,
    perdaAno: perdaMes * 12,
    horasMes,
    escapaMes,
    sozinhoMes: horasMes + escapaMes,
    sozinhoAno: (horasMes + escapaMes) * 12,
  };
}
