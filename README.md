# 🦠 Protozoa Identifier (Frontend)

## 💻 Sobre o projeto

O **Protozoa Identifier** é uma aplicação web Fullstack desenvolvida para auxiliar na identificação de protozoários através de imagens. O sistema utiliza Inteligência Artificial para analisar o upload do usuário e retornar a classificação do organismo com uma taxa de confiança.

Este repositório contém o **Frontend** da aplicação, construído com React e Vite, focado em uma interface responsiva, intuitiva e com autenticação via Google.

🔗 **Acesse o projeto online:** https://protozoa-identifier-front.vercel.app

---

## ⚙️ Funcionalidades

-   ✅ **Upload de Imagens:** Envio de arquivos de imagem para análise.
-   🤖 **Integração com IA:** Exibição do resultado da predição (Nome do protozoário + Porcentagem de confiança).
-   🔐 **Autenticação:** Login seguro via Google (OAuth 2.0).
-   📜 **Histórico:** Salvamento automático das análises realizadas pelo usuário logado.
-   📱 **Responsividade:** Layout adaptável para Desktop, Tablets e Celulares.

---

## 🛠 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

-   **[React](https://reactjs.org/)** + **[Vite](https://vitejs.dev/)**
-   **CSS3** (Estilização responsiva e customizada)
-   **[Google OAuth](https://www.npmjs.com/package/@react-oauth/google)** (Autenticação)
-   **Fetch API** (Comunicação com o Backend)

> O Backend deste projeto (Node.js + Python/TensorFlow + Prisma) pode ser encontrado neste repositório: [LINK DO SEU REPO BACKEND AQUI]

---

## 🚀 Como executar o projeto localmente

### Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina o [Node.js](https://nodejs.org/en/).

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/SEU-USUARIO/NOME-DO-REPO-FRONTEND.git](https://github.com/vino-brutor/ProtozoaIdentifier-Front)

2. **Acesse a pasta do projeto**

Bash

cd ProtozoaIdentifier-Front
3. **Instale as dependências**

Bash

npm install
Configure as Variáveis de Ambiente Crie um arquivo .env na raiz do projeto e adicione as chaves necessárias (exemplo abaixo):

Snippet de código

VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=SEU_CLIENT_ID_DO_GOOGLE_CLOUD
4. **Execute o projeto**

Bash

npm run dev
**O projeto estará rodando em http://localhost:5173**
