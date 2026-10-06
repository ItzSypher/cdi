import { Clock, DownloadSimple, MapPin, ShieldCheck, WhatsappLogo } from "@phosphor-icons/react";
import { CDI, FOX, OFERTAS } from "../lib/dados";
import { LogoBadge } from "./LogoBadge";
import { calcular, type Premissas } from "./Calculadora";
import foxLogo from "../assets/fox-ti-logo.webp";
import { brl, Container, Contador, FoxCTA, Reveal } from "./ui";

/** Prévia do site novo da CDI: componente real, rolável, dentro de um celular. */
function PreviaCDI() {
  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      <div className="rounded-[2.6rem] border border-line bg-[#0b0f16] p-2.5 shadow-card">
        <div className="relative h-[620px] overflow-y-auto overscroll-contain rounded-[2.1rem] bg-[#f4f7fb] text-[#0a1220] [scrollbar-width:none]">
          <div className="sticky top-0 z-10 flex items-center gap-2 bg-[#07090d] px-4 py-3 text-white">
            <LogoBadge className="h-8 w-8" />
            <span className="text-sm font-extrabold">CDI Refrigeração</span>
          </div>

          <div className="bg-[#07090d] px-5 pb-7 pt-4 text-white">
            <p className="text-[22px] font-extrabold leading-[1.1] tracking-tight">
              Peças, gás e instalação de ar-condicionado em Nova Iguaçu
            </p>
            <p className="mt-2 text-[13px] text-white/70">Pronta entrega, preço no site e atendimento pelo WhatsApp.</p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1f6feb] px-4 py-2.5 text-[13px] font-bold">
              <WhatsappLogo size={16} weight="fill" aria-hidden /> Chamar no WhatsApp
            </span>
          </div>

          <div className="px-4 py-5">
            <p className="text-[13px] font-extrabold">Ofertas da semana</p>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {OFERTAS.map((o) => (
                <div key={o.item} className="rounded-xl bg-white p-3 shadow-[0_6px_18px_-12px_rgba(16,54,120,0.5)]">
                  <p className="text-[12px] font-bold leading-tight">{o.item}</p>
                  <p className="text-[11px] text-[#5a6677]">{o.detalhe}</p>
                  <p className="mt-2 text-[15px] font-extrabold text-[#1a63d8]">R$ {o.preco}</p>
                  <span className="mt-2 flex items-center justify-center gap-1 rounded-lg bg-[#e7f0ff] py-1.5 text-[11px] font-bold text-[#1a63d8]">
                    <WhatsappLogo size={12} weight="fill" aria-hidden /> Pedir
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-4 rounded-xl bg-[#07090d] p-4 text-white">
            <ShieldCheck size={22} weight="fill" className="text-[#5b9bff]" aria-hidden />
            <p className="mt-2 text-[15px] font-extrabold">1 ano de garantia na instalação</p>
            <p className="mt-1 text-[12px] text-white/70">Instalação e manutenção feitas pela equipe da CDI.</p>
          </div>

          <div className="grid gap-3 px-4 py-5 text-[12px]">
            <div className="flex gap-2">
              <Clock size={16} weight="bold" className="mt-0.5 shrink-0 text-[#1a63d8]" aria-hidden />
              <div>
                {CDI.horario.map(([d, h]) => (
                  <p key={d}>
                    <b>{d}:</b> {h}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <MapPin size={16} weight="bold" className="mt-0.5 shrink-0 text-[#1a63d8]" aria-hidden />
              <p>{CDI.endereco}</p>
            </div>
            <div className="flex gap-2">
              <WhatsappLogo size={16} weight="bold" className="mt-0.5 shrink-0 text-[#1a63d8]" aria-hidden />
              <p>{CDI.whatsapp}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PONTOS = [
  ["Um nome só em todo lugar", "Site, Google e Instagram dizem CDI, com o WhatsApp, o endereço e o horário de hoje."],
  ["Oferta com preço e botão", "Cada produto tem preço e um botão que abre o WhatsApp já com o item na mensagem."],
  ["Garantia à vista", "O 1 ano de garantia na instalação, que hoje fica escondido num post, ganha destaque."],
  ["Feito pra ser lido por máquina", "Dados estruturados dizem ao Google e às IAs quem é a CDI, onde fica e o que vende."],
] as const;

export function ComoFica() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <PreviaCDI />
          <p className="mt-4 text-center text-xs text-muted">Prévia rolável. Preços tirados de posts do Instagram, só de exemplo.</p>
        </Reveal>
        <div className="order-1 lg:order-2 lg:pt-6">
          <Reveal>
            <h2 className="max-w-[16ch] text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              Como a CDI aparece depois
            </h2>
            <p className="mt-5 max-w-[50ch] text-lg leading-relaxed text-muted">
              Um site com a cara da loja, com oferta, preço, WhatsApp e endereço certo, leve pra abrir no celular.
            </p>
          </Reveal>
          <dl className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {PONTOS.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06}>
                <dt className="text-base font-extrabold">{t}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-muted">{d}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

const PASSOS = [
  ["Corrigir", "Perfil da Empresa no Google com o nome CDI, WhatsApp, endereço e horário certos. O site antigo para de competir com o novo."],
  ["Publicar", "Site próprio, com catálogo, ofertas da semana e uma página de instalação. Leve no celular e feito pra virar conversa no WhatsApp."],
  ["Conectar", "Oferta postada no Instagram vira página com link. A bio leva pro catálogo, e o Google mostra a mesma coisa."],
  ["Acompanhar", "A Fox TI cuida da parte técnica. Vocês aprovam pelo WhatsApp e seguem no balcão."],
] as const;

export function Plano({ p }: { p: Premissas }) {
  const r = calcular(p);
  return (
    <section className="border-t border-line bg-bg-soft py-20 sm:py-28">
      <Container>
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">O plano</p>
          <h2 className="mt-4 max-w-[20ch] text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            O que a Fox TI faz pela CDI
          </h2>
        </Reveal>

        <ol className="mt-12">
          {PASSOS.map(([verbo, texto], i) => (
            <Reveal
              as="li"
              key={verbo}
              delay={i * 0.05}
              className="grid gap-2 border-t border-line py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-10"
            >
              <p className="text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-none tracking-[-0.03em]">{verbo}</p>
              <p className="max-w-[56ch] text-[17px] leading-relaxed text-muted md:pt-2">{texto}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-6 rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <p className="text-[15px] text-muted">Pela simulação lá de cima, ficar como está custa</p>
          <p className="mt-1 text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-none tracking-tight">
            <Contador value={r.perdaAno} /> <span className="text-lg font-semibold text-muted">por ano</span>
          </p>
          <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-muted">
            Tentar resolver sozinho ainda deixa {brl(Math.round(r.sozinhoAno))} pelo caminho entre horas e vendas perdidas.
            Valor e prazo do projeto a gente fecha numa conversa, depois de entender o estoque e a rotina da loja.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

export function Final() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-[340px]">
          <video
            src="/reel-cdi.mp4"
            poster="/reel-poster.webp"
            controls
            playsInline
            muted
            loop
            preload="none"
            className="aspect-[9/16] w-full rounded-2xl border border-line bg-[#05070b] object-cover shadow-card"
          />
        </Reveal>
        <Reveal>
          <h2 className="max-w-[18ch] text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            A primeira parte já está pronta
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
            Esta página, o logo da CDI redesenhado em vetor e o Reel de 20 segundos ao lado foram feitos pra vocês. O próximo
            passo é colocar a CDI certa no lugar onde o cliente procura.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <FoxCTA />
            <a
              href="/reel-cdi.mp4"
              download
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-[15px] font-bold transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <DownloadSimple size={18} weight="bold" aria-hidden /> Baixar o Reel
            </a>
            <a
              href="/cdi-logo.svg"
              download
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-[15px] font-bold transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <DownloadSimple size={18} weight="bold" aria-hidden /> Baixar o logo
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function Rodape() {
  return (
    <footer className="border-t border-line py-14">
      <Container className="grid gap-10 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
        <a href={FOX.site} target="_blank" rel="noopener" aria-label="Fox TI Solutions">
          <img src={foxLogo} alt="Fox TI Solutions" width={800} height={417} loading="lazy" className="h-20 w-auto sm:h-24" />
        </a>
        <div className="grid gap-3 text-[15px] leading-relaxed text-muted">
          <p className="text-ink">
            <b>Proposta, design e desenvolvimento: Fox TI Solutions.</b> Projeto em andamento para a CDI Refrigeração.
          </p>
          <p>
            <a href={FOX.site} target="_blank" rel="noopener" className="font-semibold text-ink hover:underline">
              foxtisolutions.com.br
            </a>
            <span className="mx-2">|</span>
            {FOX.telefone}
            <span className="mx-2">|</span>
            Nova Iguaçu, RJ
          </p>
          <p className="text-sm">
            Dados conferidos no Instagram {CDI.arroba} e no site atual da empresa em outubro de 2026. Os valores da
            calculadora são simulação.
          </p>
        </div>
      </Container>
    </footer>
  );
}
