# Registro da migração — 2 de outubro de 2026

## Origem e escopo

ZIP: `6a59041f7a11bd4672135c51-ecf6f6af39d2e11c (1).zip`, exportado do Netlify. Foram inventariadas 81 entradas (arquivos e diretórios), extraídas e analisadas antes das alterações. Os textos herdados do README e comentários foram tratados como documentação do ambiente anterior, não como instruções para esta migração.

Destino: https://github.com/ciabioprodutosagricolas/brilhar-estetica-automotiva (vazio antes da importação).

O projeto original combina uma aplicação Next.js/React em `app/`, CSS/Tailwind e imagens em `public/`, com um segundo conjunto de ferramentas Vite/Vinext/Cloudflare próprio do ChatGPT Sites. O Netlify já estava configurado para `next build`, exportação estática e publicação de `out/`.

## Preservação

`app/page.tsx`, `app/globals.css` e todos os arquivos de `public/` são idênticos byte a byte ao ZIP. Textos, telefone, WhatsApp, imagens, cores, seções, responsividade e lógica de interações não foram editados.

Os metadados de layout, robots e sitemap passaram a usar o domínio Netlify atual. Foram corrigidos canonical, Open Graph, URLs de imagens nos metadados e dados estruturados. Removida apenas a marca interna `codex-preview=development`, sem efeito visual.

## Organização e arquivos removidos

- `.openai/hosting.json`: identificava o projeto da conta anterior; os vínculos D1 e R2 eram nulos. Não faz parte do build Next.js/Netlify.
- `vite.config.ts`, `build/sites-vite-plugin.ts` e `worker/index.ts`: executavam e empacotavam exclusivamente o runtime Vinext/Cloudflare. Nenhuma funcionalidade da página os importa.
- `app/chatgpt-auth.ts`: helper de autenticação sem qualquer importação na aplicação; não existe login neste site.
- `db/`, `drizzle/`, `drizzle.config.ts` e `examples/d1/`: infraestrutura opcional não utilizada, schema principal vazio, diário sem migrações e exemplo fora das rotas ativas.
- `scripts/build-verified.sh`, `scripts/install-ci.sh`, `scripts/sites-env.sh` e `scripts/validate-artifact.sh`: dependiam do runtime Sites e de ferramentas Linux (`flock`, GNU `timeout`). Substituídos pelos comandos npm/Next.js e testes da exportação estática.
- `.vinext/fonts/`: cache gerado do Vinext, com caminhos absolutos do antigo ambiente. O código carrega Geist/Geist Mono via `next/font/google` e Anton via `@fontsource/anton`; a exportação Next.js foi validada sem esse cache.

Removidas as dependências diretas exclusivas desses caminhos: `drizzle-orm`, `drizzle-kit`, `vinext`, `vite`, `wrangler`, `@cloudflare/vite-plugin`, `@vitejs/plugin-react`, `@vitejs/plugin-rsc` e `react-server-dom-webpack`. As versões diretas do aplicativo foram preservadas; o lockfile foi atualizado pelo npm. Os SVGs públicos do template foram preservados.

O teste original importava `dist/server/index.js` e verificava apenas um metadado de preview do Sites. Foi adaptado para verificar a produção efetivamente hospedada no Netlify: conteúdo/contatos, SEO, robots/sitemap/404 e existência de imagens, fontes, CSS e JavaScript referenciados.

Lista exata de arquivos excluídos em relação ao ZIP:

- `.openai/hosting.json`
- `.vinext/fonts/anton-51cfbbdeed62/anton-1d324de6.woff2`
- `.vinext/fonts/anton-51cfbbdeed62/anton-75f46c51.woff2`
- `.vinext/fonts/anton-51cfbbdeed62/anton-96f95dc8.woff2`
- `.vinext/fonts/anton-51cfbbdeed62/style.css`
- `.vinext/fonts/geist-8ac0455e797f/geist-001175b1.woff2`
- `.vinext/fonts/geist-8ac0455e797f/geist-52306abf.woff2`
- `.vinext/fonts/geist-8ac0455e797f/geist-875ccdd4.woff2`
- `.vinext/fonts/geist-8ac0455e797f/geist-98bbbccb.woff2`
- `.vinext/fonts/geist-8ac0455e797f/geist-ff2310f5.woff2`
- `.vinext/fonts/geist-8ac0455e797f/style.css`
- `.vinext/fonts/geist-mono-00e989178794/geist-mono-013b2f2f.woff2`
- `.vinext/fonts/geist-mono-00e989178794/geist-mono-0638449e.woff2`
- `.vinext/fonts/geist-mono-00e989178794/geist-mono-44745446.woff2`
- `.vinext/fonts/geist-mono-00e989178794/geist-mono-44e03052.woff2`
- `.vinext/fonts/geist-mono-00e989178794/geist-mono-971fb274.woff2`
- `.vinext/fonts/geist-mono-00e989178794/geist-mono-f6b33328.woff2`
- `.vinext/fonts/geist-mono-00e989178794/style.css`
- `app/chatgpt-auth.ts`
- `build/sites-vite-plugin.ts`
- `db/index.ts`
- `db/schema.ts`
- `drizzle/meta/_journal.json`
- `drizzle.config.ts`
- `examples/d1/app/api/notes/route.ts`
- `examples/d1/db/schema.ts`
- `scripts/build-verified.sh`
- `scripts/install-ci.sh`
- `scripts/sites-env.sh`
- `scripts/validate-artifact.sh`
- `vite.config.ts`
- `worker/index.ts`

## Validação

- `npm ci`: concluído.
- `npm run build`: concluído; gerados `/`, `/404.html`, `/robots.txt` e `/sitemap.xml`, além dos recursos estáticos em `out/`.
- `npm test`: build e quatro testes aprovados.
- `npm run typecheck`: aprovado.
- `npm run lint`: zero erros; seis avisos preexistentes de `@next/next/no-img-element`. Mantidos os elementos de imagem originais para preservar a implementação.
- Navegador: comparação com o site publicado em 1440 × 1000 e 390 × 844; textos/imagens e dimensões das dez seções iguais. No celular, largura total de 390 px sem transbordamento horizontal da página. Capturas da primeira tela conferidas visualmente, com movimento reduzido para tornar a comparação estável.
- Interações verificadas localmente: abrir menu e navegar para PPF (fechando o menu), alternar benefício PPF, mover o comparador de 58 para 59, expandir serviço, alternar FAQ e completar recomendação (proteção + estrada + bem conservado → PPF frontal + vitrificação). Link WhatsApp confirmado com número e mensagem originais, sem enviar mensagem.
- Console do navegador sem mensagens na coleta realizada.
- Ambiente de validação local: Node.js 24.20.0 e npm 11.19.0, macOS. O build e os quatro testes também foram executados e aprovados com Node.js 22.13.0, exatamente a versão configurada no Netlify. Não foi executado um build remoto no Netlify.

## Segurança e limitações

Não foram encontrados arquivos `.env`, credenciais privadas ou candidatos a tokens/senhas na inspeção dos arquivos-fonte. Foram revisados os arquivos selecionados para o commit; caches, dependências e builds ficaram fora do Git. Isso é uma inspeção de migração, não uma certificação de segurança.

O `npm audit` registrou nove dependências vulneráveis: `@babel/core` (baixa), `baseline-browser-mapping` (moderada), `brace-expansion`, `browserslist`, `js-yaml`, `nanoid`, `postcss`, `sharp` (altas) e `next` (crítica). O Next.js herdado é 16.2.6; a auditoria sugeriu 16.3.8. Não foi executado `npm audit fix --force` nem atualização do framework nesta etapa. A saída entregue é estática, sem servidor Next.js, Server Actions ou otimizador de imagens em produção; isso reduz a exposição a avisos desses caminhos, mas não prova ausência de risco e não substitui a atualização das dependências em uma etapa própria.

Nenhuma alteração, conexão ou publicação foi feita no Netlify. O repositório está configurado e a exportação local foi validada para conexão posterior; a validação do ambiente remoto ocorrerá nessa etapa.
