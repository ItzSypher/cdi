import { useEffect, type ReactNode } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { FOX } from "../lib/dados";

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/** Número que corre até o valor novo. */
export function Contador({ value, className }: { value: number; className?: string }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => brl(Math.round(v)));

  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [value, reduce, mv]);

  return <motion.span className={`tnum ${className ?? ""}`}>{text}</motion.span>;
}

/** Entrada suave ao rolar. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
}

/** Único CTA de contato da página. Mesmo rótulo em todo lugar. */
export function FoxCTA({ className = "", variant = "solid" }: { className?: string; variant?: "solid" | "ghost" }) {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-[15px] font-bold transition-transform duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
  const look =
    variant === "solid"
      ? "bg-accent text-accent-ink hover:-translate-y-0.5 shadow-[0_12px_30px_-12px_var(--accent)]"
      : "border border-line bg-surface text-ink hover:-translate-y-0.5";
  return (
    <a href={FOX.whatsappLink} target="_blank" rel="noopener" className={`${base} ${look} ${className}`}>
      Falar com a Fox TI
    </a>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}
