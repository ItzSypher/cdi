import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, InstagramLogo, Lock } from "@phosphor-icons/react";
import { CDI, DIVERGENCIAS, SITE_ANTIGO } from "../lib/dados";
import { Container, Reveal } from "./ui";

export function Hoje() {
  return (
    <section id="hoje" className="scroll-mt-16 py-20 sm:py-28">
      <Container>
        <Reveal>
          <h2 className="max-w-[18ch] text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            O que o cliente encontra quando procura vocês
          </h2>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted">
            Esse site funcionou quando a empresa era a Nevaska. A CDI cresceu, mudou de nome, ganhou estoque e WhatsApp.
            O site continuou igual.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <figure className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="flex gap-1.5" aria-hidden>
                  <i className="h-2.5 w-2.5 rounded-full bg-line" />
                  <i className="h-2.5 w-2.5 rounded-full bg-line" />
                  <i className="h-2.5 w-2.5 rounded-full bg-line" />
                </span>
                <span className="ml-2 flex min-w-0 items-center gap-1.5 rounded-full bg-bg-soft px-3 py-1 text-xs text-muted">
                  <Lock size={12} weight="bold" aria-hidden />
                  <span className="truncate">{SITE_ANTIGO.url}</span>
                </span>
              </div>
              <img
                src="/antes/ueni-desktop.webp"
                alt="Página inicial do site atual, com o nome Nevaska Refrigeração, telefone fixo e foto de banco de imagem"
                width={1440}
                height={900}
                loading="lazy"
                className="h-auto w-full"
              />
            </figure>
            <figcaption className="mt-3 text-sm text-muted">
              Captura de {SITE_ANTIGO.url}, feita em outubro de 2026.
            </figcaption>
          </Reveal>

          <ul className="grid gap-3">
            {DIVERGENCIAS.map((d, i) => (
              <Reveal as="li" key={d.campo} delay={i * 0.05} className="rounded-2xl border border-line bg-surface p-5">
                <p className="text-sm font-bold text-muted">{d.campo}</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                  <p className="text-[15px] text-muted line-through decoration-[#e5484d]/70 decoration-2">{d.antigo}</p>
                  <ArrowRight size={16} weight="bold" className="hidden text-accent sm:block" aria-hidden />
                  <p className="text-[15px] font-bold">{d.atual}</p>
                </div>
              </Reveal>
            ))}
            <Reveal as="li" delay={0.3} className="px-1 pt-2 text-[15px] leading-relaxed text-muted">
              O texto é o padrão da plataforma e fala até de aquecimento. A foto é de banco de imagem. E o modelo usado por
              trás da página, segundo o próprio código, é o de pintor.
            </Reveal>
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function Instagram() {
  const reduce = useReducedMotion();
  return (
    <section className="overflow-hidden border-y border-line bg-bg-soft py-20 sm:py-28">
      <Container>
        <Reveal>
          <p className="max-w-[22ch] text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            {CDI.posts} posts. {CDI.seguidores} seguidores. Nenhum endereço pra onde mandar essa gente.
          </p>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">
            As artes são boas e os preços estão lá. Só que post sai do feed em poucos dias, não aparece no Google, e o link da
            bio cai direto no WhatsApp: sem catálogo, sem endereço, sem horário.
          </p>
          <a
            href={CDI.instagram}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
          >
            <InstagramLogo size={18} weight="bold" aria-hidden /> {CDI.arroba}
          </a>
        </Reveal>
      </Container>

      <div className="relative mt-12" aria-hidden>
        <motion.div
          className="flex w-max gap-4"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        >
          {[0, 1, 2, 3].map((k) => (
            <img
              key={k}
              src="/antes/instagram-grid.webp"
              alt=""
              width={602}
              height={802}
              loading="lazy"
              className="h-[300px] w-auto rounded-2xl border border-line sm:h-[420px]"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const PERGUNTAS = [
  "loja de peças de refrigeração em Nova Iguaçu",
  "onde comprar gás R410A perto de mim",
  "telefone da CDI Refrigeração",
];

export function IA() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Google e IA</p>
          <h2 className="mt-4 max-w-[22ch] text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            O cliente pergunta pro celular. O celular responde com o que está publicado.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-6">
          <Reveal className="rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:col-span-3 lg:row-span-2">
            <div className="grid gap-3">
              {PERGUNTAS.map((q, i) => (
                <Reveal key={q} delay={0.1 + i * 0.12}>
                  <div className="ml-auto w-fit max-w-full rounded-2xl rounded-br-md bg-accent px-4 py-3 text-[15px] font-semibold text-accent-ink">
                    {q}
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.5}>
                <div className="w-fit max-w-full rounded-2xl rounded-bl-md border border-line bg-bg-soft px-4 py-3 text-[15px] text-muted">
                  Encontrei estas opções na região...
                </div>
              </Reveal>
            </div>
            <p className="mt-8 max-w-[52ch] text-[15px] leading-relaxed text-muted">
              ChatGPT, Gemini e o resumo com IA do Google montam a resposta a partir de sites, perfis no Google e dados
              estruturados. A CDI não tem site próprio. Então, quando entra na resposta, entra com o que a Nevaska deixou
              publicado.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="overflow-hidden rounded-2xl border border-line bg-[#0a0f17] p-6 text-[#cfe0ff] sm:p-8 lg:col-span-3">
            <p className="text-sm font-bold text-[#8fb4ff]">O que o código do site antigo informa ao Google</p>
            <pre className="mt-4 overflow-x-auto text-[13px] leading-relaxed sm:text-sm">
              <code>
                <span className="text-[#7d8aa0]">{"{"}</span>
                {"\n  "}
                <span className="text-[#8fb4ff]">"@type"</span>: <span>"LocalBusiness"</span>,
                {"\n  "}
                <span className="text-[#8fb4ff]">"name"</span>: <mark className="rounded bg-[#e5484d]/25 px-1 text-[#ffc9cb]">"Nevaska Refrigeração"</mark>,
                {"\n  "}
                <span className="text-[#8fb4ff]">"telephone"</span>: <mark className="rounded bg-[#e5484d]/25 px-1 text-[#ffc9cb]">"+552126987363"</mark>,
                {"\n  "}
                <span className="text-[#8fb4ff]">"streetAddress"</span>: <mark className="rounded bg-[#e5484d]/25 px-1 text-[#ffc9cb]">"Avenida Abílio Augusto Távora, 2861"</mark>
                {"\n"}
                <span className="text-[#7d8aa0]">{"}"}</span>
              </code>
            </pre>
          </Reveal>

          <Reveal delay={0.2} className="rounded-2xl bg-accent p-6 text-accent-ink sm:p-8 lg:col-span-3">
            <p className="text-2xl font-extrabold leading-tight tracking-tight">Aí começa a confusão.</p>
            <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed opacity-90">
              O cliente liga pro fixo antigo, procura o número errado na avenida ou acha que sábado está fechado. Cada
              desencontro é uma venda que vai pra outra loja, e vocês nem ficam sabendo.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function Febrava() {
  return (
    <section className="relative overflow-hidden bg-[#06101f] py-24 text-[#eef3f9] sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: "radial-gradient(60% 80% at 85% 10%, rgba(31,111,235,0.35), transparent 70%)" }}
      />
      <Container className="relative">
        <Reveal>
          <p className="max-w-[24ch] text-[clamp(2rem,5.2vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.035em]">
            No Febrava Rio, alguém vai pegar o cartão da CDI e pesquisar o nome antes de ligar.
          </p>
          <p className="mt-6 max-w-[24ch] text-[clamp(2rem,5.2vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[#5b9bff]">
            Hoje, essa pessoa encontra a Nevaska.
          </p>
          <p className="mt-10 max-w-[52ch] text-lg leading-relaxed text-[#a9b8cc]">
            A feira traz o contato. Se ele vira cliente depende do que aparece no celular dele depois.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
