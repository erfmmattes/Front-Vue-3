**Frontend - Aplicação Vue 3 + Vuetify

**Descrição

Este projeto é o frontend para um sistema de gerenciamento de usuários e cargos, desenvolvido com Vue 3 utilizando API de composição (Setup) e Vuetify para os componentes de UI.

Funcionalidades:

- Tela de login com autenticação JWT.
- Interface para cadastro, listagem, atualização e desativação de usuários e cargos.
- Vinculação de usuários a cargos.
- Botão para logout que redireciona à tela de login.

---

**Tecnologias

- Vue.js 3
- Vuetify 3
- Axios para comunicação com a API
- Vue Router para navegação
- Pinia ou Composition API para gerenciamento de estado (se utilizado)

---

**Pré-requisitos

- Node.js v16+ instalado

---
**Instalação

1. Clone este repositório:

```bash
git clone <URL_DO_REPOSITORIO_FRONTEND>
cd frontend

2. Instale as dependências:
npm install

3.Configure a URL da API no arquivo de configuração (ex: src/services/api.js ou .env):
VITE_API_URL=http://localhost:3000

4.Inicie a aplicação:
npm run dev
