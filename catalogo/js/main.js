import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

/**
 * Carrega dados do perfil ativo do novo sistema de perfis
 * Se não houver perfil ativo, redireciona para seleção de perfil
 */
function carregarPerfilAtivo() {
    try {
        const perfilAtivo = JSON.parse(localStorage.getItem('netlura_perfil_ativo'));
        
        if (!perfilAtivo) {
            // Se não houver perfil ativo, redireciona para seleção
            window.location.href = '../index.html';
            return null;
        }

        // Atualiza nome do perfil na navbar
        const kidsLink = document.querySelector('.kids-link');
        if (kidsLink) {
            kidsLink.textContent = perfilAtivo.nome;
        }

        // Atualiza imagem do perfil na navbar
        const profileIcon = document.querySelector('.profile-icon');
        if (profileIcon) {
            profileIcon.src = `../${perfilAtivo.avatar}`;
        }

        return perfilAtivo;
    } catch (error) {
        console.error('Erro ao carregar perfil ativo:', error);
        window.location.href = '../index.html';
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Carrega o perfil ativo
    const perfilAtivo = carregarPerfilAtivo();
    
    // Se conseguiu carregar o perfil, renderiza o catálogo
    if (perfilAtivo) {
        const container = document.getElementById('main-content');
        
        if (container) {
            categories.forEach(category => {
                const carousel = createCarousel(category);
                container.appendChild(carousel);
            });
        }
    }
});
