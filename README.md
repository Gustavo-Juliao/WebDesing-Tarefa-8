# Projeto: Top Games - The Game Awards 2025 (Tarefa 8)

Uma landing page interativa e responsiva criada como parte da "Tarefa 8 de Web Design". Esta página é focada no "The Game Awards", apresentando uma contagem regressiva para o evento e destacando os principais candidatos ao prêmio de Jogo do Ano (GOTY) 2025.

O projeto demonstra o uso integrado de HTML5 semântico, estilização avançada com CSS3 (incluindo variáveis para temas) e manipulação dinâmica do DOM com JavaScript (ES6+).

##Link do site

`(https://gustavo-juliao.github.io/WebDesing-Tarefa-8/)`

## ✨ Principais Funcionalidades

* **Tema Dark/Light Mode:** Um botão que alterna o esquema de cores do site (claro e escuro).
* **Persistência de Tema:** A escolha do tema (claro ou escuro) é salva no `localStorage` do navegador, para que a preferência do usuário seja mantida ao recarregar a página.
* **Timer de Contagem Regressiva:** Um contador dinâmico que mostra os dias, horas, minutos e segundos restantes até a data do The Game Awards (12 de dezembro de 2025).
* **Navegação por Scroll Suave:** Ao clicar nas imagens da galeria de candidatos, a página rola suavemente até a seção de detalhes daquele jogo.
* **Botão "Voltar ao Topo":** Um botão no rodapé que rola a página suavemente de volta ao início.
* **Design Responsivo:** A página se adapta a diferentes tamanhos de tela, de desktops a dispositivos móveis.
* **Conteúdo Multimídia:** Inclui trailers de jogos incorporados do YouTube (`<iframe>`).

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica para o conteúdo (`header`, `main`, `footer`, `section`, `div`).
* **CSS3:** Estilização completa, incluindo:
    * Variáveis CSS (`:root`) para theming.
    * Flexbox para layout (ex: galeria de candidatos).
    * Efeito de "Parallax Fixo" (`background-attachment: fixed`) nas seções de crítica.
    * Media Queries para responsividade.
* **JavaScript (ES6+):** Interatividade do lado do cliente:
    * Manipulação do DOM (`getElementById`, `classList.add/remove`).
    * Event Listeners (`addEventListener`).
    * `localStorage` para persistência de dados.
    * `setInterval` para o timer.
    * `scrollIntoView()` e `window.scrollTo()` para navegação suave.

## 🚀 Funcionalidades em Detalhe (Análise do `script.js`)

O arquivo `script.js` é o cérebro por trás de toda a interatividade da página.

### 1. Tema Dark/Light Mode (com Persistência)

A funcionalidade de troca de tema não apenas altera o visual, mas também salva a preferência do usuário.

* **Como funciona:**
    1.  Ao carregar a página, o script verifica se há um tema (`'light'` ou `'dark'`) salvo no `localStorage`.
    2.  Se não houver, o padrão é 'dark'.
    3.  A função `applyTheme` é chamada para aplicar a classe `light-mode` ao `<body>` (ou removê-la) e atualizar o texto do botão.
    4.  Um `click` listener no botão `btn-troca-modo` verifica o estado atual, determina o *novo* tema, salva-o no `localStorage` e chama `applyTheme` novamente.

* **Snippet de Código (JavaScript):**
    ```javascript
    const themeToggleButton = document.getElementById('btn-troca-modo');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
            themeToggleButton.textContent = 'Dark';
        } else {
            body.classList.remove('light-mode');
            themeToggleButton.textContent = 'Light';
        }
    };

    // Pega o tema salvo ou usa 'dark' como padrão
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    themeToggleButton.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('light-mode');
        const newTheme = isDarkMode ? 'dark' : 'light';
        
        // Salva a preferência
        localStorage.setItem('theme', newTheme);
        
        // Aplica o novo tema
        applyTheme(newTheme);
    });
    ```

### 2. Timer de Contagem Regressiva

Um timer dinâmico que conta o tempo até `December 12, 2025 21:30:00`.

* **Como funciona:**
    1.  Uma data alvo (`dataAlvo`) é definida.
    2.  `setInterval` é usado para executar uma função a cada 1000ms (1 segundo).
    3.  A cada segundo, a função calcula a `diferenca` entre a data alvo e a data atual.
    4.  Se a `diferenca` for negativa (a data já passou), o `setInterval` é limpo, o timer é escondido (`.hidden`) e a mensagem final é exibida.
    5.  Caso contrário, a diferença é convertida em dias, horas, minutos e segundos usando matemática.
    6.  Os valores são formatados (adicionando um '0' à esquerda se for menor que 10) e inseridos no HTML.

* **Snippet de Código (JavaScript):**
    ```javascript
    const dataAlvo = new Date('December 12, 2025 21:30:00').getTime();

    const diasEl = document.getElementById('dias');
    // ... (horasEl, minutosEl, segundosEl) ...
    const timerEl = document.getElementById('timer');
    const mensagemFinalEl = document.getElementById('mensagem-final');

    const intervalo = setInterval(() => {
        const agora = new Date().getTime();
        const diferenca = dataAlvo - agora;

        if (diferenca < 0) {
            clearInterval(intervalo); 
            timerEl.classList.add('hidden'); 
            mensagemFinalEl.classList.remove('hidden'); 
            return; 
        }

        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        const formatarTempo = (tempo) => (tempo < 10 ? `0${tempo}` : tempo);

        diasEl.textContent = formatarTempo(dias);
        horasEl.textContent = formatarTempo(horas);
        minutosEl.textContent = formatarTempo(minutos);
        segundosEl.textContent = formatarTempo(segundos);
    }, 1000);
    ```
### 3. Navegação por Scroll Suave (Galeria Interativa)

Esta funcionalidade cria uma navegação interna intuitiva, conectando a galeria de imagens às seções de informação correspondentes.

* **Como funciona:**
    1.  O script seleciona a imagem na galeria (ex: `silksongImg`) e a seção de destino (ex: `silksong`).
    2.  Um `click` listener é adicionado à imagem.
    3.  Quando clicada, a função `divSilksong.scrollIntoView()` é chamada.
    4.  Os parâmetros `{ behavior: 'smooth', block: 'start' }` instruem o navegador a rolar suavemente até que o topo (`start`) da seção de destino esteja alinhado com o topo da janela de visualização.

* **Snippet de Código (JavaScript - Exemplo do Silksong):**
    ```javascript
    const imagemSilksong = document.getElementById('silksongImg');
    const divSilksong = document.getElementById('silksong');

    if (imagemSilksong && divSilksong) {
        imagemSilksong.addEventListener('click', () => {
            divSilksong.scrollIntoView({
                behavior: 'smooth', 
                block: 'start'      
            });
        });
    }
    ```

### 4. Botão "Voltar ao Topo"

Um utilitário simples para melhorar a experiência do usuário em uma página longa.

* **Como funciona:**
    1.  O botão `btnInicio` no rodapé é selecionado.
    2.  Um `click` listener é adicionado.
    3.  Ao ser clicado, `window.scrollTo()` é chamado com as opções `{ top: 0, behavior: 'smooth' }`, rolando suavemente a janela inteira de volta ao topo (posição 0).

* **Snippet de Código (JavaScript):**
    ```javascript
    const botaoTopo = document.getElementById('btnInicio');

    if (botaoTopo) {
        botaoTopo.addEventListener('click', () => {
            window.scrollTo({
                top: 0, 
                behavior: 'smooth' 
            });
        });
    }
    ```

## 🎨 Destaques da Estilização (`style.css`)

O `style.css` utiliza técnicas modernas para criar um visual atraente e flexível.

### 1. Theming com Variáveis CSS

O núcleo do sistema de Dark/Light mode está no CSS, permitindo uma troca de tema instantânea e fácil de manter.

* **Como funciona:**
    1.  Cores são definidas como variáveis no seletor `:root` (o padrão é o Dark Mode).
    2.  Essas variáveis (ex: `--background-color`, `--text-color`) são usadas em todo o arquivo CSS.
    3.  Uma classe `body.light-mode` é definida para *sobrescrever* essas mesmas variáveis com as cores do Light Mode.
    4.  Quando o JavaScript adiciona ou remove a classe `light-mode` do `<body>`, o navegador recalcula e aplica instantaneamente todas as cores do site.

* **Snippet de Código (CSS):**
    ```css
    :root {
      /* Padrão (Dark Mode) */
      --background-color: #121212;
      --text-color: #e0e0e0;
      --title-color: #ffd700;
      /* ...outras cores... */
    }

    /* Define o lightMode */
    body.light-mode {
      --background-color: #f0f2f5; 
      --text-color: #1c1e21;      
      --title-color: #007bff;
      /* ...outras cores... */
    }

    body {
      /* As variáveis são usadas aqui */
      background-color: var(--background-color);
      color: var(--text-color);
    }

    h2 {
      color: var(--title-color);
    }
    ```

### 2. Seções de Crítica (Efeito Parallax)

As seções de "Notas da Crítica" (`.game-area`) usam uma técnica de `background-attachment: fixed` para criar um efeito de profundidade (às vezes chamado de "parallax falso") onde o texto rola sobre a imagem de fundo, que permanece estática.

* **Snippet de Código (CSS):**
    ```css
    .game-area {
      position: relative;
      width: 100%;
      min-height: 100vh;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed; /* Esta é a propriedade chave */
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .game-overlay {
      /* O overlay escuro que fica sobre a imagem de fundo */
      background: var(--background-color);
      padding: 40px;
      border-radius: 15px;
      max-width: 800px;
      /* ... */
    }
    ```

### 3. Design Responsivo

O layout se ajusta a telas menores usando Media Queries, garantindo que o conteúdo seja legível e bem formatado em dispositivos móveis.

* **Exemplo (CSS):**
    ```css
    @media (max-width: 768px) {
      header h1 {
        font-size: 3rem;
      }
      
      /* Coloca os cards um embaixo do outro */
      .candidatos {
        flex-direction: column;
      }
      
      .card {
        width: 90%;
        height: 400px;
      }
      
      .info p {
        font-size: 1.1rem;
        text-align: left;
      }
    }
    ```
