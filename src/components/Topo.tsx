import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Moon, Sun } from "@phosphor-icons/react";
import { LogoBadge } from "./LogoBadge";
import { Calculadora, type Premissas } from "./Calculadora";
import { Container, FoxCTA } from "./ui";

type Tema = "light" | "dark";

function useTema(): [Tema, () => void] {
  const [tema, setTema] = useState<Tema>(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", tema === "dark" ? "#070A10" : "#F2F5F9");
    try {
      localStorage.setItem("cdi-tema", tema);
    } catch {
      /* navegação privada: segue sem lembrar */
    }
  }, [tema]);
  return [tema, () => setTema((t) => (t === "dark" ? "light" : "dark"))];
}

export function Nav() {
  const [tema, alternar] = useTema();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3" aria-label="Início">
          <LogoBadge className="h-10 w-10" />
          <span className="text-[15px] font-extrabold tracking-tight">
            CDI <span className="font-semibold text-muted">Refrigeração</span>
          </span>
        </a>
        <div className="flex items-center gap-2">
          <button
            onClick={alternar}
            aria-label={tema === "dark" ? "Usar tema claro" : "Usar tema escuro"}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition-transform active:scale-95"
          >
            {tema === "dark" ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
          </button>
          <FoxCTA className="hidden !px-5 !py-2.5 !text-sm sm:inline-flex" />
        </div>
      </Container>
    </header>
  );
}

export function Hero({ p, setP }: { p: Premissas; setP: (p: Premissas) => void }) {
  const reduce = useReducedMotion();
  const enter = (d: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative overflow-hidden pt-24 pb-16 lg:flex lg:min-h-[100dvh] lg:items-center lg:pb-20 lg:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--accent-soft), transparent)" }}
      />
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <motion.p {...enter(0.05)} className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            Proposta para a CDI Refrigeração
          </motion.p>
          <motion.h1
            {...enter(0.12)}
            className="mt-4 text-[clamp(2.4rem,6.2vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.035em]"
          >
            Na internet, a CDI ainda se chama <span className="text-accent">Nevaska</span>.
          </motion.h1>
          <motion.p {...enter(0.2)} className="mt-6 max-w-[34ch] text-lg leading-relaxed text-muted sm:text-xl">
            Quem pesquisa vocês encontra outro nome, outro telefone e outro endereço. E fecha com quem apareceu.
          </motion.p>
          <motion.div {...enter(0.28)} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#hoje"
              className="inline-flex items-center rounded-full bg-ink px-6 py-3.5 text-[15px] font-bold text-bg transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Ver o que aparece hoje
            </a>
            <FoxCTA variant="ghost" />
          </motion.div>
        </div>
        <motion.div {...enter(0.35)}>
          <Calculadora p={p} setP={setP} />
        </motion.div>
      </Container>
    </section>
  );
}
