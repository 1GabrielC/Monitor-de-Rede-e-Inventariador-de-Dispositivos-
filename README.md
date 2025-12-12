## Sistema de Monitoramento e Inventário de Dispositivos

 Projeto Final – 2025
 
 Alunos: **Gabriel Cassiano** , **Filipe Gabriel** e **Henrique Gianichini**

## Objetivo do Projeto
Este projeto tem como objetivo desenvolver um sistema capaz de **registrar, monitorar e testar a conectividade de dispositivos em uma rede local**.  
O sistema permite cadastrar dispositivos, realizar testes de ping/porta em tempo real e armazenar o histórico de resultados para consulta.

O projeto é composto por:
- **Backend (API REST em Node.js + Express)**
- **Banco de Dados (SQLite + Knex)**
- **Frontend Web (HTML, CSS e JavaScript)**

## 2. Objetivo Geral
Criar um sistema funcional capaz de:
- Cadastrar dispositivos  
- Testar conectividade via ping/porta  
- Registrar histórico dos testes  
- Apresentar painel web para consulta  
- Disponibilizar rotas REST para consumo externo  


## 3. Objetivos Específicos
- Implementar CRUD de dispositivos  
- Implementar CRUD de logs (criação e leitura obrigatórias)  
- Registrar latência e status online/offline  
- Exibir informação em interface simples e funcional  
- Criar banco de dados consistente e normalizado  


## Tecnologias Utilizadas
- Node.js  
- Express  
- SQLite  
- Knex.js  
- Nodemon  
- Fetch API (frontend)

## Conclusão
O projeto não foi desenvolvido com sucesso,
O sistema no vscode apresentou muitos erros na criação do codigo do sistema, principalmente na instalação das dependências.

Conclui-se que poderia ter se dedicado mais no projeto para poder funcionar.

## Referencial Teórico

**REST – Fielding, Roy (2000)**  
Arquitetura baseada em recursos acessados via HTTP, seguindo padrões como stateless e interface uniforme.

**Node.js – Dahl, Ryan (2009)**  
Ambiente orientado a eventos, ideal para I/O e operações de rede.

**Express.js**  
Framework minimalista que facilita criação de APIs REST rápidas e organizadas.

**SQLite**  
Banco de dados relacional lightweight com conformidade ACID, ideal para projetos locais e portáteis.

**Knex.js**  
Query Builder que fornece uma camada intermediária entre JavaScript e SQL.


## Como Executar o Projeto

#### Instalar dependências


* cd server
* npm install
* npm run dev
