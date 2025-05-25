Funcionalidade: Navegação e exibição de notícias

  Contexto:
    Dado que o usuário acessa a página inicial do ge.globo.com

  Cenário: Página inicial exibe no mínimo 10 notícias
    Quando a página for carregada completamente
    Então devem ser exibidos pelo menos 10 cards de notícias

  Cenário: Cada notícia deve conter título, imagem destacada e resumo
    Dado que a página inicial está carregada
    Quando o usuário visualizar cada card de notícia
    Então cada card deve apresentar um título visível
    E cada card deve apresentar uma imagem destacada visível
    E cada card deve apresentar um resumo não vazio

  Cenário: Redirecionamento para a matéria completa ao clicar em uma notícia
    Dado que a página inicial está carregada
    Quando o usuário clicar no título ou na imagem da primeira notícia
    Então o usuário deve ser redirecionado para a página da matéria completa
    E a página da matéria deve exibir o título da notícia

  Cenário: Redirecionamento para página do clube ao selecionar um time da Série A
    Dado que a página inicial está carregada
    E o usuário visualiza a seção de times da Série A do Campeonato Brasileiro
    Quando o usuário selecionar o time "Flamengo"
    Então o usuário deve ser redirecionado para a página de notícias do clube
    E a página do clube deve exibir somente notícias relacionadas ao Flamengo
