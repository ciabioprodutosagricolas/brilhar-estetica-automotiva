# Brilhar — direção visual

A atualização de outubro de 2026 adapta as referências fornecidas pelo usuário: Nimbus Liquid Navbar e CinematicFooter. A identidade permanece automotiva, com fotografia do trabalho, preto esverdeado e turquesa. A composição editorial usa superfícies amplas, cantos discretos e títulos Anton com texto Geist. Tons claros de verde equilibram as fotografias e os fundos escuros.

## Componentes

`components/ui/liquid-glass-navbar.tsx` adapta o marcador líquido com CSS, sincronizado às seções por IntersectionObserver. Links continuam acessíveis por teclado e funcionais sem o efeito. Sem áudio. Até 1020 px, logo e botão de menu compartilham uma barra compacta com o mesmo material escuro. O menu abre logo abaixo, com quatro links em duas colunas e uma ação de WhatsApp. Fecha ao escolher um link, tocar fora, sair por Tab ou pressionar Escape; Escape devolve o foco ao botão. O painel não bloqueia a rolagem nem prende o foco.

`components/ui/motion-footer.tsx` adapta a assinatura tipográfica monumental e os links translúcidos do rodapé de referência. Os links levam ao WhatsApp, Instagram e às seções reais da Brilhar. A assinatura tem revelação progressiva onde o navegador suporta animações vinculadas à rolagem; nos demais fica visível normalmente. Não usa conteúdo de demonstração ou créditos da marca de exemplo.

Os componentes foram adaptados em React e CSS em vez de portar o shader WebGL e o runtime GSAP dos exemplos. Tailwind 4 e TypeScript já estão instalados; a pasta `components/ui` organiza os componentes reutilizáveis, sem necessidade de inicializar outro projeto ou instalar shadcn.

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
