import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig } from "motion/react";
import { Preloader } from "./components/Preloader";
import { Hero, Nav } from "./components/Topo";
import { Febrava, Hoje, IA, Instagram } from "./components/Diagnostico";
import { ComoFica, Final, Plano, Rodape } from "./components/Proposta";
import { PREMISSAS_INICIAIS, type Premissas } from "./components/Calculadora";

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [p, setP] = useState<Premissas>(PREMISSAS_INICIAIS);
  const fim = useCallback(() => setCarregando(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{carregando && <Preloader key="pre" onDone={fim} />}</AnimatePresence>
      {!carregando && (
        <>
          <Nav />
          <main>
            <Hero p={p} setP={setP} />
            <Hoje />
            <Instagram />
            <IA />
            <Febrava />
            <ComoFica />
            <Plano p={p} />
            <Final />
          </main>
          <Rodape />
        </>
      )}
    </MotionConfig>
  );
}
