import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { LogoBadge } from "./LogoBadge";

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      onDone();
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(onDone, 2400);
    return () => {
      window.clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, [reduce, onDone]);

  return (
    <motion.div
      role="status"
      aria-label="Carregando"
      className="fixed inset-0 z-[100] grid place-items-center bg-[#05070b]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.15 } }}
      onClick={onDone}
    >
      <motion.div
        className="w-[min(78vw,460px)]"
        exit={{ scale: 0.55, y: -40, opacity: 0, transition: { duration: 0.55, ease: [0.7, 0, 0.84, 0] } }}
      >
        <LogoBadge animated className="h-auto w-full drop-shadow-[0_30px_60px_rgba(31,111,235,0.25)]" />
      </motion.div>
    </motion.div>
  );
}
