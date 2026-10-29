# Brilhar Estética Automotiva

Código-fonte oficial do site: https://brilhar-estetica-automotiva.netlify.app

Projeto existente migrado do ZIP de código-fonte baixado do Netlify, com os refinamentos visuais e as mídias da Brilhar solicitados após a migração. Não é necessário usar ChatGPT Sites para editar ou publicar este projeto. A direção visual está em `DESIGN.md`, e a seleção de fotos e vídeos está em `MEDIA.md`.

## Instalar e executar

Use Node.js 22.13.0 ou superior e npm. Com nvm, execute `nvm use`.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. As alterações são atualizadas durante o desenvolvimento.

## Onde editar

- `app/page.tsx`: textos, seções, contatos e interações (menu, benefícios do PPF, recomendador e perguntas frequentes).
- `app/globals.css` e `app/redesign.css`: estilos, animações e responsividade; `redesign.css` é carregado por último.
- `components/ui/`: navegação, botões, títulos animados, cards, vídeos em loop e rodapé.
- `app/layout.tsx`: fontes, título, descrição, canonical e dados estruturados.
- `app/robots.ts` e `app/sitemap.ts`: arquivos para mecanismos de busca.
- `public/media/`: logo e fotografias; `public/`: ícones e demais arquivos públicos.
- `next.config.ts`, `postcss.config.mjs`, `tsconfig.json` e `eslint.config.mjs`: configurações do projeto.
- `tests/`: verificações da exportação de produção.

## Verificar e gerar a produção

```sh
npm run lint
npm run typecheck
npm test
```

`npm test` executa `npm run build` e os testes do HTML exportado. Para apenas gerar a produção:

```sh
npm run build
```

A pasta `out/` contém o site estático pronto para hospedagem. Para repetir os testes sem recompilar, use `npm run test:artifact`.

Para visualizar a produção localmente, se Python 3 estiver instalado:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory out
```

Abra http://127.0.0.1:4173. Não use `next start`: este projeto usa exportação estática. Não edite `out/` diretamente.

## Netlify — publicação

O arquivo `netlify.toml` já define:

- Diretório base: raiz do repositório.
- Comando de build: `npm run build`.
- Diretório publicado: `out`.
- Node.js: `22.13.0`.
- `NEXT_PUBLIC_SITE_URL`: `https://brilhar-estetica-automotiva.netlify.app`.
- Cache longo para os arquivos versionados de `/_next/static/`.

Não são necessários banco de dados, Functions, autenticação ChatGPT ou credenciais para gerar este site. O build baixa as fontes Geist do Google; portanto exige acesso à internet. Anton é fornecida pelo pacote `@fontsource/anton`.

`NEXT_PUBLIC_SITE_URL` é opcional localmente: o domínio atual já é o padrão. Essa variável é pública e nunca deve conter segredos. Para outro domínio futuro, atualize a configuração do Netlify e recompile.

O projeto existente da Brilhar no Netlify tem o ID `1db3f775-a920-4497-ac41-d62039592b80`. Para enviar uma versão já compilada e validada à produção, com a CLI autenticada na conta responsável:

```sh
npm test
npx netlify-cli deploy --prod --no-build --dir out --site 1db3f775-a920-4497-ac41-d62039592b80
```

Use `--prod` somente quando quiser atualizar o site público. A publicação manual envia a pasta `out/`; não altera nem conecta automaticamente o repositório ao Netlify. O estado local `.netlify/` e as credenciais da CLI não são versionados. Ao configurar publicação contínua por Git no futuro, use a raiz deste repositório e as opções do `netlify.toml`.

## Segurança e manutenção

Nunca versionar credenciais ou arquivos `.env*`. Dependências, caches e saídas de build são ignorados pelo Git. Instale com `npm ci` para respeitar `package-lock.json`.

A auditoria da migração encontrou nove vulnerabilidades nas dependências herdadas, incluindo uma crítica atribuída ao Next.js. As versões foram preservadas para limitar esta etapa à migração; isso não significa que as vulnerabilidades foram corrigidas. Consulte `MIGRACAO.md` antes de futuras atualizações ou de usar execução em servidor.

## Tecnologias

Next.js 16.2.6 (App Router e exportação estática), React 19.2.6, TypeScript 5.9.3, Tailwind CSS 4.2.1, CSS próprio, ESLint 9 e testes nativos do Node.js.

O histórico da análise, os arquivos removidos e os resultados estão em [MIGRACAO.md](MIGRACAO.md).
