<div align="center">
  <img src="./public/icon_karaoke.ico" alt="Logo" width="80" height="80">

  # Mexerico Karaokês - Gerenciador de Filas Real-Time
  
  **Uma solução moderna e escalável para revolucionar a experiência de karaokês, com foco em UI/UX e sincronização em tempo real.**

  [![Vue.js](https://img.shields.io/badge/Vue.js-3.X-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
  [![Vuetify](https://img.shields.io/badge/Vuetify-3.X-1867C0?style=for-the-badge&logo=vuetify)](https://vuetifyjs.com/)
  [![Firebase](https://img.shields.io/badge/Firebase-Realtime%20Database-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
  [![UX/UI](https://img.shields.io/badge/UX%2FUI-Mobile--First-8A2BE2?style=for-the-badge)]()
</div>

<br />

## 🚀 Visão Geral do Produto

O **Karaoke Queue Manager** é uma aplicação projetada para resolver um problema clássico de usabilidade em estabelecimentos de entretenimento: a desorganização das filas de karaokê (frequentemente feitas em papel ou planilhas estáticas). 

Esta plataforma oferece uma **experiência sem atritos (frictionless)** para os clientes do bar e ferramentas poderosas de controle para os administradores (KJs/DJs), tudo sincronizado instantaneamente.

---

## 🧠 Arquitetura e Decisões Técnicas (Tech Stack)

Este projeto foi desenhado demonstrando domínio em ecossistemas front-end modernos, arquitetura baseada em componentes e integração com Backend-as-a-Service (BaaS).

### ⚡ Front-End: Vue.js 3 & Vuetify
- **Vue 3:** Utilização da moderna reatividade do Vue.js para manipular estados complexos de filas dinâmicas. O projeto emprega uma estrutura multi-page (MPA) configurada via `vue.config.js`, permitindo separar contextos (Home, Admin, Clientes) otimizando o carregamento (Code Splitting nativo).
- **Vuetify 3 (Material Design):** A interface foi construída utilizando o sistema de design do Vuetify, garantindo consistência visual, acessibilidade (a11y) nativa e prototipagem rápida de componentes ricos, como Modais, Cards, e AppBars.

### 🔄 Back-End & Sincronização: Firebase
- **Firebase Realtime Database:** O coração do sistema. Utilizado para criar conexões via WebSockets persistentes. Qualquer alteração feita pelo admin (avançar fila, fechar lista) reflete na interface de todos os clientes em *milissegundos*, sem a necessidade de _polling_ ou recarregamento manual da página.
- **Firebase Authentication:** Implementação de camadas de segurança e persistência de sessão (`browserSessionPersistence`) para proteger o dashboard de administração.

---

## 🎨 Destaques de UI/UX Engineering

Ao desenvolver esta aplicação, a experiência do usuário esteve no centro de todas as decisões arquiteturais:

1. **Frictionless Onboarding (Zero Login):** Clientes em um bar não querem criar senhas. A interface pública permite que o usuário adicione seu nome e música instantaneamente. A menor barreira de entrada possível para conversão.
2. **Mobile-First Design:** Como 99% dos usuários acessam o sistema da mesa do bar usando smartphones, a interface foi projetada estritamente com foco em mobile. Botões grandes, áreas de toque otimizadas (Touch Targets) e fontes legíveis em ambientes de baixa luminosidade (Modo Escuro nativo).
3. **Feedback Visual Imediato:** Quando o administrador "trava" a lista de espera (fechando inscrições temporariamente), o botão de envio no celular do cliente é desabilitado em tempo real, acompanhado de avisos visuais claros de estado.
4. **Dashboard Administrativo Intuitivo:** Os administradores lidam com alto volume de dados rapidamente. A interface de Admin foi desenhada para ter comandos rápidos (1-click actions) para remover, chamar ou reposicionar clientes na fila.

---

## ✨ Funcionalidades do Sistema

### 📱 Experiência do Cliente (App Público)
- Inserção rápida na fila de espera.
- Visualização ao vivo do cantor atual.
- Acompanhamento da própria posição na fila.
- Bloqueio inteligente (escuta o estado da lista gerenciada pelo admin).

### 🎛️ Dashboard Administrativo (Protected Route)
- Autenticação segura de usuários gerenciais.
- Controle do estado global da fila ("Lista Aberta" / "Lista Fechada").
- Gestão CRUD completa dos participantes da fila.
- Histórico de músicas da sessão.

---

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js (v16+) e NPM instalados.

### Passos para Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/karaoke-queue-manager.git
   cd karaoke-queue-manager
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configuração de Ambiente (Firebase):**
   Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
   ```env
   VUE_APP_FIREBASE_API_KEY=sua_api_key
   VUE_APP_FIREBASE_AUTH_DOMAIN=seu_auth_domain
   VUE_APP_FIREBASE_PROJECT_ID=seu_project_id
   VUE_APP_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
   VUE_APP_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
   VUE_APP_FIREBASE_APP_ID=seu_app_id
   VUE_APP_FIREBASE_MEASUREMENT_ID=seu_measurement_id
   ```

4. **Inicie o Servidor de Desenvolvimento:**
   ```bash
   npm run serve
   ```
   > Acesse `http://localhost:8080/`. O projeto suporta *Hot-Module Replacement* (HMR).

5. **Build de Produção:**
   ```bash
   npm run build
   ```

---

## 📩 Contato e Suporte Comercial

Esta aplicação atende ao **Mexerico Karaokês**. Para dúvidas, suporte ou propostas:
- 📱 WhatsApp: (11) 91246-0542
- 📸 Instagram: [@mexerico.top](https://instagram.com/mexerico.top)
- ✉️ Email: contato@mexerico.top

<br />

<div align="center">
  <i>Desenvolvido com foco em escalabilidade, usabilidade e alta performance front-end.</i>
</div>
