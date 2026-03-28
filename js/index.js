/* Script para gerenciar o modo escuro e claro */

// Seleciona o botão de toggle e o elemento raiz
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = document.querySelector('.theme-icon');

// Tema padrão: verifica se o usuário tem uma preferência salva ou usa a preferência do sistema
const initialTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Define o tema inicial
setTheme(initialTheme);

// Evento de clique no botão para alternar o tema
themeToggle.addEventListener('click', () => {
    /* Obtém o tema atual do atributo data-theme */
    const currentTheme = htmlElement.getAttribute('data-theme');
    
    /* Define o novo tema (se é dark muda para light, e vice-versa) */
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    /* Aplica o novo tema */
    setTheme(newTheme);
});

/* Função para aplicar o tema */
function setTheme(theme) {
    /* Define o atributo data-theme no html */
    htmlElement.setAttribute('data-theme', theme);
    
    /* Salva a preferência no localStorage */
    localStorage.setItem('theme', theme);
    
    /* Atualiza o ícone do botão */
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    
    /* Adiciona uma descrição acessível */
    themeToggle.setAttribute('aria-pressed', theme === 'dark');
}

/* Detecta quando o usuário muda a preferência do sistema */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    /* Se não houver tema salvo, aplica a preferência do sistema */
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

/* ========== GERENCIAR SELEÇÃO DO PERFIL ========== */

// Seleciona todos os links dos perfis
const profileLinks = document.querySelectorAll('.profile a');

// Adiciona evento de clique em cada link do perfil
profileLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        /* Evita o comportamento padrão temporariamente para armazenar dados */
        // NÃO vamos usar preventDefault, deixaremos o link navegar naturalmente

        /* Obtém o elemento pai article */
        const article = link.querySelector('article');
        
        /* Obtém a imagem e o nome do perfil */
        const img = article.querySelector('img');
        const figcaption = article.querySelector('figcaption');
        
        if (img && figcaption) {
            /* Extrai nome e src da imagem */
            const profileName = figcaption.textContent;
            const profileImage = img.getAttribute('src');
            
            /* Armazena os dados do perfil ativo no localStorage */
            const profileData = {
                nome: profileName,
                imagem: profileImage,
                dataSelecao: new Date().toISOString()
            };
            
            localStorage.setItem('perfilAtivo', JSON.stringify(profileData));
            
            /* Log para verificação */
            console.log('Perfil armazenado:', profileData);
        }
    });
});

