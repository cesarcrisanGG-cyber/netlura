/* Script para exibir o perfil ativo no catálogo */

// Função para recuperar os dados do perfil do localStorage
function obterPerfilAtivo() {
    /* Obtém os dados do localStorage */
    const perfilJSON = localStorage.getItem('netlura_perfil_ativo');
    
    if (perfilJSON) {
        /* Converte a string JSON para objeto */
        return JSON.parse(perfilJSON);
    }
    
    /* Retorna null se não houver perfil armazenado */
    return null;
}

// Função para exibir o perfil ativo na página
function exibirPerfilAtivo() {
    const perfil = obterPerfilAtivo();
    
    if (perfil) {
        /* Log para verificação */
        console.log('Perfil ativo encontrado:', perfil);
        
        /* Aqui você pode usar os dados do perfil para exibir na página */
        // Exemplo: atualizar elementos DOM com os dados
        const perfilNome = perfil.nome;
        const perfilImagem = perfil.imagem;
        
        /* Você pode usar essas variáveis para atualizar o HTML */
        // document.getElementById('perfil-nome').textContent = perfilNome;
        // document.getElementById('perfil-imagem').src = perfilImagem;
        
        return perfil;
    } else {
        console.log('Nenhum perfil ativo encontrado');
        return null;
    }
}

// Função para limpar o perfil armazenado (opcional)
function limparPerfilAtivo() {
    localStorage.removeItem('perfilAtivo');
    console.log('Perfil ativo removido do localStorage');
}

/* Executa a função ao carregar a página */
document.addEventListener('DOMContentLoaded', () => {
    exibirPerfilAtivo();
});
