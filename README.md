# 📌 Projeto Laravel + Next.js

Este projeto é uma aplicação que utiliza **Laravel 11** como backend e **Next.js 15** como frontend, com um banco de dados **MySQL**. O **Nginx** é utilizado para gerenciar o roteamento das chamadas, redirecionando requisições para o frontend ou para a API, dependendo da rota.

## 🚀 Como executar o projeto

### 1️⃣ **Clonar o repositório**
```sh
git clone https://github.com/maax103/laravel-next.git
cd laravel-next
```

### 2️⃣ **Subir os containers Docker**
```sh
docker compose up -d
```
Isso iniciará os serviços necessários:
- **Nginx**: Gerencia as requisições e encaminha para o frontend ou backend.
- **Backend (Laravel 11)**: Responsável pela lógica do sistema.
- **Frontend (Next.js 15)**: Interface da aplicação.
- **MySQL**: Banco de dados da aplicação.

### 3️⃣ **Popular o banco de dados com dados de teste (opcional)**
```sh
bash seed.sh
```
Isso criará dados iniciais no banco, incluindo um usuário de teste:
- **E-mail:** `maximilianomfurtado@gmail.com`
- **Senha:** `max12345`

### 4️⃣ **Importar dados de músicas via CSV**
```sh
bash import-csv.sh
```
Esse comando processa um arquivo CSV e popula a tabela de músicas no banco de dados.

### 5️⃣ **Acessar a aplicação**

A aplicação ficará disponível em [http://localhost:8080](http://localhost:8080).

## 🛠️ Tecnologias utilizadas
- **Backend:** Laravel 11 e Laravel Breeze
- **Frontend:** Next.js 15
- **Banco de dados:** MySQL
- **Servidor Web:** Nginx
- **Containerização:** Docker e Docker Compose

Caso tenha dúvidas ou problemas na execução, fique à vontade para entrar em contato comigo! 😊
