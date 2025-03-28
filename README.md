# 🚀 Daily Diet API

A **Daily Diet API** ☕️ foi criada para ajudar no controle de dieta diária dos usuários. Com ela, você pode registrar refeições, acompanhar sua dieta e visualizar métricas detalhadas! 

## 🛠️ Tecnologias Utilizadas

<div data-badges>
  <img src="https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify">
  <img src="https://img.shields.io/badge/Knex.js-000000?style=for-the-badge&logo=knex&logoColor=white" alt="Knex.js">
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/Zod-1E4D2B?style=for-the-badge&logo=zod&logoColor=white" alt="Zod">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
</div>

## 🎯 Funcionalidades

- ✅ Criar um usuário  
- ✅ Identificar o usuário entre requisições  
- ✅ Registrar refeições com nome, descrição, data e hora, e status de dieta  
- ✅ Editar refeições existentes  
- ✅ Apagar refeições  
- ✅ Listar todas as refeições de um usuário  
- ✅ Visualizar uma refeição específica  
- ✅ Recuperar métricas do usuário:  
  - 📊 Total de refeições registradas  
  - 🥗 Total de refeições dentro da dieta  
  - 🍔 Total de refeições fora da dieta  
  - 🔥 Melhor sequência de refeições dentro da dieta  

## 🚀 Instalação e Configuração

### 🔧 Requisitos

- Node.js instalado ([Download](https://nodejs.org/))  

### 📥 Passos para rodar o projeto

1. Clone o repositório:
   ```sh
   git clone https://github.com/rafaelclima/daily-diet-api.git
   cd daily-diet-api
   ```

2. Instale as dependências:
   ```sh
   yarn install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   PORT=3200 # Porta padrão caso não seja informada
   SESSION_SECRET=sua_chave_secreta
   ```

4. Execute as migrations:
   ```sh
   yarn knex migrate:latest
   ```

5. Inicie o servidor:
   ```sh
   yarn dev
   ```

🎉 Agora, a API estará rodando em `http://localhost:3200` (ou na porta definida no `.env`).

## 📌 Rotas da API

### 🔐 Autenticação

- `POST /login` - Realiza o login do usuário  
- `POST /logout` - Encerra a sessão do usuário logado  

### 👥 Usuários

- `POST /users` - Criar um novo usuário  
- `GET /users` - Listar todos os usuários  

### 🍽️ Refeições

- `POST /` - Criar uma refeição  
- `GET /` - Listar todas as refeições do usuário  
- `GET /:id` - Visualizar uma refeição específica  
- `PUT /:id` - Editar uma refeição  
- `DELETE /:id` - Remover uma refeição  

### 📊 Métricas

- `GET /summary` - Recuperar as métricas do usuário  

## 🔒 Autenticação e Permissões

Cada usuário só pode visualizar, editar e apagar as refeições que ele mesmo criou. A identificação do usuário ocorre entre as requisições.

## 🤝 Contribuição

Sinta-se à vontade para abrir **issues** e **pull requests** caso tenha melhorias ou correções a sugerir! 😃

## 📜 Licença

Este projeto está sob a licença **MIT**.
