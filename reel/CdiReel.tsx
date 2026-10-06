import { useEffect, useState, type ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  continueRender,
  delayRender,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { LOGO, LOGO_COLORS as C } from "../src/lib/logo-geometry";
import { PREMISSAS_INICIAIS, calcular } from "../src/lib/calculo";

const BG = "#05070b";
const INK = "#eef3f9";
const MUTED = "#98a6b8";
const ACCENT = "#2f7bf0";
const RED = "#ff6b6f";
const ease = Easing.bezier(0.16, 1, 0.3, 1);

const r = calcular(PREMISSAS_INICIAIS);
const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/** sobe e aparece a partir do frame `at` */
function Rise({ at, children, dist = 60 }: { at: number; children: ReactNode; dist?: number }) {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * dist}px)` }}>{children}</div>;
}

/** cada cena some nos últimos frames */
function Cena({ dur, children }: { dur: number; children: ReactNode }) {
  const f = useCurrentFrame();
  const out = interpolate(f, [dur - 12, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoom = interpolate(f, [0, dur], [1, 1.04]);
  return (
    <AbsoluteFill style={{ opacity: out, transform: `scale(${zoom})`, padding: "0 90px", justifyContent: "center" }}>
      {children}
    </AbsoluteFill>
  );
}

const h1: React.CSSProperties = { fontSize: 112, fontWeight: 800, lineHeight: 1.02, letterSpacing: -4, color: INK, margin: 0 };

function Procura() {
  return (
    <Cena dur={150}>
      <Rise at={6}>
        <p style={{ ...h1, color: MUTED, fontSize: 64, fontWeight: 700, letterSpacing: -1 }}>Alguém procurou</p>
      </Rise>
      <Rise at={18}>
        <p style={h1}>a CDI hoje.</p>
      </Rise>
      <div style={{ height: 80 }} />
      <Rise at={62}>
        <p style={{ ...h1, color: MUTED, fontSize: 64, fontWeight: 700, letterSpacing: -1 }}>E achou</p>
      </Rise>
      <Rise at={74}>
        <p style={{ ...h1, fontSize: 150, color: ACCENT }}>a Nevaska.</p>
      </Rise>
    </Cena>
  );
}

const CHIPS = ["Nome antigo", "Telefone fixo antigo", "Endereço 2861", "Sábado “fechado”", "Nenhum produto"];

function SiteAntigo() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const up = spring({ frame: f, fps, config: { damping: 18 } });
  const risco = interpolate(f, [105, 125], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <Cena dur={150}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 50 }}>
        <Rise at={0}>
          <p style={{ ...h1, fontSize: 72, textAlign: "center" }}>O site que aparece:</p>
        </Rise>
        <div style={{ position: "relative", transform: `translateY(${(1 - up) * 400}px)`, opacity: up }}>
          <div style={{ width: 560, height: 1000, borderRadius: 64, background: "#0b0f16", padding: 18, boxShadow: "0 40px 120px rgba(31,111,235,0.25)" }}>
            <Img src={staticFile("antes/ueni-mobile.webp")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", borderRadius: 48 }} />
          </div>
          <svg viewBox="0 0 560 1036" style={{ position: "absolute", inset: 0 }}>
            <path d="M40 60 L520 980" stroke={RED} strokeWidth={22} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - risco} />
          </svg>
          <div style={{ position: "absolute", right: -70, top: 330, display: "flex", flexDirection: "column", gap: 22, alignItems: "flex-end" }}>
            {CHIPS.map((c, i) => {
              const s = spring({ frame: f - 30 - i * 12, fps, config: { damping: 14 } });
              return (
                <div key={c} style={{ transform: `scale(${s})`, transformOrigin: "right center", background: RED, color: "#1a0506", fontSize: 38, fontWeight: 800, padding: "16px 28px", borderRadius: 999 }}>
                  {c}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Cena>
  );
}

function Custo() {
  const f = useCurrentFrame();
  const n = interpolate(f, [30, 85], [0, r.perdaMes], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const a = interpolate(f, [90, 120], [0, r.perdaAno], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <Cena dur={150}>
      <Rise at={0}>
        <p style={{ ...h1, fontSize: 84 }}>Quanto custa ficar assim?</p>
      </Rise>
      <div style={{ height: 70 }} />
      <Rise at={24}>
        <p style={{ ...h1, fontSize: 190, fontVariantNumeric: "tabular-nums" }}>{brl(Math.round(n))}</p>
        <p style={{ fontSize: 52, fontWeight: 700, color: MUTED, margin: "10px 0 0" }}>por mês em vendas que vão pra outra loja</p>
      </Rise>
      <div style={{ height: 60 }} />
      <Rise at={88}>
        <p style={{ ...h1, fontSize: 100, color: ACCENT, fontVariantNumeric: "tabular-nums" }}>{brl(Math.round(a))} por ano</p>
      </Rise>
      <Rise at={100}>
        <p style={{ fontSize: 34, fontWeight: 500, color: MUTED, marginTop: 40 }}>Simulação com 120 buscas por mês, 15% de fechamento e ticket de R$ 450.</p>
      </Rise>
    </Cena>
  );
}

function LogoDesenhado({ p }: { p: number }) {
  const seg = (a: number, b: number) => interpolate(p, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const draw = (a: number, b: number) => ({ pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - seg(a, b) });
  const fade = (a: number) => ({ opacity: seg(a, a + 0.15) });
  const L = { fill: "none", strokeWidth: 34 };
  return (
    <svg viewBox="0 0 600 600" style={{ width: 760, height: 760 }}>
      <defs>
        <linearGradient id="sw" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={C.white} />
          <stop offset="1" stopColor={C.blue} />
        </linearGradient>
      </defs>
      <circle cx="300" cy="300" r="284" fill={C.ink} style={fade(0)} />
      <circle cx="300" cy="300" r="284" fill="none" stroke={C.blue} strokeWidth={16} transform="rotate(-90 300 300)" {...draw(0, 0.45)} />
      <path d={LOGO.swooshTop} fill="url(#sw)" style={fade(0.35)} />
      <path d={LOGO.swooshBottom} fill={C.blue} style={fade(0.4)} />
      <path d={LOGO.letterC} stroke={C.white} {...L} {...draw(0.3, 0.6)} />
      <path d={LOGO.letterD} stroke={C.blue} {...L} {...draw(0.4, 0.7)} />
      <path d={LOGO.letterI} stroke={C.white} {...L} {...draw(0.5, 0.65)} />
      <g style={fade(0.6)}>
        <path d={LOGO.snowTop} fill="none" stroke={C.white} strokeWidth={4} strokeLinecap="round" />
        <path d={LOGO.refrigeracao} fill={C.white} />
        <path d={LOGO.rule} stroke={C.blue} strokeWidth={2} />
        <path d={LOGO.tagline} fill={C.white} />
      </g>
      <g style={fade(0.75)}>
        <path d={LOGO.snowLeft} fill="none" stroke={C.white} strokeWidth={4} strokeLinecap="round" />
        <path d={LOGO.acBody} fill={C.white} />
        <path d={LOGO.acSlot} stroke={C.ink} strokeWidth={3} />
        <path d={LOGO.acAir} stroke={C.blue} strokeWidth={3} strokeLinecap="round" />
        <path d={LOGO.tools} fill="none" stroke={C.white} strokeWidth={7} strokeLinecap="round" />
        <path d={LOGO.toolsGrip} stroke={C.white} strokeWidth={12} strokeLinecap="round" />
      </g>
    </svg>
  );
}

function Virada() {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 90px" }}>
      <LogoDesenhado p={p} />
      <div style={{ height: 50 }} />
      <Rise at={62}>
        <p style={{ ...h1, fontSize: 92, textAlign: "center" }}>Hora de ser encontrada.</p>
      </Rise>
      <div style={{ height: 120 }} />
      <Rise at={84} dist={30}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <p style={{ fontSize: 36, fontWeight: 700, color: MUTED, margin: 0 }}>Proposta</p>
          <Img src={staticFile("fox-ti-logo.webp")} style={{ height: 120 }} />
        </div>
      </Rise>
    </AbsoluteFill>
  );
}

export function CdiReel() {
  const [handle] = useState(() => delayRender("fontes"));
  useEffect(() => {
    Promise.all(["500", "700", "800"].map((w) => document.fonts.load(`${w} 40px Manrope`))).then(() => continueRender(handle));
  }, [handle]);

  const f = useCurrentFrame();
  const glow = interpolate(f, [0, 600], [0, 360]);

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: "Manrope, sans-serif" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 40% at ${50 + 30 * Math.cos((glow * Math.PI) / 180)}% 15%, rgba(31,111,235,0.28), transparent 70%)`,
        }}
      />
      <Sequence durationInFrames={150}>
        <Procura />
      </Sequence>
      <Sequence from={150} durationInFrames={150}>
        <SiteAntigo />
      </Sequence>
      <Sequence from={300} durationInFrames={150}>
        <Custo />
      </Sequence>
      <Sequence from={450} durationInFrames={150}>
        <Virada />
      </Sequence>
    </AbsoluteFill>
  );
}
