# 🎬 Netlura - Plataforma de Streaming

Uma aplicação web inspirada na Netflix, desenvolvida com **HTML5**, **CSS3** e **JavaScript vanilla (ES6+)**. Permite criar múltiplos perfis de usuário, gerenciar seleção de perfil e navegar por um catálogo de conteúdo com carrossel dinâmico.

## ✨ Funcionalidades

### 🆔 Sistema de Perfis
- ✅ **Criar perfis** com nome customizado
- ✅ **Seleção de avatar** entre 4 opções (imagens da pasta `assets/`)
- ✅ **Máximo de 5 perfis** por sessão
- ✅ **Deletar perfis** de forma individual
- ✅ **Limpar todos os perfis** de uma vez
- ✅ **Persistência** com localStorage

### 🎥 Catálogo
- ✅ **Exibição dinâmica** do perfil ativo (nome e imagem)
- ✅ **Carrossel de conteúdo** por categoria
- ✅ **Navegação fluida** entre perfis e catálogo
- ✅ **Modal responsivo** para adicionar perfis

### 🎨 Interface
- ✅ **Design Netflix-inspired** com tema escuro/claro
- ✅ **Responsivo** (mobile, tablet, desktop)
- ✅ **Animações suaves** em transições
- ✅ **Acessibilidade** com ARIA labels
- ✅ **Font Awesome 6.0.0** para ícones

## 📁 Estrutura do Projeto

```
netlura/
├── index.html              # Página principal - Seleção de perfis
├── styles.css              # Estilos globais + sistema de perfis
├── README.md               # Este arquivo
├── LICENSE
├── assets/
│   ├── perfil-1.png       # Avatar 1
│   ├── perfil-2.png       # Avatar 2
│   ├── perfil-3.png       # Avatar 3
│   └── perfil-4.png       # Avatar 4
├── js/
│   ├── app.js             # Sistema completo de perfis (PerfilManager + PerfilUI)
│   ├── index.js           # Gerenciamento de tema (claro/escuro)
│   ├── catalogo.js        # Funções auxiliares para catálogo
│   └── catalogo.js        # Ainda não existe, pode ser criado
└── catalogo/
    ├── catalogo.html      # Página do catálogo
    ├── catalogo.css       # Estilos do catálogo
    ├── js/
    │   ├── main.js        # Script principal do catálogo
    │   ├── data.js        # Dados de categorias
    │   ├── utils.js       # Funções utilitárias
    │   └── components/
    │       ├── Card.js    # Componente Card
    │       └── Carousel.js # Componente Carousel
    └── css/
        └── (estilos adicionais)
```

## 🚀 Como Usar

### 1. **Abrir a Aplicação**
   - Abra `index.html` em um navegador
   - Você verá a tela de seleção de perfis

### 2. **Criar um Perfil**
   - Clique no botão **"+ Adicionar Perfil"**
   - Digite o nome do perfil (máx. 20 caracteres)
   - Escolha um avatar entre as 4 opções
   - Clique em **"Salvar perfil"**

### 3. **Selecionar um Perfil**
   - Clique no perfil desejado
   - Você será redirecionado para o catálogo
   - O nome e avatar do perfil aparecerão na navbar

### 4. **Gerenciar Perfis**
   - Clique em **"🔧 Gerenciar perfis"** na página de seleção
   - Aparecem botões de deletar em cada perfil
   - Você pode:
     - **Deletar individual**: Clique no ícone 🗑️
     - **Limpar tudo**: Clique em "Limpar tudo"
     - **Cancelar**: Clique em "Cancelar" para voltar

### 5. **Alternar Tema**
   - Clique no ícone de sol/lua (🌙/☀️) no header
   - O tema será salvo no localStorage

## 💾 localStorage

A aplicação armazena dados em duas chaves principais:

### `netlura_perfis`
Array com todos os perfis criados:
```javascript
[
  {
    id: "1711617283456",
    nome: "João",
    avatar: "assets/perfil-1.png",
    dataCriacao: "2024-03-28T10:00:00.000Z",
    ultimoAcesso: "2024-03-28T10:05:00.000Z"
  },
  // ... mais perfis
]
```

### `netlura_perfil_ativo`
Perfil atualmente selecionado (carregado no catálogo):
```javascript
{
  id: "1711617283456",
  nome: "João",
  avatar: "assets/perfil-1.png",
  dataCriacao: "2024-03-28T10:00:00.000Z",
  ultimoAcesso: "2024-03-28T10:05:00.000Z"
}
```

### `theme`
Tema atual (dark/light):
```javascript
"dark" // ou "light"
```

## 🛠️ Tecnologias

- **HTML5** - Semântica e acessibilidade
- **CSS3** - Grid, Flexbox, variáveis CSS, media queries
- **JavaScript ES6+** - Classes, arrow functions, localStorage API
- **Font Awesome 6.0.0** - Ícones
- **Google Fonts (Roboto)** - Tipografia

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- localStorage disponível (para persistência de dados)

## 🎨 Paleta de Cores

- **Background**: `#141414` (Netflix dark)
- **Primária**: `#e50914` (Netflix red)
- **Texto**: `#ffffff` (Branco)
- **Hover**: `#f5f5f1` (Cinza claro)
- **Transições**: `0.3s ease`

## 📱 Responsividade

A aplicação é totalmente responsiva:
- **Mobile** (< 480px): 2 colunas
- **Tablet** (480px - 768px): 3 colunas
- **Desktop** (> 768px): 4+ colunas

## 🐛 Troubleshooting

### Perfil não salva
- Verifique se o localStorage está habilitado
- Limpe o cache do navegador
- Tente criar em modo anônimo

### Imagens não carregam
- Confirme que a pasta `assets/` existe
- Verifique os nomes: `perfil-1.png`, `perfil-2.png`, etc.
- Verifique o caminho relativo no console

### Tema não muda
- Verifique o Dev Tools (F12 → Console)
- Tente limpar localStorage: `localStorage.clear()`

## 📝 Classe PerfilManager

Sistema de gerenciamento de perfis:

```javascript
// Adicionar perfil
perfilManager.adicionarPerfil(nome, avatar);

// Obter todos os perfis
perfilManager.obterPerfis();

// Definir perfil ativo
perfilManager.definirPerfilAtivo(id);

// Remover perfil
perfilManager.removerPerfil(id);

// Remover todos
perfilManager.removerTodosPerfis();

// Obter perfil ativo
perfilManager.obterPerfilAtivo();
```

## 📝 Classe PerfilUI

Interface de usuário dos perfis:

```javascript
// Renderizar perfis (renderiza automaticamente ao carregar)
perfilUI.renderizarPerfis();

// Abrir modal
perfilUI.abrirModal();

// Fechar modal
perfilUI.fecharModal();

// Alternar modo edição
perfilUI.toggleModoEdicao();

// Salvar novo perfil
perfilUI.salvarPerfil();

// Selecionar perfil
perfilUI.selecionarPerfil(id);
```

## 🔒 Validação

- ✅ Nome do perfil obrigatório
- ✅ Máximo 20 caracteres no nome
- ✅ Máximo 5 perfis
- ✅ Sem duplicatas de nome (case-insensitive)
- ✅ Avatar obrigatório

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

## 👨‍💻 Desenvolvido por

Crisan Cesar na imersão Front-End Alura

## 🤝 Contribuições

Contributions são bem-vindas! Sinta-se livre para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Otimizar o código

## 📞 Contato

Para dúvidas ou sugestões, abra uma issue neste repositório.

---

**Versão**: 1.0.0  
**Última atualização**: Março de 2026  
**Status**: ✅ Completo e funcional
