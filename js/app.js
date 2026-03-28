/**
 * Sistema Completo de Perfis Netflix
 * Consolida lógica e interface em um único arquivo
 */

// ========== GERENCIADOR DE PERFIS ==========
class PerfilManager {
    constructor() {
        this.storageKey = 'netlura_perfis';
        this.profileAtivoKey = 'netlura_perfil_ativo';
        this.avatares = [
            'assets/perfil-1.png',
            'assets/perfil-2.png',
            'assets/perfil-3.png',
            'assets/perfil-4.png'
        ];
        this.maxPerfis = 5;
    }

    obterPerfis() {
        try {
            const perfis = localStorage.getItem(this.storageKey);
            return perfis ? JSON.parse(perfis) : [];
        } catch (error) {
            console.error('Erro ao obter perfis:', error);
            return [];
        }
    }

    salvarPerfis(perfis) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(perfis));
            return true;
        } catch (error) {
            console.error('Erro ao salvar perfis:', error);
            return false;
        }
    }

    adicionarPerfil(nome, avatar = null) {
        const perfis = this.obterPerfis();

        if (!nome || nome.trim() === '') {
            throw new Error('Nome do perfil é obrigatório');
        }

        if (perfis.length >= this.maxPerfis) {
            throw new Error(`Máximo de ${this.maxPerfis} perfis atingido`);
        }

        if (perfis.some(p => p.nome.toLowerCase() === nome.toLowerCase())) {
            throw new Error('Já existe um perfil com este nome');
        }

        const id = Date.now().toString();
        const avatarFinal = avatar || this.obterAvatarAleatorio();

        const novoPerfil = {
            id,
            nome: nome.trim(),
            avatar: avatarFinal,
            dataCriacao: new Date().toISOString(),
            ultimoAcesso: null
        };

        perfis.push(novoPerfil);
        this.salvarPerfis(perfis);
        return novoPerfil;
    }

    removerPerfil(id) {
        let perfis = this.obterPerfis();
        const perfilAtivo = this.obterPerfilAtivo();

        if (perfilAtivo && perfilAtivo.id === id) {
            this.limparPerfilAtivo();
        }

        perfis = perfis.filter(p => p.id !== id);
        this.salvarPerfis(perfis);
        return perfis;
    }

    removerTodosPerfis() {
        this.salvarPerfis([]);
        this.limparPerfilAtivo();
    }

    definirPerfilAtivo(id) {
        const perfis = this.obterPerfis();
        const perfil = perfis.find(p => p.id === id);

        if (!perfil) {
            throw new Error('Perfil não encontrado');
        }

        perfil.ultimoAcesso = new Date().toISOString();
        this.salvarPerfis(perfis);
        localStorage.setItem(this.profileAtivoKey, JSON.stringify(perfil));
        return perfil;
    }

    obterPerfilAtivo() {
        try {
            const perfil = localStorage.getItem(this.profileAtivoKey);
            return perfil ? JSON.parse(perfil) : null;
        } catch (error) {
            console.error('Erro ao obter perfil ativo:', error);
            return null;
        }
    }

    limparPerfilAtivo() {
        localStorage.removeItem(this.profileAtivoKey);
    }

    obterAvatarAleatorio() {
        const indice = Math.floor(Math.random() * this.avatares.length);
        return this.avatares[indice];
    }

    obterAvatares() {
        return this.avatares;
    }

    podeAdicionarMais() {
        const perfis = this.obterPerfis();
        return perfis.length < this.maxPerfis;
    }

    habilitarModoEdicao() {
        document.body.classList.add('edit-mode');
    }

    desabilitarModoEdicao() {
        document.body.classList.remove('edit-mode');
    }
}

// ========== INTERFACE DE USUÁRIO ==========
class PerfilUI {
    constructor() {
        this.profilesList = document.getElementById('profilesList');
        this.modal = document.getElementById('addProfileModal');
        this.modalOverlay = document.getElementById('modalOverlay');
        this.nameInput = document.getElementById('profileName');
        this.avatarSelector = document.getElementById('avatarSelector');
        this.actionButtons = document.getElementById('actionButtons');
        this.editModeButtons = document.getElementById('editModeButtons');
        this.btnAdd = document.getElementById('btnAddProfile');
        this.btnManage = document.getElementById('btnManagePerfis');
        this.btnClose = document.getElementById('closeModal');
        this.btnSave = document.getElementById('btnSaveProfile');
        this.btnCancel = document.getElementById('btnCancelEdit');
        this.btnDeleteAll = document.getElementById('btnDeleteAll');

        this.modoEdicao = false;
        this.avatarSelecionado = null;

        this.inicializar();
    }

    inicializar() {
        console.log('Sistema de Perfis inicializado ✓');

        // Event listeners
        this.btnManage.addEventListener('click', () => this.toggleModoEdicao());
        this.btnAdd.addEventListener('click', () => this.abrirModal());
        this.btnClose.addEventListener('click', () => this.fecharModal());
        this.modalOverlay.addEventListener('click', () => this.fecharModal());
        this.btnSave.addEventListener('click', () => this.salvarPerfil());
        this.btnCancel.addEventListener('click', () => this.cancelarEdicao());
        this.btnDeleteAll.addEventListener('click', () => this.limparTodosPerfis());

        this.nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.salvarPerfil();
        });

        this.renderizarPerfis();
        this.renderizarAvatares();
    }

    renderizarPerfis() {
        const perfis = perfilManager.obterPerfis();
        this.profilesList.innerHTML = '';

        if (perfis.length === 0) {
            const li = document.createElement('li');
            li.className = 'no-profiles-message';
            li.style.gridColumn = '1 / -1';
            li.style.textAlign = 'center';
            li.style.padding = '2rem';
            li.innerHTML = '📺 Nenhum perfil cadastrado';
            this.profilesList.appendChild(li);
        } else {
            perfis.forEach(perfil => {
                const li = document.createElement('li');
                li.className = 'profile-item profile';
                li.dataset.id = perfil.id;

                const imgPath = perfil.avatar;
                li.innerHTML = `
                    <article style="position: relative;">
                        <figure>
                            <img src="${imgPath}" alt="${perfil.nome}">
                            <figcaption>${perfil.nome}</figcaption>
                            ${this.modoEdicao ? `<button class="delete-btn" data-id="${perfil.id}">🗑️</button>` : ''}
                        </figure>
                    </article>
                `;

                if (!this.modoEdicao) {
                    li.addEventListener('click', () => this.selecionarPerfil(perfil.id));
                } else {
                    const btnDelete = li.querySelector('.delete-btn');
                    if (btnDelete) {
                        btnDelete.addEventListener('click', (e) => {
                            e.stopPropagation();
                            this.confirmarDelecao(perfil.id, perfil.nome);
                        });
                    }
                }

                this.profilesList.appendChild(li);
            });
        }

        // Botão adicionar perfil
        if (perfilManager.podeAdicionarMais()) {
            const liAdd = document.createElement('li');
            liAdd.className = 'profile-item add-profile-item profile';
            liAdd.innerHTML = `
                <article>
                    <figure>
                        <div style="width: 140px; height: 140px; display: flex; align-items: center; justify-content: center; border: 3px dashed; border-radius: 8px; background-color: rgba(255,255,255,0.05);">
                            <i class="fas fa-plus" style="font-size: 2rem;"></i>
                        </div>
                        <figcaption>Adicionar</figcaption>
                    </figure>
                </article>
            `;
            liAdd.addEventListener('click', () => this.abrirModal());
            this.profilesList.appendChild(liAdd);
        }
    }

    renderizarAvatares() {
        const avatares = perfilManager.obterAvatares();
        this.avatarSelector.innerHTML = '';

        avatares.forEach((avatar, index) => {
            const label = document.createElement('label');
            label.className = 'avatar-option';

            const imgPath = avatar;
            label.innerHTML = `
                <input type="radio" name="avatar" value="${avatar}">
                <img src="${imgPath}" alt="${avatar}">
            `;

            const input = label.querySelector('input');
            input.addEventListener('change', () => {
                this.avatarSelecionado = avatar;
            });

            if (index === 0) {
                input.checked = true;
                this.avatarSelecionado = avatar;
            }

            this.avatarSelector.appendChild(label);
        });
    }

    abrirModal() {
        this.limparFormulario();
        this.modal.classList.add('active');
        this.modalOverlay.classList.add('active');
        this.nameInput.focus();
    }

    fecharModal() {
        this.modal.classList.remove('active');
        this.modalOverlay.classList.remove('active');
        this.limparFormulario();
    }

    limparFormulario() {
        this.nameInput.value = '';
        const avatares = perfilManager.obterAvatares();
        if (avatares.length > 0) {
            this.avatarSelecionado = avatares[0];
            const input = this.avatarSelector.querySelector('input[type="radio"]');
            if (input) input.checked = true;
        }
    }

    salvarPerfil() {
        const nome = this.nameInput.value.trim();

        if (!nome) {
            alert('Digite o nome do perfil');
            this.nameInput.focus();
            return;
        }

        try {
            perfilManager.adicionarPerfil(nome, this.avatarSelecionado);
            this.fecharModal();
            this.renderizarPerfis();
        } catch (error) {
            alert(error.message);
        }
    }

    selecionarPerfil(id) {
        try {
            perfilManager.definirPerfilAtivo(id);
            window.location.href = './catalogo/catalogo.html';
        } catch (error) {
            alert('Erro: ' + error.message);
        }
    }

    toggleModoEdicao() {
        this.modoEdicao = !this.modoEdicao;

        if (this.modoEdicao) {
            perfilManager.habilitarModoEdicao();
            this.actionButtons.style.display = 'none';
            this.editModeButtons.style.display = 'flex';
            this.btnAdd.style.display = 'none';
        } else {
            this.cancelarEdicao();
        }

        this.renderizarPerfis();
    }

    cancelarEdicao() {
        this.modoEdicao = false;
        perfilManager.desabilitarModoEdicao();
        this.actionButtons.style.display = 'flex';
        this.editModeButtons.style.display = 'none';
        this.btnAdd.style.display = 'block';
        this.renderizarPerfis();
    }

    confirmarDelecao(id, nome) {
        if (confirm(`Deletar o perfil "${nome}"?`)) {
            perfilManager.removerPerfil(id);
            this.renderizarPerfis();
        }
    }

    limparTodosPerfis() {
        if (confirm('Remover TODOS os perfis?')) {
            perfilManager.removerTodosPerfis();
            this.cancelarEdicao();
            this.renderizarPerfis();
        }
    }
}

// ========== INICIALIZAÇÃO ==========
const perfilManager = new PerfilManager();

document.addEventListener('DOMContentLoaded', () => {
    new PerfilUI();
});
