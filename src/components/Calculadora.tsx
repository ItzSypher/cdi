import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Info } from "@phosphor-icons/react";
import { brl, Contador } from "./ui";
import { calcular, type Premissas } from "../lib/calculo";

export { calcular, PREMISSAS_INICIAIS, type Premissas } from "../lib/calculo";

type Aba = "sem" | "sozinho";

export function Calculadora({ p, setP }: { p: Premissas; setP: (p: Premissas) => void }) {
  const [aba, setAba] = useState<Aba>("sem");
  const r = calcular(p);
  const set = (k: keyof Premissas) => (v: number) => setP({ ...p, [k]: v });

  return (
    <div id="conta" className="scroll-mt-24 rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-7">
      <div role="tablist" aria-label="Cenário" className="relative grid grid-cols-2 rounded-full bg-bg-soft p-1 text-sm font-semibold">
        {(
          [
            ["sem", "Sem presença"],
            ["sozinho", "Fazendo sozinho"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={aba === id}
            onClick={() => setAba(id)}
            className={`relative z-10 rounded-full py-2.5 transition-colors ${aba === id ? "text-accent-ink" : "text-muted hover:text-ink"}`}
          >
            {aba === id && (
              <motion.span
                layoutId="aba-ativa"
                className="absolute inset-0 -z-10 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={aba}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {aba === "sem" ? (
            <>
              <Resultado
                titulo="O que a CDI deixa de vender"
                mes={r.perdaMes}
                ano={r.perdaAno}
              />
              <div className="mt-5 grid gap-4">
                <Faixa
                  label="Pessoas por mês que procuram peça, gás ou instalação e não acham vocês"
                  value={p.buscas} min={20} max={600} step={10}
                  fmt={(v) => `${v}`} onChange={set("buscas")}
                />
                <Faixa
                  label="Quantas delas fechariam com a CDI"
                  value={p.conversao} min={2} max={40} step={1}
                  fmt={(v) => `${v}%`} onChange={set("conversao")}
                />
                <Faixa
                  label="Ticket médio"
                  value={p.ticket} min={50} max={2500} step={10}
                  fmt={brl} onChange={set("ticket")}
                />
              </div>
            </>
          ) : (
            <>
              <Resultado titulo="O custo de tentar sozinho" mes={r.sozinhoMes} ano={r.sozinhoAno} />
              <p className="mt-2 text-sm text-muted">
                <span className="tnum font-semibold text-ink">{brl(Math.round(r.horasMes))}</span> em horas por mês, mais{" "}
                <span className="tnum font-semibold text-ink">{brl(Math.round(r.escapaMes))}</span> que continuam escapando.
              </p>
              <div className="mt-5 grid gap-4">
                <Faixa
                  label="Horas por semana postando, mexendo no site e respondendo direct"
                  value={p.horas} min={1} max={20} step={1}
                  fmt={(v) => `${v}h`} onChange={set("horas")}
                />
                <Faixa
                  label="Quanto vale a hora de quem faz isso"
                  value={p.valorHora} min={20} max={200} step={5}
                  fmt={brl} onChange={set("valorHora")}
                />
                <Faixa
                  label="Quanto da perda o esforço próprio recupera"
                  value={p.recupera} min={0} max={60} step={5}
                  fmt={(v) => `${v}%`} onChange={set("recupera")}
                />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <p className="mt-5 flex gap-2 text-xs leading-relaxed text-muted">
        <Info size={16} weight="bold" className="mt-0.5 shrink-0" aria-hidden />
        Simulação. Os valores iniciais são exemplo: arraste com os números reais da loja.
      </p>
    </div>
  );
}

function Resultado({ titulo, mes, ano }: { titulo: string; mes: number; ano: number }) {
  return (
    <div className="mt-6">
      <p className="text-sm font-semibold text-muted">{titulo}</p>
      <p className="mt-1 text-[clamp(2.4rem,6vw,3.6rem)] font-extrabold leading-none tracking-tight">
        <Contador value={mes} />
        <span className="ml-2 text-base font-semibold text-muted">/mês</span>
      </p>
      <p className="mt-2 text-sm text-muted">
        Em um ano: <Contador value={ano} className="font-bold text-accent" />
      </p>
    </div>
  );
}

function Faixa({
  label, value, min, max, step, fmt, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="grid gap-1">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[13px] font-medium leading-snug text-ink/85">{label}</label>
        <span className="tnum shrink-0 text-sm font-bold">{fmt(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        className="faixa"
        min={min} max={max} step={step} value={value}
        style={{ ["--p" as string]: `${pct}%` }}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
