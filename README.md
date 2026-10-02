# API de Produtos - Node.js + TypeScript + Sequelize

API REST desenvolvida para a disciplina de Projeto Integrador, em TypeScript, com arquitetura em camadas
(routes → controllers → services → repositories) e persistência em banco relacional (SQLite) via **Sequelize**.
Inclui um **CRUD completo de produtos** testado com **Jest** (cobertura mínima exigida: 90%).

## Tecnologias

- Node.js + TypeScript
- Express
- Sequelize + SQLite (banco de dados relacional)
- Jest + ts-jest + Supertest (testes)

## Estrutura de pastas

```text
src/
├── app.ts                          # configura o Express e as rotas (sem listen, para testar)
├── server.ts                       # conecta no banco, sincroniza as tabelas e sobe o servidor
├── database/
│   ├── sequelize.ts                # conexão Sequelize (SQLite; ":memory:" em teste)
│   └── produto.sequelize-model.ts  # mapeamento da tabela "produtos"
├── models/produto.model.ts         # entidade de domínio (Produto)
├── repositories/
│   ├── produto.repository.ts           # interface do repositório
│   └── produto.repository.sequelize.ts # implementação com Sequelize
├── services/produto.service.ts     # regras de negócio e validações
├── controllers/produto.controller.ts # traduz HTTP <-> service (status e JSON)
├── routes/produto.routes.ts        # verbos HTTP + URLs -> controller
└── __tests__/                      # testes Jest
```

## Como executar

```bash
npm install
npm run dev      # desenvolvimento, com reinício automático (tsx watch)
# ou
npm run build && npm start
```

O servidor sobe em `http://localhost:3000` e cria o arquivo `database.sqlite` na primeira execução.

## Rotas da API (CRUD de produtos)

| Método   | Endpoint         | Descrição                          | Status de retorno                    |
| -------- | ---------------- | ---------------------------------- | ------------------------------------ |
| `GET`    | `/produtos`      | Lista todos os produtos            | `200`                                |
| `GET`    | `/produtos/:id`  | Busca um produto pelo ID           | `200` ou `404`                       |
| `POST`   | `/produtos`      | Cadastra um produto                | `201` ou `400`                       |
| `PUT`    | `/produtos/:id`  | Atualiza nome e/ou preço           | `200`, `400` ou `404`                |
| `DELETE` | `/produtos/:id`  | Remove um produto                  | `204` ou `404`                       |

Falhas inesperadas (ex.: banco indisponível) respondem `500`.

Exemplo de `POST /produtos`:

```json
{ "nome": "Monitor Gamer", "preco": 1350 }
```

Resposta (`201 Created`):

```json
{ "id": 1, "nome": "Monitor Gamer", "preco": 1350 }
```

Regras de validação: `nome` é obrigatório (texto não vazio) e `preco` é obrigatório (número maior ou igual a zero).

## Testes

```bash
npm test
```

Roda o Jest com cobertura. Os testes usam SQLite em memória (`NODE_ENV=test`), então não alteram o `database.sqlite`.
A cobertura é medida sobre todo o CRUD de produtos (routes, controller, service, repository e model) e o
`jest.config.js` falha o comando se qualquer métrica (statements, branches, functions, lines) ficar abaixo de **90%**.
Situação atual: **100%** em todas as métricas.
