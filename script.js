document.addEventListener
('DOMContentLoaded', () => 
    {

/*********************************
==================================
 CONFIGURA a transição o fundo
==================================
*********************************/

        // Seleciona o botão de troca de tema pelo seu ID
        const themeToggleButton = document.getElementById('btn-troca-modo');

        // Seleciona o elemento <body> para aplicar a classe do tema
        const body = document.body;

        //  FUNÇÃO PARA APLICAR O TEMA
        
        const applyTheme = (theme) => {
            if (theme === 'light') {
            
                body.classList.add('light-mode');
                // Atualiza o texto do botão
                themeToggleButton.textContent = 'Dark';
                
            } else {
                
                body.classList.remove('light-mode');
                // Atualiza o texto do botão
                themeToggleButton.textContent = 'Light';
            }
        };

    
        // Pega o tema salvo no localStorage do navegador. Se não houver, o padrão será 'dark'.
        const savedTheme = localStorage.getItem('theme') || 'dark';

        // Aplica o tema que foi salvo
        applyTheme(savedTheme);

        
        // Adiciona um  evento de clique ao botão
        themeToggleButton.addEventListener('click', () => 
            {
            // Verifica se o body JÁ TEM a classe 'light-mode'
            const isDarkMode = body.classList.contains('light-mode');
            
            // Determina o novo tema com base no estado atual
            const newTheme = isDarkMode ? 'dark' : 'light';
            
            // Salva a nova preferência de tema no localStorage
            localStorage.setItem('theme', newTheme);
             

             // Aplica o novo tema visualmente
            applyTheme(newTheme);
        });

/*********************************
==================================
 CONFIGURA a transição para imagem
==================================
*********************************/

//Silksong

        // Seleciona a imagem pelo seu ID
    const imagemSilksong = document.getElementById('silksongImg');

    // Seleciona a div de destino pelo seu ID
    const divSilksong = document.getElementById('silksong');

    // Verifica se ambos os elementos foram encontrados
    if (imagemSilksong && divSilksong) 
        {
        
        // Adiciona um "ouvinte" de evento de clique na imagem
        imagemSilksong.addEventListener('click', () => {
            
            //  Quando a imagem for clicada, executa a função de rolagem
            divSilksong.scrollIntoView({
                // Define a animação como suave
                behavior: 'smooth', 
                // Alinha o topo da div ao topo da tela
                block: 'start'      
            });
            
        });
    }

//Expedition 33

const imagemExpedicion = document.getElementById('expeditionImg');


    const divExpedicion = document.getElementById('expedition');

   
    if (imagemExpedicion && divExpedicion) 
        {
        

        imagemExpedicion.addEventListener('click', () => {
            
            
            divExpedicion.scrollIntoView({
               
                behavior: 'smooth', 
                
                block: 'start'      
            });
            
        });
    }

//Digimon

    const imagemDigimon = document.getElementById('digimonImg');

    
    const divdigimon = document.getElementById('digimon');

    
    if (imagemDigimon && divdigimon) 
        {
        
        
        imagemDigimon.addEventListener('click', () => {
            
            
            divdigimon.scrollIntoView({
                
                behavior: 'smooth', 
                
                block: 'start'      
            });
            
        });
    }

//Kingdom Come

     const imagemkingdom = document.getElementById('kingdomImg');

    
    const divKingdom = document.getElementById('kingdom');

    
    if (imagemkingdom && divKingdom) 
        {
        
        
        imagemkingdom.addEventListener('click', () => {
            
            
            divKingdom.scrollIntoView({
                
                behavior: 'smooth', 
                
                block: 'start'      
            });
            
        });
    }

//Hades 2

 const imagemHades = document.getElementById('hadesImg');

    
    const divHades = document.getElementById('hades');

    
    if (imagemHades && divHades) 
        {
        
        
        imagemHades.addEventListener('click', () => {
            
            
            divHades.scrollIntoView({
                
                behavior: 'smooth', 
                
                block: 'start'      
            });
            
        });
    }

//Donkey kong

     const imagemDonkey = document.getElementById('donkeyImg');

    
    const divDonkey = document.getElementById('donkey');

    
    if (imagemDonkey && divDonkey) 
        {
        
        
        imagemDonkey.addEventListener('click', () => {
            
            
            divDonkey.scrollIntoView({
                
                behavior: 'smooth', 
                
                block: 'start'      
            });
            
        });
    }


/********************************* 
==================================
        CONFIGURA O TIMER
==================================
*********************************/

// Formato: 'Month Day, Year HH:MM:SS' -> 'January 1, 2026 00:00:00'
const dataAlvo = new Date('December 12, 2025 21:30:00').getTime();

// SELECIONA OS ELEMENTOS DO HTML
const diasEl = document.getElementById('dias');

const horasEl = document.getElementById('horas');

const minutosEl = document.getElementById('minutos');

const segundosEl = document.getElementById('segundos');

const timerEl = document.getElementById('timer');

const mensagemFinalEl = document.getElementById('mensagem-final');


// A função setInterval executa o código repetidamente em um intervalo de tempo definido (1000ms = 1 segundo)
const intervalo = setInterval(() => {

    // Pega a data e hora atual
    const agora = new Date().getTime();

    // Calcula a diferença entre a data alvo e a data atual (em milissegundos)
    const diferenca = dataAlvo - agora;

    // Se a diferença for menor que zero, a contagem acabou
    if (diferenca < 0) {

        // Para de executar o setInterval
        clearInterval(intervalo); 

        // Esconde o timer
        timerEl.classList.add('hidden'); 

        // Mostra a mensagem final
        mensagemFinalEl.classList.remove('hidden'); 
       
        // Encerra a função
        return; 
    }

    
    // 1000ms * 60s * 60min * 24h = número de milissegundos em um dia
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    // Função para adicionar um zero à esquerda se o número for menor que 10
    const formatarTempo = (tempo) => (tempo < 10 ? `0${tempo}` : tempo);

    // ATUALIZA O HTML COM OS VALORES CALCULADOS
    diasEl.textContent = formatarTempo(dias);
    horasEl.textContent = formatarTempo(horas);
    minutosEl.textContent = formatarTempo(minutos);
    segundosEl.textContent = formatarTempo(segundos);

},
// Executa a cada 1000 milissegundos (1 segundo)
 1000); 

const botaoTopo = document.getElementById('btnInicio');

// Verifica se o botão realmente existe na página
if (botaoTopo) {

    // Adiciona um "ouvinte" de evento de clique ao botão
    botaoTopo.addEventListener('click', () => {
        
        // A função principal que faz a rolagem
        window.scrollTo({

            // Rola para o topo da página (posição 0)
            top: 0, 

            // Define o comportamento como "suave"
            behavior: 'smooth' 
        });
        
    });
}
}
);
