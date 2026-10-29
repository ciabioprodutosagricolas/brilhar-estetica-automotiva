# Brilhar — direção visual

A atualização de outubro de 2026 adapta as referências fornecidas pelo usuário: Immersive Full Screen Nav (Hyperiux Vault / 21st.dev) e CinematicFooter. A identidade permanece automotiva, com fotografia do trabalho, preto esverdeado e turquesa. A composição editorial usa superfícies amplas, cantos discretos e títulos Anton com texto Geist. Tons claros de verde equilibram as fotografias e os fundos escuros.

## Componentes

`components/ui/immersive-full-screen-nav.tsx` substitui a navegação anterior em desktop e celular. Logo e botão de menu ocupam o cabeçalho fixo; o painel de tela inteira abre lateralmente com GSAP e revela os links e duas fotografias reais da Brilhar. O fundo é preto esverdeado, com ações e setas em turquesa. Os links mantêm os destinos Serviços, PPF, A Brilhar e Contato; WhatsApp e Instagram usam os contatos existentes.

O painel usa `dialog.showModal()`: o navegador mantém o foco dentro do menu e torna o conteúdo externo inerte. Escape e Fechar encerram o painel e devolvem o foco ao botão; a escolha de uma seção fecha o menu e direciona o foco ao destino. A rolagem da página fica bloqueada enquanto o painel está aberto; o próprio painel rola em telas baixas. Movimento reduzido desativa a abertura lateral, as entradas e a troca de letras. O hover por letras é limitado a mouse, e o foco mantém indicação visível. O componente anterior foi removido por ter sido substituído integralmente.

`components/ui/motion-footer.tsx` adapta a assinatura tipográfica monumental e os links translúcidos do rodapé de referência. Os links levam ao WhatsApp, Instagram e às seções reais da Brilhar. A assinatura tem revelação progressiva onde o navegador suporta animações vinculadas à rolagem; nos demais fica visível normalmente. Não usa conteúdo de demonstração ou créditos da marca de exemplo.

Os componentes usam React, CSS e as dependências indicadas em cada seção; a navbar utiliza GSAP conforme o novo anexo. Tailwind 4 e TypeScript já estão instalados; a pasta `components/ui` organiza os componentes reutilizáveis, sem necessidade de inicializar outro projeto ou instalar shadcn.

## Acessibilidade e comportamento

Movimento reduzido desativa a transição do marcador e a revelação. Priorizar contraste, alvos de toque e leitura em dispositivos pequenos. Contatos, imagens, serviços, recomendador e exportação estática mantidos. O comparador PPF removido anteriormente continua substituído pela foto da aplicação.

## Cards de serviços e brilho tipográfico

Os seis serviços complementares usam `NotchedProjectCard`: fotografia com recorte circular no canto inferior direito, seta turquesa encaixada, descrição e benefícios visíveis. O card inteiro abre o WhatsApp. Foram removidos os dados e a apresentação das estimativas de duração. A referência pública é https://21st.dev/@maudbenaddi/components/notched-project-card; a implementação é uma adaptação local, pois o exemplo de uso não inclui o código-fonte do componente.

`AnimatedText` aplica uma passagem de brilho em “BEM CUIDADO.” quando o texto entra na tela. Movimento reduzido mostra o texto sólido. Sem bibliotecas adicionais. Referência: https://21st.dev/@anurag-mishra22/components/animated-shiny-text.

## Metal líquido, títulos e setas

Os CTAs principais usam `LiquidMetalButton`, adaptado do prompt fornecido, com borda renderizada por `@paper-design/shaders` e centro escuro. Os links mantêm semântica de âncora. A renderização pausa fora da tela e em abas ocultas; movimento reduzido usa a borda CSS estática. A limpeza usa `dispose()`, API da versão instalada.

`animated-text.tsx` substitui o brilho por entrada escalonada por palavras ou letras com Motion. Quebras respeitam palavras completas, conteúdos ficam disponíveis no HTML e leitores de tela recebem o texto integral. Os títulos de seções, serviços, recomendador, chamada e assinatura usam o componente.

As setas usam o movimento fornecido do AnimateIcons/Lucide (Avijit Dey, MIT), ativado pelo foco ou ponteiro no controle que contém o ícone, com suporte a movimento reduzido.

## Hero — direção atual

Conforme a revisão solicitada, o buraco negro e seu componente gráfico foram removidos. A abertura usa apenas BASE 88 e D Luxe como referências de composição: fotografia automotiva escura, marca no topo, título forte e ação principal de orçamento.

O veículo finalizado e a fachada são da própria Brilhar, extraídos do vídeo `PPF/lv_0_20260813134613.mp4` dos ZIPs enviados. A imagem otimizada é `public/media/trabalhos/hero-veiculo-brilhar.webp`. Não há pessoa executando serviço como fundo. No desktop a fotografia ocupa a direita, com transição para a superfície escura à esquerda; no celular a imagem recebe escurecimento para sustentar a leitura.

No celular, a altura da abertura acompanha o conteúdo. Título, localização, descrição e ações formam um grupo contínuo; a linha de serviços encerra a seção, sem uma segunda chamada de rolagem. O WhatsApp flutuante usa o ícone reconhecível em uma área de toque de 52 px, com nome acessível e respeito à área segura da tela.

Os títulos animados, contatos, botões e demais seções continuam com o comportamento já aprovado. Não há renderizador WebGL no fundo do hero.
