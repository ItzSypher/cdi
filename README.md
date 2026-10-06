# CDI Refrigeração: proposta de presença digital

Página única de pitch feita pela **Fox TI Solutions** para a CDI Refrigeração (antiga Nevaska).
Ela mostra o que o cliente encontra hoje, quanto isso custa (calculadora com simulação) e o plano
para corrigir. Inclui o logo da CDI redesenhado em SVG e um Reel de 20s feito com Remotion.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/
```

## Reel (Remotion)

```bash
npm run reel:studio   # editor visual
npm run reel          # renderiza public/reel-cdi.mp4 (1080x1920, 20s)
```

O script usa o Chromium headless do container. Em outra máquina, defina `REMOTION_BROWSER`
com o caminho do seu Chrome headless, ou remova a flag `--browser-executable` para o Remotion baixar o dele.

## Logo

`python3 scripts/gerar-logo.py` (precisa de `pip install fonttools`) gera:

- `public/cdi-logo.svg`: selo completo, texto em curvas, pronto para uso
- `src/lib/logo-geometry.ts`: os mesmos traços, usados no preloader animado e no Reel

## Outros scripts

- `node scripts/capturar-site-antigo.mjs`: refaz as capturas do site atual (Ueni)
- `node scripts/verificar.mjs http://localhost:4173 <pasta>`: prints nos dois temas, checagem de scroll horizontal e da calculadora

## Skills instaladas

- `.claude/skills/design-taste-frontend` e afins (taste-skill, via `npx skills add https://github.com/Leonxlnx/taste-skill`)
- `.claude/skills/humanizer` (github.com/blader/humanizer), usada na revisão da copy

Os números da calculadora são simulação e vêm marcados assim na página. Preços de produtos
foram tirados de posts do Instagram @cdirefrigeracao.
