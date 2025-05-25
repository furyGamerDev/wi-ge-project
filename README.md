# Playwright Testes em ge.globo.com

Este repositório contém um framework de testes end-to-end utilizando **Playwright** e **JavaScript**, com geração de evidências (screenshots, vídeos, traces e relatórios HTML/JUnit) e integração contínua via **GitHub Actions**.

---

## 🛠️ Pré-requisitos

- **Node.js** v16+ ou v18+ instalado
- **npm** (vem junto com o Node)

---

## 🚀 Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   cd SEU-REPOSITORIO
   ```
2. Instale as dependências:
   ```bash
   npm ci
   ```
3. Instale os navegadores do Playwright:
   ```bash
   npx playwright install --with-deps
   ```

---

## ⚙️ Configuração

- **Base URL**: configurada em `playwright.config.js` (por padrão `https://ge.globo.com`).
- **Timeouts** e **retries**: definidos em `playwright.config.js`, adaptados para execução local e CI.
- **Evidências**:
  - **Screenshots**: capturadas apenas em falhas (`only-on-failure`).
  - **Vídeos**: retidos apenas em falhas.
  - **Traces**: coletados na primeira tentativa de retry.
  - **Relatórios**: HTML em `playwright-report/`, JUnit XML em `test-results/junit/`.

---

## 🏃‍♂️ Rodando Testes Localmente

- Para executar todos os testes:
  ```bash
  npm test
  ```
- Para gerar relatórios e artefatos em modo CI:
  ```bash
  npm run test:ci
  ```

Após a execução, você encontrará:

- **playwright-report/**: relatório HTML (abra `index.html`).
- **test-results/junit/results.xml**: resultados em formato JUnit (XML).
- **test-results/**: screenshots (`.png`), vídeos (`.webm`) e traces (`.zip`).

---

## 🤖 Integração Contínua (GitHub Actions)

O workflow está em `.github/workflows/playwright.yml` e possui:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  test:
    name: Executar Playwright
    runs-on: ubuntu-latest

    strategy:
      matrix:
        browser: [chromium]

    steps:
      - name: Pega o codigo
        uses: actions/checkout@v4

      - name: Instalação node 18
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Instalar dependências
        run: npm install

      - name: Instalar browsers do Playwright
        run: npx playwright install --with-deps

      - name: Executar testes no ${{ matrix.browser }} (headed via Xvfb)
        run: |
                xvfb-run -s "-screen 0 1920x1080x24" \
                npx playwright test \
                --project=${{ matrix.browser }} \
                --reporter=list,html
        continue-on-error: false

      - name: Upload de relatório HTML
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report-${{ matrix.browser }}
          path: playwright-report/

```

### Como usar

1. Acesse a aba **Actions** no GitHub.
2. Selecione **Playwright Tests**.
3. Clique em **Run workflow** para disparar manualmente.
4. Aguarde a execução e faça download dos artefatos gerados.

---

## 🤝 Contribuição

1. Fork este repositório.
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`).
3. Commit suas mudanças (`git commit -m 'Add feature'`).
4. Push na branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.



## 🥇 Cenários
```bash
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
```